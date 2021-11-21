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

function CustomModal(props) {
  const [title, setTitle] = useState(props.activeEvent.title);
  const [description, setDescription] = useState(props.activeEvent.description);
  const [date, setDate] = useState(props.activeEvent.date);
  const [is_cancelled, setCancelled] = useState(props.activeEvent.is_cancelled);
  // const [toggle, setToggle] = useState(props.toggle)

  const postData = () => {
    const event = {
      ...props.activeEvent,
      "title": title,
      "description": description,
      "date": date,
      "is_cancelled": is_cancelled,
    }

    // TODO is below logic is good? shouldnt there be another check?
    if (typeof event === 'undefined' || typeof event.id === 'undefined') {
      axios.post("http://localhost:8000/api/events/", event).then((res) => console.log(res.data));
      return;
    }
    axios.put(`http://localhost:8000/api/events/${event.id}/`, event)
  };

  return (
    <Modal 
      isOpen={true} 
      toggle={props.toggle}
    >
      <ModalHeader toggle={props.toggle}>Event</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter event title"
            />
          </FormGroup>

          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter event description"
            />
          </FormGroup>

          <FormGroup>
            <Label for="date">Date</Label>
            <Input
              type="date"
              name="date"
              onChange={e => setDate(e.target.value)}
              value={date}
            />
          </FormGroup>

          <FormGroup check>
            <Label for="cancelled">
              <Input
                type="checkbox"
                name="cancelled"
                checked={is_cancelled}
                onChange={e => setCancelled(e.target.value)}
              />
              Cancelled
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        {/* TODO saving is not closing the modal */}
        <Button color="success" onClick={postData}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CustomModal;
