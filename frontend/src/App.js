import React, { useEffect, useState } from "react";
import "./App.css";
import EventModal from "./components/EventModal";
import PlaceModal from "./components/PlaceModal";
import ImportModal from "./components/ImportModal";
import axios from "axios";
import config from "./config.json";
import MyCalendar from "./components/3rd-party/reactBigCalendar";

const emptyEvent = {
  title: "",
  description: "",
  is_active: true,
  date: "2021-01-01",
  place: 1,
  place_name: "",
  picture: null,
};

const emptyPlace = {
  name: "",
  country: "",
  lat: "",
  long: "",
};

function App() {
  const [viewActive, setViewActive] = useState("All"); // allowed states should be "Active", "All", "Inactive"
  const [gridDisplay, setGridDisplay] = useState(true);
  const [eventModal, setEventModal] = useState(false);
  const [placeModal, setPlaceModal] = useState(false);
  const [importModal, setImportModal] = useState(false);
  const [sortReversed, setSortReversed] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [eventsGrid, setEventsGrid] = useState([]);
  const [activeEvent, setActiveEvent] = useState({ ...emptyEvent });
  const [activePlace, setActivePlace] = useState({ ...emptyPlace });

  useEffect(() => {
    refreshGrid();
  }, []);

  const refreshGrid = () => {
    axios
      .get(`${config.url}events/`)
      .then((res) => setEventsGrid(res.data))
      .catch((err) => console.log(err));
  };

  const getActiveEvents = () => {
    let arr = eventsGrid;
    arr = eventsGrid.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (searchPhrase.length > 0) {
      // TODO search for ":", "/" etc will raise error
      arr = arr.filter((event) =>
        event.title.toLowerCase().match(searchPhrase.toLowerCase())
      );
    }
    if (viewActive !== "All") {
      arr = arr.filter(
        (event) => event.is_active === (viewActive === "Active")
      );
    }

    if (sortReversed) {
      return arr.reverse();
    }

    return arr;
  };

  const switchActive = () => {
    if (viewActive === "All") setViewActive("Active");
    else if (viewActive === "Active") setViewActive("Inactive");
    else if (viewActive === "Inactive") setViewActive("All");
  };

  const getActiveEventsForCalendarView = () => {
    let arr = [];
    getActiveEvents().forEach((i) =>
      arr.push({
        title: i.title,
        start: new Date(i.date),
        end: new Date(i.date),
        allDay: true,
      })
    );
    return arr;
  };

  const renderEventButtons = (event) => {
    return (
      <span>
        {event.is_active ? (
          <span>
            <button
              className="btn btn-info mx-2"
              onClick={() => editEvent(event)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger mx-2"
              onClick={() => changeActive(event)}
            >
              Cancel
            </button>
          </span>
        ) : (
          <button
            className="btn btn-success mx-2"
            onClick={() => changeActive(event)}
          >
            Reactivate
          </button>
        )}
        <button className="btn btn-warning" onClick={() => handleDelete(event)}>
          Delete
        </button>
      </span>
    );
  };

  const renderMenuButtons = () => {
    return (
      <div>
        <div className={"menu-buttons"}>
          <input
            className={`search-input ${
              searchPhrase !== "" ? "toggle" : null
            } justify-items-center dark:bg-slate-800`}
            placeholder="Search event title"
            onChange={(input) => setSearchPhrase(input.target.value)}
          />
          {/* <button className="btn" onClick={() => setTheme("light")}>
            Theme
          </button> */}
          <button
            className="btn"
            onClick={() => setSortReversed(!sortReversed)}
          >
            {sortReversed ? "⬆" : "⬇"}
          </button>
          <button className="btn" onClick={refreshGrid}>
            ↺
          </button>
        </div>
        <div className={"menu-buttons"}>
          {/* TODO make triple switch */}
          <button
            className={`btn ${viewActive !== "All" ? "toggle active" : ""}`}
            onClick={switchActive}
          >
            {viewActive} events
          </button>
          <button
            className={`btn toggle ${gridDisplay ? "" : "active"}`}
            onClick={() => setGridDisplay(!gridDisplay)}
          >
            {gridDisplay ? "Grid" : "Calendar"} view
          </button>
          |
          <button
            className={`btn modal ${eventModal ? "toggle" : ""}`}
            onClick={() => createEvent(false)}
          >
            Add event
          </button>
          <button
            className={`btn modal ${importModal ? "toggle" : ""}`}
            onClick={() => createEvent(true)}
          >
            Import event
          </button>
          <button
            className={`btn modal ${placeModal ? "toggle" : ""}`}
            onClick={createPlace}
          >
            Add place
          </button>
        </div>
      </div>
    );
  };

  const renderGridItems = () => {
    const activeEvents = getActiveEvents();

    return activeEvents.map((event) => (
      <div className="p-4 md:w-1/3" key={event.id}>
        <div
          className={`h-full border-2 ${
            event.is_active
              ? "border-gray-200 dark:border-gray-800"
              : "border-red-400"
          } border-opacity-60 rounded-lg overflow-hidden`}
        >
          <img
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            src={`${
              event.picture
                ? event.picture
                : "https://picsum.photos/720/400?grayscale&blur"
            }`}
            alt="blog"
          />
          <div className="p-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
              {event.date} at {event.place_name}
            </h2>
            <h1
              className={`title-font text-lg font-medium hover:cursor-pointer ${
                event.is_active
                  ? "hover:underline text-gray-900 dark:text-zinc-100"
                  : "line-through text-red-900 dark:text-red-300"
              } mb-3`}
            >
              {event.title}
            </h1>

            <p className="leading-relaxed mb-3 truncate">{event.description}</p>
            <div className="flex items-center flex-wrap ">
              <span>{renderEventButtons(event)}</span>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const toggleAndRefreshEvents = () => {
    setEventModal(false);
    refreshGrid();
  };

  const changeActive = (event) => {
    axios
      .patch(`${config.url}events/${event.id}/`, {
        is_active: !event.is_active,
      })
      .then((res) => refreshGrid());
  };

  const handleDelete = (event) => {
    axios.delete(`${config.url}events/${event.id}/`).then(() => refreshGrid());
  };

  const createEvent = (is_import = false) => {
    setActiveEvent({ ...emptyEvent });
    if (is_import) setImportModal(!importModal);
    else setEventModal(!eventModal);
  };

  const createPlace = () => {
    setActivePlace({ ...emptyPlace });
    setPlaceModal(!placeModal);
  };

  const editEvent = (event) => {
    // TODO hide modal when scrolled
    document.body.scrollTop = 0; // scroll to top for Safari
    document.documentElement.scrollTop = 0; // as above, but for Chrome, Firefox, IE and Opera
    setActiveEvent(event);
    setEventModal(!eventModal);
  };

  return (
    <main className="context">
      <div className="px-auto">
        <div width="100%" height="5%">
          <h1 className="text-3xl font-bold underline">
            <a href="/">wydarzen.io</a>
          </h1>
        </div>
        <div width="100%" height="5%" className="menu-buttons">
          {renderMenuButtons()}
        </div>
        {/* TODO fix modals  */}
        {eventModal ? (
          <EventModal
            activeEvent={activeEvent}
            toggle={() => setEventModal(!eventModal)}
            onSave={toggleAndRefreshEvents}
          />
        ) : null}
        {importModal ? (
          <ImportModal
            activeEvent={activeEvent}
            toggle={() => setImportModal(!importModal)}
            onSave={toggleAndRefreshEvents}
          />
        ) : null}
        {placeModal ? (
          <PlaceModal
            activePlace={activePlace}
            toggle={() => setPlaceModal(!placeModal)}
          />
        ) : null}
      </div>
      <div className="row mx-100 my-5">
        <div className="card p-3 mx-5">
          {gridDisplay ? (
            <section className="text-gray-600 dark:text-grey-200 body-font">
              <div className="container px-5 py-5 mx-auto">
                <div className="flex flex-wrap -m-4">{renderGridItems()}</div>
              </div>
            </section>
          ) : (
            <div>
              {
                <MyCalendar
                  events={getActiveEventsForCalendarView()}
                  cancelEvent={(event) => changeActive(event)}
                />
              }
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
