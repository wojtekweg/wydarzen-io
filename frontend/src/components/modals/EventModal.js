import React, { useState } from "react";
import axios from "axios";
import config from "../../config.json";

// TODO create helpers and cleanup
const logError = (error) => {
  if (error.response) {
    console.error(error.response.data);
  } else if (error.request) {
    console.error(error.request);
  } else {
    console.error("Error", error.message);
  }
};

function EventModal(props) {
  const [title, setTitle] = useState(props.activeEvent.title);
  const [description, setDescription] = useState(props.activeEvent.description);
  const [date, setDate] = useState(props.activeEvent.date);
  const [is_active] = useState(props.activeEvent.is_active);
  const [picture, setPicture] = useState(props.activeEvent.picture);
  const isPictureUploadDisabled = !!picture;
  const [pictureUploadError, setPictureUploadError] = useState(null);

  const printInvalidPicture = (errorMessage) => {
    console.error(errorMessage);
    setPictureUploadError(errorMessage);
  };

  const handlePictureUpload = async (file, type = file.type) => {
    // TODO when cancelling upload, the empty file is uploaded
    const pictureCandidate = new Blob(
      [new Uint8Array(await file.arrayBuffer())],
      { type: type }
    );
    if (pictureCandidate instanceof Blob !== true) {
      printInvalidPicture("Incorrect file upload of: " + pictureCandidate);
      return;
    }
    if (pictureCandidate.size === 0) {
      printInvalidPicture("Empty file uploaded");
      return;
    }
    setPictureUploadError(null);
    setPicture(pictureCandidate);
  };

  const postData = () => {
    // Copy all information we have about event object and update it from states
    const event = {
      ...props.activeEvent,
      title: title,
      description: description,
      date: date,
      is_active: is_active,
    };

    // Convert event to form, for more flexible editing options
    let formData = new FormData();
    for (let key in event) {
      if (key === "picture") continue;
      formData.append(key, event[key]);
    }

    // Post the updated changes
    if (typeof event != "undefined" && typeof event.id != "undefined") {
      // if event is updated, patch the non-picture fields [TODO make it change only edited fields]
      axios.patch(config.url + `events/${event.id}/`, formData).catch(logError);
    } else {
      // if event is created, append picture to POST data
      formData.append(
        "picture",
        picture,
        `${title}-picture.${picture.type.split("/").pop()}`
      );
      axios.post(config.url + "events/", formData).catch(logError);
    }

    props.callbackModal("event");
  };

  return (
    <section
      className={`modal-section ${props.eventModal ? "invisible" : ""}`}
      id="popup-modal"
    >
      <div className="modal-container">
        <div className="modal-header">
          <h1 className="modal-header-h1">
            {typeof props.activeEvent != "undefined" &&
            typeof props.activeEvent.id != "undefined"
              ? "Edit"
              : "Add"}{" "}
            event
          </h1>
          <p className="modal-p">
            {typeof props.activeEvent != "undefined" &&
            typeof props.activeEvent.title.id != "undefined"
              ? "Edit the selected event. Remember that event will be automatically marked as inactive after it is past."
              : "Add an event to the database."}
          </p>
        </div>
        <div className="event-modal-title modal-full-row">
          <div className="modal-label-input">
            <label htmlFor="title" className="modal-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              className="modal-input"
            />
          </div>
        </div>
        <div className="event-modal-description py-2 modal-full-row">
          <div className="modal-label-input">
            <label htmlFor="description" className="modal-label">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
              className="modal-input h-32 text-base break-all	resize pre"
            />
          </div>
        </div>
        <div className="event-modal-picture-and-place py-2 modal-full-row">
          <div className="event-modal-place modal-label-input">
            <label htmlFor="place" className="modal-label">
              Place
            </label>
            <p htmlFor="place">
              <input
                // TODO edit place
                type="text"
                name="place"
                className="input-map"
                disabled={true}
                placeholder={
                  typeof props.activeEvent.title != "undefined" &&
                  typeof props.activeEvent.id != "undefined" &&
                  props.activeEvent.place_name !== ""
                    ? props.activeEvent.place_name
                    : "Editing place is not yet possible"
                }
              />
            </p>
          </div>
          <div className="event-modal-picture modal-label-input pl-5">
            <label htmlFor="picture" className="modal-label">
              Picture
            </label>
            {pictureUploadError !== null ? (
              <p>
                <b>❗ {pictureUploadError}</b>
              </p>
            ) : (
              <br />
            )}{" "}
            {isPictureUploadDisabled ? (
              <p>
                ℹ️ File is already uploaded, editing uploaded files is not yet
                possible
              </p>
            ) : (
              <input
                className="modal-input"
                type="file"
                id="picture"
                label="picture file"
                disabled={!!isPictureUploadDisabled}
                onChange={(e) => handlePictureUpload(e.target.files[0])}
                accept="image/png, image/jpeg"
              />
            )}
          </div>
        </div>
        <div className="event-modal-footer modal-full-row">
          <div className="w-full">
            <label className="modal-label" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              className="modal-input"
            />
          </div>
        </div>
        <div className="pt-5 flex modal-full-row">
          <button
            className="modal-cancel"
            onClick={() => props.callbackModal("event")}
          >
            Cancel
          </button>
          <button className="modal-save" id="save" onClick={postData}>
            Save
          </button>
        </div>
      </div>
    </section>
  );
}

export { EventModal };
