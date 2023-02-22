import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import config from "../config.json";
import { emptyPlace } from "../helpers/api_schemas";
import { Page404 } from "./Page404.js";
import { parse, compareAsc } from "date-fns";
import placeholder from "../assets/placeholder.png";
import { Link } from "react-router-dom";

const PlacePage = () => {
  const [httpStatusCode, setHttpStatusCode] = useState();
  const [place, setPlace] = useState({ ...emptyPlace });
  const [imgClip, setImgClip] = useState(true);
  const [eventsGrid, setEventsGrid] = useState([]);
  const { placeId } = useParams();

  useEffect(() => {
    fetchPlace();
    refreshGrid();
  }, []);

  const fetchPlace = async () => {
    axios
      .get(`${config.url}places/${placeId}/`)
      .then((res) => {
        setPlace(res.data);
      })
      .catch((err) => {
        console.log(err);
        setHttpStatusCode(false);
      });
  };

  const changeImgView = () => {
    setImgClip(!imgClip);
  };

  if (httpStatusCode === 404 || httpStatusCode === false) {
    return <Page404 />;
  }

  const setEventsGrid_ = (arr) => {
    arr.forEach((e) => (e.date_iso = parse(e.date, "yyyy-MM-dd", new Date())));
    setEventsGrid(arr);
  };

  const refreshGrid = async () => {
    // TODO terrible idea to fetch all events here
    axios
      .get(`${config.url}events/`)
      .then((res) => setEventsGrid_(res.data))
      .catch((err) => console.log(err));
  };

  const getActiveEvents = () => {
    let arr = eventsGrid.filter((e) => e.place == placeId);
    arr.sort((a, b) => compareAsc(a.date_iso, b.date_iso));
    return arr;
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
      <div
        className="p-4 md:w-1/3 max-w-xl max-h-md"
        id="eventCard"
        key={event.id}
      >
        <div
          className={`h-full ${
            event.is_active ? "bg-indigo-500" : "bg-red-700"
          } border-opacity-60 rounded overflow-hidden bg-opacity-5`}
        >
          <img
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            src={`${event.picture || placeholder}`}
            alt="blog"
          />
          <div className="p-6">
            <h2
              className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
              id="dateAndPlace"
            >
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

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 pt-12 pb-24 mx-auto flex flex-col">
        <div className="lg:w-5/6 mx-auto">
          <div className="object-cover object-center absolute p-2 opacity-40 hover:opacity-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 bg-gray-200 rounded-full p-1 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => changeImgView()}
            >
              {imgClip ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 bg-gray-200 rounded-full p-1 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 11l7-7 7 7M5 19l7-7 7 7"
                  />
                </svg>
              )}
            </svg>
          </div>
          <div
            className={`rounded-lg overflow-hidden ${imgClip ? "h-64" : ""}`}
          >
            <img
              alt="content"
              className="object-cover object-center h-full w-full"
              src={place.picture}
            />
          </div>

          <div
            className="flex overflow-hidden"
            style={{
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            <div></div>
            <a href={`/places/${placeId}`}>
              <h1
                // style={{ fontSize: 50 }}
                className="text-4xl	underline decoration-wavy hover:decoration-indigo-500"
              >
                {place.name}
              </h1>
            </a>
          </div>
          <h1 className="subtext" style={{ fontFamily: "arial" }}>
            All events history at {place.name}:
          </h1>
          <section className="text-gray-600 dark:text-grey-200 body-font">
            <div className="container px-5 py-5 mx-auto flex flex-wrap -m-4">
              {renderGridItems()}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default PlacePage;
