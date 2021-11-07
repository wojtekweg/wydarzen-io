import React, { Component } from "react";
import { render } from "react-dom";
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

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeEvent: this.props.activeEvent,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.cancelled;
    }
    const activeEvent = { ...this.state.activeEvent, [name]: value };
    this.setState({ activeEvent });
  };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Event</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeEvent.title}
                onChange={this.handleChange}
                placeholder="Enter Event Title"
              />
            </FormGroup>

            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                value={this.state.activeEvent.description}
                onChange={this.handleChange}
                placeholder="Enter Event Description"
              />
            </FormGroup>

            <FormGroup check>
              <Label for="cancelled">
                <Input
                  type="checkbox"
                  name="cancelled"
                  checked={this.state.activeEvent.is_cancelled}
                  onChange={this.handleChange}
                />
                Cancelled
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeEvent)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CustomModal;
