import React, { useState, setState } from "react";
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
  const [name, setName] = useState(props.activeEvent.name);
  const [description, setDescription] = useState(props.activeEvent.description);
  const [date, setDate] = useState(props.activeEvent.date);
  const [is_cancelled, setCancelled] = useState(props.activeEvent.is_cancelled);

  const postData = () => {
    const req_json = {
      "title": name,
      "description": description,
      "date": "2021-11-12",
      "is_cancelled": is_cancelled,
      "place": 1,
    }

    // TODO resolve how to pass data from child component (Modal) to parent component (App)
  }


  return (
    <Modal isOpen={true} toggle={props.toggle}>
      {/* <ModalHeader toggle={props.toggle}>Event</ModalHeader> */}
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              value={name}
              onChange={e => setName(e.target.value)}
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
        <Button color="success" onClick={postData()}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CustomModal;
