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
  const [name, setName] = useState(props.activePlace.name);
  const [country, setCountry] = useState(props.activePlace.country);

  const postData = () => {
    const place = {
      ...props.activePlace,
      "name": name,
      "country": country,
    }

    // TODO is below logic is good? shouldnt there be another check?

    // TODO recheck if backend sends place id

    if (typeof place === 'undefined' || typeof place.id === 'undefined') {
      axios.post("http://localhost:8000/api/places/", place)
      return;
    }
    axios.put(`http://localhost:8000/api/palces/${place.id}/`, place)
  };

  return (
    <Modal 
      isOpen={true} 
      toggle={props.toggle}
    >
      <ModalHeader toggle={props.toggle}>Place</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter place name"
            />
          </FormGroup>

          <FormGroup>
            <Label for="country">Country</Label>
            <Input
              type="text"
              name="country"
              value={country}
              onChange={e => setCountry(e.target.value)}
              placeholder="Enter place country"
            />
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
