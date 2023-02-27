import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.json";
import MyCalendar from "./3rd-party/reactBigCalendar";
import { Link } from "react-router-dom";
import {
  isAfter,
  isBefore,
  parse,
  add,
  sub,
  compareAsc,
  isValid,
} from "date-fns";
import placeholder from "../assets/placeholder.png";

const Events = () => {
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

  const getActiveEvents = (isForCalendar = false) => {
    let arr = eventsGrid;

    if (!isForCalendar) {
      if (searchPhrase.length > 0) {
        arr = arr.filter((event) =>
          event.title.toLowerCase().match(searchPhrase.toLowerCase())
        );
      }

      if (isValid(dateFrom)) {
        arr = arr.filter((event) =>
          isAfter(event.date_iso, sub(dateFrom, { days: 1 }))
        );
      }
      if (isValid(dateTo)) {
        arr = arr.filter((event) =>
          isBefore(event.date_iso, add(dateTo, { days: 1 }))
        );
      }
    }
    arr.sort((a, b) => compareAsc(a.date_iso, b.date_iso));

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
    getActiveEvents(true).forEach((i) =>
      arr.push({
        title: i.title,
        id: i.id,
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

    if (activeEvents.length === 0) {
      return (
        <div>
          <p>No events found :(</p>
        </div>
      );
    }
    return activeEvents.map((event) => (
      <div className="p-4 w-1/2" id="eventCard" key={event.id}>
        <div
          className={`h-full rounded-xl shadow-lg hover:shadow-2xl ${
            event.is_active ? "bg-indigo-500" : "bg-red-700"
          } border-opacity-60 overflow-hidden bg-opacity-5`}
        >
          <img
            className="object-cover object-center
            lg:h-64 md:h-64 sm:h-16
            lg:w-full md:w-full sm:w-full"
            src={`${event.picture || placeholder}`}
            alt="blog"
          />

          <div className="p-6">
            <div className="flex flex-row">
              <div className="object-center mr-4">
                {renderEventButtons(event)}
              </div>
              <h2
                className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                id="dateAndPlace"
              >
                {event.date} at{" "}
                <a href={`/places/${event.place}`}>{event.place_name}</a>
              </h2>
            </div>
            <Link to={`/events/${event.id}`}>
              <h1
                className={`title-font text-lg font-medium hover:cursor-pointer ${
                  event.is_active
                    ? "hover:underline text-gray-900 dark:text-zinc-100"
                    : "line-through text-red-900 dark:text-red-300"
                } mb-3`}
                id="eventTitle"
              >
                {event.title}
              </h1>
            </Link>
            <p className="subtext">{event.description}</p>
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
        <div className="menu-buttons my-2">
          <input
            className={`${searchPhrase !== "" ? "toggle" : ""} search-input`}
            placeholder="Search by event title"
            onChange={(input) => setSearchPhrase(input.target.value)}
            id="searchInput"
          />
          <button
            className={`${viewActive !== "All" ? "toggle active" : ""} w-2/12`}
            onClick={switchActive}
            id="toggleActive"
          >
            {viewActive} events
          </button>
          <button
            className={`toggle ${gridDisplay ? "" : "active"} w-2/12`}
            onClick={() => setGridDisplay(!gridDisplay)}
            id="toggleView"
          >
            {gridDisplay ? "Grid" : "Calendar"} view
          </button>
        </div>

        <div className={`menu-buttons my-2 ${gridDisplay ? "" : "invisible"}`}>
          <button
            className={`flex items-center ${
              isValid(dateFrom) || isValid(dateTo) ? "toggle" : ""
            }`}
          >
            <p className="subtext mr-2">Events from</p>
            <div className="relative">
              <input
                id="startDate"
                name="start"
                type="date"
                className={`date-input ${isValid(dateFrom) ? "toggle" : ""}`}
                defaultValue={toISOStringDate(dateFrom)}
                onChange={(e) =>
                  setDateFrom(parse(e.target.value, "yyyy-MM-dd", new Date()))
                }
              />
            </div>
            <p className="subtext mx-2">to</p>
            <div className="relative">
              <input
                id="endDate"
                name="end"
                type="date"
                className={`date-input ${isValid(dateTo) ? "toggle" : ""}`}
                defaultValue={toISOStringDate(dateTo)}
                onChange={(e) =>
                  setDateTo(parse(e.target.value, "yyyy-MM-dd", new Date()))
                }
              />
            </div>
          </button>
          <button
            onClick={() => setSortReversed(!sortReversed)}
            id="sortButton"
          >
            {sortReversed ? "⬆" : "⬇"}
          </button>
          <button onClick={() => refreshGrid()} id="refreshButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderEventsFiltering()}
      <div className="row mx-100 my-5">
        <div className="card p-3 mx-5">
          {gridDisplay ? (
            <section className="text-gray-600 dark:text-grey-200 body-font">
              <div className="container px-5 py-5 mx-auto flex flex-wrap -m-4">
                {renderGridItems()}
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
  );
};

export { Events };
