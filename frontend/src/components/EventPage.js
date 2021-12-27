import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import config from "../config.json";
import { emptyEvent, emptyPlace } from "../helpers/api_methods";

const EventPage = () => {
  const [event, setEvent] = useState({ ...emptyEvent });
  const [place, setPlace] = useState({ ...emptyPlace });
  const [imgClip, setImgClip] = useState(true);
  const { eventId } = useParams();

  useEffect(() => {
    fetchEvent();
    fetchPlace(event.place);
  }, []);

  const fetchEvent = async () => {
    axios
      .get(`${config.url}events/${eventId}/`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchPlace = async (placeId) => {
    axios
      .get(`${config.url}places/${placeId}/`)
      .then((res) => setPlace(res.data))
      .catch((err) => console.log(err));
  };

  const changeImgView = () => {
    setImgClip(!imgClip);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 pt-12 pb-24 mx-auto flex flex-col">
        {event.is_active ? (
          ""
        ) : (
          <span
            style={{
              textAlign: "center",
            }}
            class="inline-block my-5 py-5 lg:w-5/6 mx-auto rounded bg-red-50 text-red-500 text-l tracking-widest"
          >
            EVENT IS INACTIVE
          </span>
        )}
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
              src={
                event.picture
                  ? event.picture
                  : "https://picsum.photos/720/400?grayscale&blur"
              }
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
            <div>
              <div className="m-5 px-2 border-2 dark:border-gray-800 inline-flex items-center aspect-square">
                <div className="flex flex-col items-center text-center leading-none">
                  <span className="text-red-500 px-2 pt-2 pb-2 mb-2 border-b-2 border-gray-200 dark:border-gray-800">
                    {new Date(event.date).toLocaleString("default", {
                      month: "long",
                    })}
                  </span>
                  <span className="pb-2 text-gray-800 dark:text-gray-200 title-font leading-none">
                    {new Date(event.date).getDate()}
                  </span>
                </div>
              </div>
            </div>
            <a href={`/events/${eventId}`}>
              <h1
                // style={{ fontSize: 50 }}
                className="text-4xl	underline decoration-wavy hover:decoration-indigo-500"
              >
                {event.title}
              </h1>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-2/3 sm:pr-8 sm:py-8  border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <p className="leading-relaxed text-lg mb-4">
                {event.description}
              </p>
            </div>
            <div className="sm:w-1/3 text-center sm:pl-8 sm:py-8">
              <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>

              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900 dark:text-gray-200 text-lg">
                  <a href={`/places/${place.id}`}>{event.place_name}</a>
                </h2>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                <p className="text-base">
                  {place.country}: {place.lat}, {place.long}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { EventPage };
