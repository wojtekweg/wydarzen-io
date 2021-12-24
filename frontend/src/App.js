import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "./config.json";
import MyCalendar from "./components/3rd-party/reactBigCalendar";
import { Navbar } from "./components/Navbar";
import { emptyEvent } from "./helpers/api_methods";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TechStack } from "./components/static-subpages/TechStack";
import { About } from "./components/static-subpages/About";

function App() {
  const [viewActive, setViewActive] = useState("All"); // allowed states should be "Active", "All", "Inactive"
  const [gridDisplay, setGridDisplay] = useState(true);
  const [sortReversed, setSortReversed] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [eventsGrid, setEventsGrid] = useState([]);
  const [activeEvent, setActiveEvent] = useState({ ...emptyEvent });

  useEffect(() => {
    refreshGrid();
  }, []);

  const refreshGrid = async () => {
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
    if (dateFrom !== "") {
      arr = arr.filter((event) => event.date >= dateFrom);
    }
    if (dateTo !== "") {
      arr = arr.filter((event) => event.date <= dateTo);
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

  const renderEventsFiltering = () => {
    return (
      <div>
        <div height="5%" className="my-2 ">
          <div className={"menu-buttons"}>
            <input
              className={`${
                searchPhrase !== "" ? "toggle" : null
              } justify-items-center dark:bg-slate-800 search-input`}
              placeholder="Search event title"
              onChange={(input) => setSearchPhrase(input.target.value)}
            />
            {/* <button
              className="btn"
              onClick={() => {
                if (
                  localStorage.getItem("color-theme") === "dark" ||
                  (!("color-theme" in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
                ) {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
              }}
            >
              Theme
            </button> */}
            <button className="btn" onClick={refreshGrid}>
              ↺
            </button>
            {/* TODO make triple switch */}
            <button
              className={`btn ${
                viewActive !== "All" ? "toggle active" : ""
              } w-2/12`}
              onClick={switchActive}
            >
              {viewActive} events
            </button>
            <button
              className={`btn toggle ${gridDisplay ? "" : "active"} w-2/12`}
              onClick={() => setGridDisplay(!gridDisplay)}
            >
              {gridDisplay ? "Grid" : "Calendar"} view
            </button>
          </div>
        </div>

        <div height="5%" className={`my-2 ${gridDisplay ? "" : "invisible"}`}>
          <div className={"menu-buttons"}>
            From
            <input
              name="start"
              type="date"
              placeholder="Set date from"
              className={`${
                dateFrom !== "" ? "toggle" : null
              } justify-items-center dark:bg-slate-800 border-0 search-input`}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            to
            <input
              name="end"
              type="date"
              className={`${
                dateTo !== "" ? "toggle" : null
              } justify-items-center dark:bg-slate-800 border-0 search-input`}
              placeholder="Set date to"
              onChange={(e) => setDateTo(e.target.value)}
              accept="date"
            />
            <button
              className="btn"
              onClick={() => setSortReversed(!sortReversed)}
            >
              {sortReversed ? "⬆" : "⬇"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const editEvent = (event) => {
    // TODO display edit on another site, not on index
    setActiveEvent(event);
  };

  return (
    <main className="context">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div>
              {renderEventsFiltering()}
              <div className="row mx-100 my-5">
                <div className="card p-3 mx-5">
                  {gridDisplay ? (
                    <section className="text-gray-600 dark:text-grey-200 body-font">
                      <div className="container px-5 py-5 mx-auto">
                        <div className="flex flex-wrap -m-4">
                          {renderGridItems()}
                        </div>
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
            </div>
          }
        />
        <Route path="about" element={<About />} />
        <Route path="about/tech-stack" element={<TechStack />} />
      </Routes>
    </main>
  );
}

export default App;
