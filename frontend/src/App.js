import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "./config.json";
import MyCalendar from "./components/3rd-party/reactBigCalendar";
import { Navbar } from "./components/Navbar";
import { Route, Routes, Link } from "react-router-dom";
import { TechStack } from "./components/static-subpages/TechStack";
import { About } from "./components/static-subpages/About";
import { EventPage } from "./components/EventPage";
import { PlacePage } from "./components/PlacePage";
import { Places } from "./components/Places";
import { isAfter, isBefore, parse, add, compareAsc, isValid } from "date-fns";

function App() {
  const [viewActive, setViewActive] = useState("All"); // allowed states should be "Active", "All", "Inactive"
  const [gridDisplay, setGridDisplay] = useState(true);
  const [sortReversed, setSortReversed] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(add(new Date(), { months: 2 }));
  const [eventsGrid, setEventsGrid] = useState([]);

  useEffect(() => {
    refreshGrid();
  }, []);

  const setEventsGrid_ = (arr) => {
    arr.forEach((e) => (e.date_iso = parse(e.date, "yyyy-MM-dd", new Date())));
    setEventsGrid(arr);
  };

  const refreshGrid = async () => {
    axios
      .get(`${config.url}events/`)
      .then((res) => setEventsGrid_(res.data))
      .catch((err) => console.log(err));
  };

  const getActiveEvents = () => {
    let arr = eventsGrid;

    // arr.forEach((e) => (e.date_iso = parse(e.date, "yyyy-MM-dd", new Date())));

    if (searchPhrase.length > 0) {
      arr = arr.filter((event) =>
        event.title.toLowerCase().match(searchPhrase.toLowerCase())
      );
    }

    // TODO logic of date filters has to be refactored
    //  setting invalid date should clear the filter
    //  the best would be to always have valid or empty date
    if (isValid(dateFrom)) {
      arr = arr.filter((event) => isAfter(event.date_iso, dateFrom));
    }
    if (isValid(dateTo)) {
      arr = arr.filter((event) => isBefore(event.date_iso, dateTo));
    }
    arr = arr.sort(compareAsc);

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
    if (event.is_active) {
      return (
        <svg
          onClick={() => changeActive(event)}
          xmlns="http://www.w3.org/2000/svg"
          className="icon-button h-5 w-5 cursor-pointer opacity-50 hover:opacity-100"
          viewBox="0 0 20 20"
          fill="#888888"
          data-info="Cancel"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else {
      return (
        <svg
          onClick={() => changeActive(event)}
          xmlns="http://www.w3.org/2000/svg"
          className="icon-button h-5 w-5 cursor-pointer opacity-50 hover:opacity-100"
          viewBox="0 0 20 20"
          fill="#888888"
          data-info="Reactivate"
        >
          <path
            fillRule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  };

  const renderGridItems = () => {
    const activeEvents = getActiveEvents();

    return activeEvents.map((event) => (
      <div className="p-4 md:w-1/3 max-w-xl max-h-md" key={event.id}>
        <div
          className={`h-full border-2 ${
            event.is_active
              ? "border-gray-200 dark:border-gray-800"
              : "border-red-400"
          } border-opacity-60 rounded-lg overflow-hidden`}
        >
          <div className="mx-1 my-1 object-cover object-center absolute">
            {renderEventButtons(event)}
          </div>
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
              {event.date} at{" "}
              <a href={`/places/${event.place}`}>{event.place_name}</a>
            </h2>
            <Link to={`/events/${event.id}`}>
              <h1
                className={`title-font text-lg font-medium hover:cursor-pointer ${
                  event.is_active
                    ? "hover:underline text-gray-900 dark:text-zinc-100"
                    : "line-through text-red-900 dark:text-red-300"
                } mb-3`}
              >
                {event.title}
              </h1>
            </Link>

            <p className="leading-relaxed mb-3 truncate">{event.description}</p>
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

  const toISOStringDate = (dateObj) => {
    if (isValid(dateObj)) {
      return dateObj.toISOString().substring(0, 10);
    }
    return undefined;
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
            <div
              className={`btn flex items-center ${
                isValid(dateFrom) || isValid(dateTo) ? "toggle" : ""
              }`}
            >
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  name="start"
                  type="date"
                  className="text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={toISOStringDate(dateFrom)}
                  onChange={(e) =>
                    setDateFrom(parse(e.target.value, "yyyy-MM-dd", new Date()))
                  }
                />
              </div>
              <span className="mx-4 text-gray-500">to</span>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  name="end"
                  type="date"
                  className="text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={toISOStringDate(dateTo)}
                  onChange={(e) =>
                    setDateTo(parse(e.target.value, "yyyy-MM-dd", new Date()))
                  }
                />
              </div>
            </div>
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
        <Route path="places" element={<Places />} />
        <Route path="about/tech-stack" element={<TechStack />} />
        <Route path="events/:eventId" element={<EventPage />} />
        <Route path="places/:placeId" element={<PlacePage />} />
      </Routes>
    </main>
  );
}

export default App;
