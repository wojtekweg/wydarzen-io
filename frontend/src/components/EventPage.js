import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../config.json";
import {
  emptyEvent,
  emptyPlace,
  emptyDiscordChannel,
} from "../helpers/api_schemas";
import { EventModal } from "./modals/EventModal.js";

const EventPage = () => {
  const [event, setEvent] = useState({ ...emptyEvent });
  const [place, setPlace] = useState({ ...emptyPlace });
  const [imgClip, setImgClip] = useState(true);
  const [eventModal, setEventModal] = useState(false);
  const [showSubscribeInput, setShowSubscribeInput] = useState(true);
  const [discordChannels, setDiscordChannels] = useState([]);
  const { eventId } = useParams();
  let navigate = useNavigate();
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [newDiscordChannel, setNewDiscordChannel] =
    useState(emptyDiscordChannel);

  useEffect(() => {
    fetchEvent();
    fetchPlace(event.place);
    fetchDiscordChannels();
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

  const fetchDiscordChannels = () => {
    axios
      .get(`${config.url}discord_channels/`)
      .then((res) => setDiscordChannels(res.data))
      .catch((err) => console.log(err));
  };

  const changeImgView = () => {
    setImgClip(!imgClip);
  };

  const changeCancel = () => {
    axios
      .patch(`${config.url}events/${event.id}/`, {
        is_active: !event.is_active,
      })
      .then((res) => fetchEvent());
  };

  const handleDeleteEvent = () => {
    if (deleteConfirmModal) {
      axios
        .delete(`${config.url}events/${event.id}/`)
        .then(() => navigate("/"));
    } else {
      setDeleteConfirmModal(true);
    }
  };

  const renderDescription = () => {
    const URL_REGEX =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return (
      <div className="sm:w-2/3 sm:pr-8 sm:py-8  border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left dark:text-zinc-200">
        <p className="leading-relaxed text-lg mb-4 whitespace-pre-line">
          {event.description.split("\n").map((value, index) => (
            <Fragment key={index}>
              {value.split(" ").map((part) =>
                URL_REGEX.test(part) ? (
                  <a className="link" href={part}>
                    {part}{" "}
                  </a>
                ) : (
                  part + " "
                )
              )}
              <br />
            </Fragment>
          ))}
        </p>
      </div>
    );
  };

  const renderBannerForInactive = () => {
    if (event.is_active) {
      return "";
    } else {
      return (
        <span
          style={{
            textAlign: "center",
          }}
          className="inline-block my-5 py-5 lg:w-5/6 mx-auto rounded bg-red-50 dark:bg-red-900 text-red-500 text-l tracking-widest"
        >
          EVENT IS INACTIVE
        </span>
      );
    }
  };

  const renderImgCollapseBtn = () => {
    return (
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
    );
  };

  const renderImg = () => {
    return (
      <div className={`rounded-lg overflow-hidden ${imgClip ? "h-64" : ""}`}>
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
    );
  };

  const renderCalendarBox = () => {
    return (
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
    );
  };

  const renderPlaceBox = () => {
    return (
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

        <div
          className="flex flex-col items-center text-center justify-center"
          id="place"
        >
          <h2 className="font-medium title-font mt-4 text-gray-900 dark:text-gray-200 text-lg">
            <a href={`/places/${event.place}`}>{event.place_name}</a>
          </h2>
          <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
          <p className="text-base">
            {place.country}: {place.lat}, {place.long}
          </p>
        </div>
      </div>
    );
  };

  const renderActionButtons = () => {
    return (
      <div className="flex flex-col sm:flex-row mt-1 text-right">
        <button className="btn" onClick={() => setEventModal(!eventModal)}>
          Edit
        </button>
        <button
          className="btn"
          onClick={() => changeCancel()}
          id="activeButton"
        >
          {event.is_active ? "Cancel" : "Reactivate"}
        </button>
        <button className="btn" onClick={() => setDeleteConfirmModal(true)}>
          Delete
        </button>
        <button
          className="btn"
          onClick={() => setShowSubscribeInput(!showSubscribeInput)}
        >
          Manage subscribtions
        </button>
      </div>
    );
  };

  const renderDiscordChannels = () => {
    return (
      <div className="flex-col my-2">
        <div>
          {discordChannels.map((channel) => (
            <div className="btn w-full" key={channel.id}>
              <input
                style={{ listStyleType: "none" }}
                type="checkbox"
                className="mx-2 btn text-indigo-500"
                checked={event.discord_subscription.includes(channel.id)}
                onChange={() => patchEventDiscordSubscription(channel.id)}
              ></input>
              {channel.name}
              <p className="truncate text-gray-500">{channel.channel_url}</p>
            </div>
          ))}
        </div>
        <div className="btn w-full flex">
          <input
            type="text"
            id="subscribe-name"
            name="subscribe-name"
            onChange={(e) =>
              setNewDiscordChannel({
                ...newDiscordChannel,
                name: e.target.value,
              })
            }
            placeholder="Name"
            className="modal-input"
          />
          <input
            type="text"
            id="subscribe-url"
            name="subscribe-url"
            onChange={(e) =>
              setNewDiscordChannel({
                ...newDiscordChannel,
                channel_url: e.target.value,
              })
            }
            placeholder="Enter Discord webhook URL"
            className="modal-input mx-5"
          />
          <button
            className="btn modal-save"
            onClick={() => postNewDiscordChannel()}
          >
            Add
          </button>
        </div>
      </div>
    );
  };

  const patchEventDiscordSubscription = (discordObjectId) => {
    const index = event.discord_subscription.indexOf(discordObjectId);
    if (index > -1) {
      event.discord_subscription.splice(index, 1);
    } else {
      event.discord_subscription.push(discordObjectId);
    }

    axios
      .patch(`${config.url}events/${event.id}/`, {
        discord_subscription: event.discord_subscription,
      })
      .then((res) => fetchEvent());
  };

  const postNewDiscordChannel = () => {
    console.log(newDiscordChannel);
    axios
      .post(`${config.url}discord_channels/`, newDiscordChannel)
      .then((res) => fetchEvent());
  };

  const renderDeleteConfirmModal = () => {
    return (
      <div className="modal-section flex-col left-0 right-0 bottom-0 top-0 bg-opacit-50">
        <h1>Delete event</h1>
        <p>Are you sure to delete this event from database?</p>
        <div>
          <button className="btn" onClick={() => setDeleteConfirmModal(false)}>
            No, cancel
          </button>
          <button className="btn" onClick={() => handleDeleteEvent()}>
            Yes, delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 pt-12 pb-24 mx-auto flex flex-col">
        {renderBannerForInactive()}
        <div className="lg:w-5/6 mx-auto">
          {renderImgCollapseBtn()}
          {renderImg()}

          <div
            className="flex overflow-hidden"
            style={{
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
            id="calendarBox"
          >
            {renderCalendarBox()}
            <a href={`/events/${eventId}`}>
              <h1 className="text-4xl	underline decoration-wavy hover:decoration-indigo-500">
                {event.title}
              </h1>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row mt-10">
            {renderDescription()}
            {renderPlaceBox()}
          </div>
          {renderActionButtons()}
          {showSubscribeInput ? null : renderDiscordChannels()}
        </div>
      </div>
      {eventModal ? (
        <EventModal activeEvent={event} isOpen={eventModal} />
      ) : null}
      {deleteConfirmModal ? renderDeleteConfirmModal() : ""}
    </section>
  );
};

export { EventPage };
