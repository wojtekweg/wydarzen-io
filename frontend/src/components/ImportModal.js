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

const printFormData = (formData) => {
  // TODO printing is not working properly
  let retString = "";
  // for (var [key, value] of formData) {
  //   retString += `${key}: ${value}`;

  //   if (value instanceof FormData) {
  //     for (var [key2, value2] of value) {
  //       retString += `${key2}: ${value2}`;
  //     }
  //   }
  // }
  return retString;
};

const CustomModal = (props) => {
  // const [toggle, setToggle] = useState(props.toggle);
  const [uploadedFile, setUploadedFile] = useState(null);

  const postData = async () => {
    const formData = new FormData();
    formData.append("file", uploadedFile);
    await axios
      .post(config.url + "event_file_upload/", formData)
      .catch(logError);
    return;
  };

  return (
    <div isOpen={true} toggle={props.toggle}>
      <div toggle={props.toggle}>Import event</div>
      <div>
        <p>
          For exporting your events refer to{" "}
          <a href="https://www.facebook.com/help/152652248136178/">
            Facebook help page
          </a>
          .
        </p>
        <p>
          You can import .ics or .json files here directly. No personal
          information is processed, but if you want to have full control of what
          is processed, you can manually edit the .json file before uploading.
        </p>
        <div>
          <div>
            <p for="file">
              <b>Calendar file</b>
            </p>
            <br />
            <input
              type="file"
              id="file"
              label="calendar file"
              onChange={(e) => setUploadedFile(e.target.files[0])}
              accept="application/json, text/calendar"
            />
          </div>
        </div>
        {uploadedFile === null ? null : (
          <span className="code">
            <p>{printFormData(uploadedFile)}</p>
          </span>
        )}
      </div>
      <div>
        <button color="success" onClick={postData} type="submit">
          Save
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
