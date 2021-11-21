import React, { Component } from "react";
import "./App.css";
import EventModal from "./components/EventModal";
import PlaceModal from "./components/PlaceModal";
import axios from "axios";

const emptyEvent = {
  title: "",
  description: "",
  is_cancelled: false,
  date: "2021-01-01",
  place: 1,
  picture: null
}

const emptyPlace = {
  name: "",
  country: "PL"
}

class App extends Component {
  // TODO rewrite to function component
  constructor(props) {
    super(props);
    this.state = {
      viewCancelled: false,
      eventModal: false,
      placeModal: false,
      eventsList: [],
      activeEvent: {...emptyEvent},
      activePlace: {...emptyPlace}
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

  displayCancelled = (status) => {
    return this.setState({ viewCancelled: !!status });
  };

  renderTabList = () => {
    return (
      <div className="my-1 tab-list">
        <button
          className={`btn btn-primary mx-1 ${this.state.viewCancelled ? 'active' : ''}`}
          onClick={() => this.displayCancelled(true)}
        >
          Cancelled
        </button>
        <button
          onClick={() => this.displayCancelled(false)}
          className={`btn btn-primary mx-1 ${this.state.viewCancelled ? '' : 'active'}`}
        >
          Active events
        </button>
      </div>
    );
  };

  renderItems = () => {
    const { viewCancelled } = this.state;
    const activeEvents = this.state.eventsList.filter(
      (event) => event.is_cancelled === viewCancelled
    );

    return activeEvents.map((event) => (
      <li
        key={event.id}
        className="list-group-event d-flex justify-content-between align-items-center my-2"
      >
        <span
          className={`event-title mx-12 ${
            this.state.viewCancelled ? "cancelled-event" : ""
          }`}
          title={event.title}
        >
          {event.title}
        </span>
        <span className="event-date mr-2">{event.date}</span>
        <span>
          {this.state.viewCancelled ? (
            <button
              className="btn btn-success mx-2"
              onClick={() => this.changeCancel(event)}
            >
              Reactivate
            </button>
          ) : (
            <span>
              <button
                className="btn btn-info mx-2"
                onClick={() => this.editEvent(event)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger mx-2"
                onClick={() => this.changeCancel(event)}
              >
                Cancel
              </button>
            </span>
          )
          }
          <button
            className="btn btn-danger mx-2"
            onClick={() => this.handleDelete(event)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  toggleEvents = () => {
    this.setState({ eventModal: !this.state.eventModal });
  };

  togglePlaces = () => {
    this.setState({ placeModal: !this.state.placeModal });
  };

  toggleAndRefreshEvents = () => {
    this.setState({ eventModal: false });
    this.refreshList()
  }

  changeCancel = (event) => {
    axios
      .put(`http://localhost:8000/api/events/${event.id}/`, {...event, "is_cancelled": !event.is_cancelled})
      .then((res) => this.refreshList());
  }

  handleDelete = (event) => {
    axios
      .delete(`http://localhost:8000/api/events/${event.id}/`)
      .then((res) => this.refreshList());
  };

  createEvent = () => {
    const event = {...emptyEvent};
    this.setState({ activeEvent: event, eventModal: !this.state.eventModal });
  };

  createPlace = () => {
    const place = {...emptyPlace};
    this.setState({ activePlace: place, placeModal: !this.state.placeModal });
  };

  editEvent = (event) => {
    this.setState({ activeEvent: event, eventModal: !this.state.eventModal });
  };

  render() {
    return (
      <main className="context">
        <h1 className="text-center my-4">wydarzen.io</h1>
        <div className="row mx-10">
          <div className="col-md-6 col-sma-10 mx-auto p-0"></div>
          <div className="card p-3 mx-5">
            <div>
              <button onClick={this.createEvent} className="btn btn-primary mx-1">
                Add event
              </button>
              <button onClick={this.createPlace} className="btn btn-primary mx-1">
                Add place
              </button>
              <button onClick={this.refreshList} className="btn btn-primary mx-1">
                Refresh list
              </button>
            </div>
            {this.renderTabList()}
            <ul className="list-group list-group-flush mx-5">
              {this.renderItems()}
            </ul>
          </div>
        </div>
        {this.state.eventModal ? (
          <EventModal
            activeEvent={this.state.activeEvent}
            toggle={this.toggleEvents}
            onSave={this.toggleAndRefreshEvents}
          />
        ) : null}
        {this.state.placeModal ? (
          <PlaceModal
            activePlace={this.state.activePlace}
            toggle={this.togglePlaces}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
