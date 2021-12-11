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
  Input,
  Label,
} from "reactstrap";
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
    <Modal isOpen={true} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Event</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
            />
          </FormGroup>

          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
            />
          </FormGroup>

          <FormGroup>
            <Label for="date">Date</Label>
            <Input
              type="date"
              name="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </FormGroup>

          <FormGroup check>
            <Label for="cancelled">
              <Input
                type="checkbox"
                name="cancelled"
                checked={is_cancelled}
                onChange={(e) => setCancelled(e.target.value)}
              />
              Cancelled
            </Label>
          </FormGroup>

          <FormGroup>
            <Label for="picture">Picture</Label>

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
