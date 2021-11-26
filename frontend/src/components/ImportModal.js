// TODO edit it to allow import files

import React, { useState } from "react";
import axios from "axios";
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

function CustomModal(props) {
  // const [toggle, setToggle] = useState(props.toggle)

  const postData = () => {
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
            <Label for="picture">
              <b>Calendar file</b>
            </Label>
            <br />
            <input
              type="file"
              id="picture"
              label="picture file"
              // onChange={(e) => handlePictureUpload(e.target.files[0])}
            />
          </FormGroup>
        </Form>
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
