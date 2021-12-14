import React, { useState } from "react";
import axios from "axios";
import config from "../config.json";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
} from "reactstrap";

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

function CustomModal(props) {
  // const [toggle, setToggle] = useState(props.toggle);
  const [uploadedFile, setUploadedFile] = useState();

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", uploadedFile);
    setUploadedFile(formData);
  };

  const postData = () => {
    axios.post(config.url + "event_file_upload/", uploadedFile).catch(logError);
    return;
  };

  return (
    <Modal isOpen={true} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Import event</ModalHeader>
      <ModalBody>
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
        <Form>
          <FormGroup>
            <Label for="file">
              <b>Calendar file</b>
            </Label>
            <br />
            <input
              type="file"
              id="file"
              label="calendar file"
              onChange={(e) => handleFileUpload(e.target.files[0])}
              accept="application/json, text/calendar"
            />
          </FormGroup>
        </Form>
        {uploadedFile === null ? null : (
          <span className="code">
            <p>{printFormData(uploadedFile)}</p>
          </span>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={postData}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CustomModal;
