import React, { Component } from "react";
import "./App.css";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCancelled: false,
      eventsList: [],
      activeEvent: {
        title: "",
        description: "",
        is_cancelled: false,
        date: "2021-11-12",
        place: 1,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios //Axios to send and receive HTTP requests
      .get("http://localhost:8000/api/events/")
      .then((res) => this.setState({ eventsList: res.data }))
      .catch((err) => console.log(err));
  };

  displayCompleted = (status) => {
    return this.setState({ viewCompleted: Boolean(status) });
  }; // TODO delete that?

  displayCancelled = (status) => {
    return this.setState({ viewCancelled: !!status });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCancelled(true)}
          className={this.state.viewCancelled ? "active" : ""}
        >
          Cancelled
        </span>
        <span
          onClick={() => this.displayCancelled(false)}
          className={this.state.viewCancelled ? "" : "active"}
        >
          Active
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCancelled } = this.state;
    const newEvents = this.state.eventsList.filter(
      (event) => event.is_cancelled === viewCancelled
    );

    return newEvents.map((event) => (
      <li
        key={event.id}
        className="list-group-event d-flex justify-content-between align-items-center"
      >
        <span
          className={`event-title mr-2 ${
            this.state.viewCancelled ? "cancelled-event" : ""
          }`}
          title={event.title}
        >
          {event.title}
        </span>
        <span className="event-date mr-2">{event.date}</span>
        <span>
          <button
            className="btn btn-info mr-2"
            onClick={() => this.editEvent(event)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger mr-2"
            onClick={() => this.handleDelete(event)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (event) => {
    this.toggle();
    console.log("HANDLE SUBMIT")
    console.log(event)

    // TODO is below logic is good? shouldnt there be another check?
    if (typeof event === 'undefined' || typeof event.id === 'undefined') {
      axios
      .post("http://localhost:8000/api/events/", event)
      .then((res) => this.refreshList());
      return;
    }
    axios
        .put(`http://localhost:8000/api/events/${event.id}/`, event)
        .then((res) => this.refreshList());
  };

  handleDelete = (event) => {
    axios
      .delete(`http://localhost:8000/api/events/${event.id}/`)
      .then((res) => this.refreshList());
  };

  createEvent = () => {
    const event = {
      title: "",
      description: "",
      is_cancelled: false,
      date: new Date(),
    };
    this.setState({ activeEvent: event, modal: !this.state.modal });
  };

  editEvent = (event) => {
    this.setState({ activeEvent: event, modal: !this.state.modal });
  };

  render() {
    return (
      <main className="context">
        <h1 className="text-center my-4">wydarzen.io</h1>
        <div className="row">
          <div className="col-md-6 col-sma-10 mx-auto p-0"></div>
          <div className="card p-3">
            <div>
              <button onClick={this.createEvent} className="btn btn-primary">
                Add event
              </button>
            </div>
            {this.renderTabList()}
            <ul className="list-group list-group-flush">
              {this.renderItems()}
            </ul>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeEvent={this.state.activeEvent}
            // toggle={this.toggle}
            onSave={this.handleSubmit()}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
