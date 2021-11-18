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
// import DatePicker from "react-datepicker";
// TODO make the datepicker possible to choose
// by using this lib: https://final-form.org/docs/react-final-form/getting-started
// from this answer https://stackoverflow.com/a/65133540
// Here is datepicker code:

// const [startDate, setStartDate] = useState(new Date());

// let handleColor = (time) => {
//   return time.getHours() > 12 ? "text-success" : "text-error";
// };

// const RenderDatePicker = ({ name, input, input: { value, onChange } }) => {
//   return (
//     <DatePicker
//       showTimeSelect
//       selected={startDate}
//       //onChange={(date) => setStartDate(date)}
//       onChange={handleChange}
//       minDate={new Date()}
//       timeClassName={handleColor}
//     />
//   );
// };

function CustomModal(props) {
  const [values, setValues] = useState({ val: [] });

  // TODO handle change of forms
  const handleChange = (event) => {
    let vals = [...values.val];
    vals[this] = event.target.value;
    setValues({ val: vals });
  };

  // const handleChange = (e) => {
  //   let { name, value } = e.target;
  //   if (e.target.type === "checkbox") {
  //     value = e.target.cancelled;
  //   }
  //   // if (e.target.type === "date") {
  //   //   value = e.target.date;
  //   // }
  //   console.log(e);
  //   console.log(name, value);
  //   e.persist();

  //   this.setState((prevState) => ({
  //     activeEvent: {
  //       ...prevState.activeEvent,
  //       [e.target.name]: e.target.value,
  //     },
  //   }));
  // };

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
              value={props.activeEvent.title}
              onChange={handleChange}
              placeholder="Enter event title"
            />
          </FormGroup>

          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              value={props.activeEvent.description}
              onChange={handleChange}
              placeholder="Enter event description"
            />
          </FormGroup>

          <FormGroup>
            <Label for="date">Date</Label>
            <Input
              type="date"
              name="date"
              onChange={handleChange}
              value={props.activeEvent.date}
            />
          </FormGroup>

          <FormGroup check>
            <Label for="cancelled">
              <Input
                type="checkbox"
                name="cancelled"
                checked={props.activeEvent.is_cancelled}
                // onChange={handleChange}
              />
              Cancelled
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => props.onSave(props.activeEvent)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CustomModal;
