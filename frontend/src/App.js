import React, { useState } from "react";
import "./App.css";
import EventModal from "./components/EventModal";
import PlaceModal from "./components/PlaceModal";
import ImportModal from "./components/ImportModal";
import axios from "axios";
import config from "./config.json";
import Kalend, { CalendarView } from "kalend";
import "kalend/dist/styles/index.css";

const emptyEvent = {
  title: "",
  description: "",
  is_cancelled: false,
  date: "2021-01-01",
  place: 1,
  place_name: "",
  picture: null,
};

const emptyPlace = {
  name: "",
  country: "PL",
};

function App(props) {
  const [viewCancelled, setViewCancelled] = useState(false);
  const [listDisplay, setListDisplay] = useState(true);
  const [eventModal, setEventModal] = useState(false);
  const [placeModal, setPlaceModal] = useState(false);
  const [importModal, setImportModal] = useState(false);
  const [sortReversed, setSortReversed] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [eventsList, setEventsList] = useState([]);
  const [activeEvent, setActiveEvent] = useState({ ...emptyEvent });
  const [activePlace, setActivePlace] = useState({ ...emptyPlace });

  // const componentDidMount() {
  //   this.refreshList();
  // }

  const refreshList = () => {
    axios
      .get(`${config.url}events/`)
      .then((res) => setEventsList(res.data))
      .catch((err) => console.log(err));
  };

  const getActiveEvents = () => {
    let arr = eventsList
      .filter((event) => event.is_cancelled === viewCancelled)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    if (searchPhrase.length > 0) {
      // TODO search for ":", "/" etc will raise error
      arr = arr.filter((event) =>
        event.title.toLowerCase().match(searchPhrase.toLowerCase())
      );
    }
    if (sortReversed) {
      return arr.reverse();
    }
    return arr;
  };

  const getActiveEventsForCalendarView = () => {
    return {
      "01-11-2021": [
        {
          id: 1,
          startAt: "2021-11-21T18:00:00.000Z",
          endAt: "2021-11-21T19:00:00.000Z",
          timezoneStartAt: "Europe/Berlin", // optional
          summary: "test",
          color: "blue",
        },
      ],
      "21-11-2021": [
        {
          id: 2,
          startAt: "2021-11-21T18:00:00.000Z",
          endAt: "2021-11-21T19:00:00.000Z",
          timezoneStartAt: "Europe/Berlin", // optional
          summary: "test",
          color: "blue",
        },
      ],
    };
    // let arr = [];
    // this.getActiveEvents().forEach((i) =>
    //   arr.push({
    //     title: i.title,
    //     date: subHours(new Date(i.date), 1),
    //   })
    // );
    // return arr;
  };

  const renderEventButtons = (event) => {
    return (
      <span>
        {viewCancelled ? (
          <button
            className="btn btn-success mx-2"
            onClick={() => changeCancel(event)}
          >
            Reactivate
          </button>
        ) : (
          <span>
            <button
              className="btn btn-info mx-2"
              onClick={() => editEvent(event)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger mx-2"
              onClick={() => changeCancel(event)}
            >
              Cancel
            </button>
          </span>
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
            } justify-items-center`}
            placeholder="Search event title"
            onChange={(input) => setSearchPhrase(input.target.value)}
          />
          <button
            className="btn"
            onClick={() => setSortReversed(!sortReversed)}
          >
            {sortReversed ? "⬆" : "⬇"}
          </button>
        </div>
        <div className={"menu-buttons"}>
          <button
            className={`btn toggle ${viewCancelled ? "active" : ""}`}
            onClick={() => setViewCancelled(!viewCancelled)}
          >
            {viewCancelled ? "Cancelled" : "Active"} events
          </button>
          <button
            className={`btn toggle ${listDisplay ? "" : "active"}`}
            onClick={() => setListDisplay(!listDisplay)}
          >
            {listDisplay ? "List" : "Calendar"} view
          </button>
          |
          <button className="btn" onClick={refreshList}>
            Refresh list
          </button>
          |
          <button className="btn modal" onClick={() => createEvent(false)}>
            Add event
          </button>
          <button className="btn modal" onClick={() => createEvent(true)}>
            Import event
          </button>
          <button
            type="text"
            placeholder="Search for event name..."
            className="btn modal"
            value={searchPhrase}
            onClick={createPlace}
          >
            Add place
          </button>
        </div>
      </div>
    );
  };

  const renderListItems = () => {
    const activeEvents = getActiveEvents();

    return activeEvents.map((event) => (
      <li key={event.id} className="events-list-row">
        <span
          className={`event-title ${viewCancelled ? "cancelled-event" : ""}`}
          title={event.title}
        >
          {event.title}
        </span>
        <span className="event-date mr-2">{event.date}</span>
        <span>{renderEventButtons(event)}</span>
      </li>
    ));
  };

  const renderCalendarItems = () => {
    return (
      <Kalend
        // onEventClick={onEventClick}
        // onNewEventClick={onNewEventClick}
        events={getActiveEventsForCalendarView()}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.MONTH}
        // disabledViews={[CalendarView.DAY, CalendarView.AGENDA]}
        // onSelectView={onSelectView}
        // selectedView={selectedView}
        // onPageChange={onPageChange}
      />
    );
  };

  const toggleAndRefreshEvents = () => {
    setEventModal(false);
    refreshList();
  };

  const changeCancel = (event) => {
    axios
      .patch(`${config.url}events/${event.id}/`, {
        is_cancelled: !event.is_cancelled,
      })
      .then((res) => refreshList());
  };

  const handleDelete = (event) => {
    axios.delete(`${config.url}events/${event.id}/`).then(() => refreshList());
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
    setActiveEvent(event);
    setEventModal(!eventModal);
  };

  return (
    <main className="context">
      <div className="mx-auto">
        <div
          // colorOverlay="#aaaaff"
          // className="blur-lg"
          // opacity="0.5"
          width="100%"
          height="5%"
          // blur={10}
        >
          <h1 className="text-3xl font-bold underline">
            <a href="/">wydarzen.io</a>
          </h1>
        </div>
        <div
          // colorOverlay="#aaaaff"
          // opacity="0.5"
          width="100%"
          height="5%"
          top="10"
          className="menu-buttons"
          // blur={10}
        >
          {renderMenuButtons()}
        </div>
      </div>
      <div className="row mx-100 my-5">
        <div className="col-md-6 col-sma-10 mx-auto p-0"></div>
        <div className="card p-3 mx-5">
          {listDisplay ? (
            <ul className="list-group">{renderListItems()}</ul>
          ) : (
            <div>{renderCalendarItems()}</div>
          )}
        </div>
      </div>
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
    </main>
  );
}

export default App;
