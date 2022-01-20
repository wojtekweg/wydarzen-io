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

const CustomModal = (props) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [toggle, setToggle] = useState(props.isOpen);

  const postData = async () => {
    const formData = new FormData();
    formData.append("file", uploadedFile);
    await axios
      .post(config.url + "event_file_upload/", formData)
      .catch(logError);

    setToggle(false);
    return;
  };

  return (
    <section
      className={`modal-section ${toggle ? "" : "invisible"}`}
      id="popup-modal"
    >
      <div className="modal-container">
        <div className="modal-header">
          <h1 className="modal-header-h1">Import events</h1>
          <p className="modal-p">
            For exporting your events refer to{" "}
            <a
              className="navbar-link"
              href="https://www.facebook.com/help/152652248136178/"
            >
              Facebook help page
            </a>
            .<p>You can import:</p>
            <p>
              (1) .ics (Google Calendar, Outlook, Facebook Event, Apple
              Calendar),{" "}
            </p>
            <p>(2) .zip files exported from Notion calendar</p>
            <p>
              No personal information is processed, but if you want to have full
              control of your data, you can manually create the (3) .json file
              with data that you want to upload.
            </p>
          </p>
        </div>
        <div className="modal-full-row py-2">
          <div className="w-full">
            <label htmlFor="calendar-file" className="modal-label">
              Calendar file
            </label>

            <br />
            <input
              type="file"
              id="file"
              label="calendar file"
              onChange={(e) => setUploadedFile(e.target.files[0])}
              className="modal-input"
              accept="application/json, text/calendar, application/zip"
            />
          </div>

          <div className="pt-5 flex modal-full-row">
            <button className="modal-cancel" onClick={() => setToggle(false)}>
              Cancel
            </button>
            <button className="modal-save" id="save" onClick={postData}>
              Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomModal;
