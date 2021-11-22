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
    console.log(error.response.data);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
};

function CustomModal(props) {
  const [title, setTitle] = useState(props.activeEvent.title);
  const [description, setDescription] = useState(props.activeEvent.description);
  const [date, setDate] = useState(props.activeEvent.date);
  const [is_cancelled, setCancelled] = useState(props.activeEvent.is_cancelled);
  const [picture, setPicture] = useState(props.activeEvent.picture);

  const postData = () => {
    const event = {
      ...props.activeEvent,
      title: title,
      description: description,
      date: date,
      is_cancelled: is_cancelled,
      picture: picture,
    };

    // TODO handle file upload
    let formData = new FormData();

    console.log(event);

    formData.forEach((value, key) => (event[key] = value));
    formData.append("picture", picture, `${title}-picture`);

    console.log(formData.get());

    // TODO is below logic is good? shouldnt there be another check?
    let url = "http://localhost:8000/api/events/";
    if (typeof event != "undefined" && typeof event.id != "undefined") {
      axios.put(url + `${event.id}/`, event).catch(logError);
    }
    axios
      .post(url, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      })
      .catch(logError);
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
            <input
              type="file"
              id="picture"
              onChange={(e) => setPicture(e.target.value)}
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
