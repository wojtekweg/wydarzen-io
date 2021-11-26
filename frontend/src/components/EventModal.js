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
  const is_picture_upload_disabled = !!picture;

  const handlePictureUpload = async (file, type = file.type) => {
    setPicture(
      new Blob([new Uint8Array(await file.arrayBuffer())], { type: type })
    );
    if (picture instanceof Blob !== true) {
      console.error("Incorrect file upload of: " + picture);
      return;
    }
    if (picture.size === 0) {
      console.error("Empty file uploaded");
      return;
    }
  };

  const postData = () => {
    const event = {
      ...props.activeEvent,
      title: title,
      description: description,
      date: date,
      is_cancelled: is_cancelled,
      picture: picture,
    };

    let formData = new FormData();
    for (let key in event) {
      formData.append(key, event[key]);
    }

    if (picture === null) {
      console.error("No picture uploaded");
      return;
    }
    if (!is_picture_upload_disabled) {
      formData.append(
        "picture",
        picture,
        `${title}-picture.${picture.type.split("/").pop()}`
      );
    } else {
      // TODO do zaorania calkiem to gowno XD teraz dziala najgorzej jak sie da

      // TODO it is a bug to fix, because the image has to be reuploaded
      //  because server is not accepting a string path to image
      //  convert what we have to a blob
      const extension = String(picture).split(".").pop();
      const f = async () => {
        await fetch(picture).then((r) => {
          console.log(r);

          handlePictureUpload(r, extension);
          console.log(picture);
          formData.append(
            "picture",
            picture,
            `${title}-picture.${picture.type.split("/")[1]}`
          );

          let url = "http://localhost:8000/api/events/";
          if (typeof event != "undefined" && typeof event.id != "undefined") {
            console.log(event);
            axios.put(url + `${event.id}/`, event).catch(logError);
            return;
          }
        });
      };
      f();
      return;
    }

    // TODO is below logic is good? shouldnt there be another check?
    let url = "http://localhost:8000/api/events/";
    if (typeof event != "undefined" && typeof event.id != "undefined") {
      console.log(event);
      axios.put(url + `${event.id}/`, event).catch(logError);
      return;
    }
    axios.post(url, formData).catch(logError);
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
            <br />
            {is_picture_upload_disabled ? (
              <p>File is already uploaded</p>
            ) : (
              <input
                type="file"
                id="picture"
                label="picture file"
                disabled={!!is_picture_upload_disabled}
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
