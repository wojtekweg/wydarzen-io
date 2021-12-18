import React, { useState } from "react";
import axios from "axios";
import config from "../config.json";

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

function CustomModal(props) {
  const [title, setTitle] = useState(props.activeEvent.title);
  const [description, setDescription] = useState(props.activeEvent.description);
  const [date, setDate] = useState(props.activeEvent.date);
  const [is_cancelled, setCancelled] = useState(props.activeEvent.is_cancelled);
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
      is_cancelled: is_cancelled,
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
  };

  return (
    <div isOpen={true} toggle={props.toggle}>
      <h3 toggle={props.toggle}>Event</h3>
      <div>
        <div>
          <div>
            <p for="title">Title</p>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
            />
          </div>

          <div>
            <p for="description">Description</p>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
            />
          </div>

          <div>
            <p for="date">Date</p>
            <input
              type="date"
              name="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>

          <div check>
            <p for="cancelled">
              <input
                type="checkbox"
                name="cancelled"
                checked={is_cancelled}
                onChange={(e) => setCancelled(e.target.value)}
              />
              Cancelled
            </p>
          </div>

          <div>
            <p for="picture">Picture</p>

            {pictureUploadError !== null ? (
              <p>
                <b>❗ {pictureUploadError}</b>
              </p>
            ) : (
              <br />
            )}
            {isPictureUploadDisabled ? (
              <p>
                ℹ️ File is already uploaded, editing uploaded files is not yet
                possible
              </p>
            ) : (
              <input
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
      </div>
      <div>
        <button color="success" onClick={postData}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CustomModal;
