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

function CustomModal(props) {
  // const [toggle, setToggle] = useState(props.toggle);
  const [jsonFile, setJsonFile] = useState(null);

  const handleFileUpload = async (file, type = file.type, e) => {
    // Design pattern - Adapter
    if (type.includes("json")) {
      console.log(file);
      setJsonFile(JSON.parse(file));
    } else if (type.includes("ics")) {
      // TODO convert to .json
    }
  };

  const handleFileSelect = (evt) => {
    // TODO parse properly the .json file
    let reader = new FileReader();
    // reader.onload = function (e) {
    //   that.displayData(e.target.result);
    // };
    reader.readAsText(evt.target.files[0]);
    setJsonFile(JSON.parse(JSON.stringify(evt.target.files[0])));
  };

  const postData = () => {
    axios.post(config.url + "events/", jsonFile).catch(logError);
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
              // onChange={(e) => handleFileUpload(e.target.files[0])}
              onChange={handleFileSelect}
            />
          </FormGroup>
        </Form>
        {jsonFile === null ? null : (
          <span className="code">
            <p>{JSON.stringify(jsonFile)}</p>
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
