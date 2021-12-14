import React, { Component } from "react";
import "./App.css";
import EventModal from "./components/EventModal";
import PlaceModal from "./components/PlaceModal";
import ImportModal from "./components/ImportModal";
import axios from "axios";
import config from "./config.json";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const emptyEvent = {
  title: "",
  description: "",
  is_cancelled: false,
  date: "2021-01-01",
  place: 1,
  place_name: "",
  picture: null,
};

const emptyPlace = {
  name: "",
  country: "PL",
};

class App extends Component {
  // TODO rewrite to function component
  constructor(props) {
    super(props);
    this.state = {
      viewCancelled: false,
      displayTimeline: false,
      eventModal: false,
      placeModal: false,
      importModal: false,
      eventsList: [],
      activeEvent: { ...emptyEvent },
      activePlace: { ...emptyPlace },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get(`${config.url}events/`)
      .then((res) => this.setState({ eventsList: res.data }))
      .catch((err) => console.log(err));
  };

  displayCancelled = (status) => {
    return this.setState({ viewCancelled: !!status });
  };

  displayTimelineView = (status) => {
    return this.setState({ displayTimeline: !!status });
  };

  renderEventButtons = (event) => {
    return (
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
        )}
        <button
          className="btn btn-danger mx-2"
          onClick={() => this.handleDelete(event)}
        >
          Delete
        </button>
      </span>
    );
  };

  renderTabList = () => {
    return (
      <div className="my-1 tab-list">
        <button
          className={`btn btn-primary mx-1 ${
            this.state.viewCancelled ? "active" : ""
          }`}
          onClick={() => this.displayCancelled(true)}
        >
          Cancelled
        </button>
        <button
          onClick={() => this.displayCancelled(false)}
          className={`btn btn-primary mx-1 ${
            this.state.viewCancelled ? "" : "active"
          }`}
        >
          Active events
        </button>
        <button
          onClick={() => this.displayTimelineView(!this.state.displayTimeline)}
          className={`btn btn-primary mx-1 ${
            this.state.displayTimeline ? "" : "active"
          }`}
        >
          Timeline view
        </button>
      </div>
    );
  };

  renderListItems = () => {
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
        <span>{this.renderEventButtons(event)}</span>
      </li>
    ));
  };

  renderTimelineItems = () => {
    const { viewCancelled } = this.state;
    const activeEvents = this.state.eventsList.filter(
      (event) => event.is_cancelled === viewCancelled
    );

    return activeEvents.map((event) => (
      <VerticalTimeline lineColor="#0000FF">
        <VerticalTimelineElement
          className={`vertical-timeline-element--work ${
            this.state.viewCancelled ? "cancelled-event" : ""
          }`}
          key={event.id}
          date={event.date}
          contentStyle={{
            background: `${this.state.viewCancelled ? "#CCCCFF" : "#AAAAFF"}`,
            color: "#fff",
          }}
          iconStyle={{ background: "#0000FF", color: "#0000FF" }}
          // icon={<WorkIcon />}
        >
          <h3>{event.title}</h3>
          <h5>{event.place_name}</h5>
          <p className="event-date">{event.date}</p>
          <p>
            {event.description}
            <br />
            <br />
          </p>
          <span>{this.renderEventButtons(event)}</span>
          <br />
        </VerticalTimelineElement>
      </VerticalTimeline>
    ));
  };

  toggleAdd = () => {
    this.setState({ eventModal: !this.state.eventModal });
  };

  toggleImport = () => {
    this.setState({ importModal: !this.state.importModal });
  };

  togglePlaces = () => {
    this.setState({ placeModal: !this.state.placeModal });
  };

  toggleAndRefreshEvents = () => {
    // TODO saving a model is not closing it and refreshing - this function does not work at all
    this.setState({ eventModal: false });
    this.refreshList();
  };

  changeCancel = (event) => {
    axios
      .patch(`${config.url}events/${event.id}/`, {
        is_cancelled: !event.is_cancelled,
      })
      .then((res) => this.refreshList());
  };

  handleDelete = (event) => {
    axios
      .delete(`${config.url}events/${event.id}/`)
      .then((res) => this.refreshList());
  };

  createEvent = (is_import = false) => {
    const event = { ...emptyEvent };
    if (is_import) {
      this.setState({
        activeEvent: event,
        importModal: !this.state.importModal,
      });
      return;
    }
    this.setState({ activeEvent: event, eventModal: !this.state.eventModal });
  };

  createPlace = () => {
    const place = { ...emptyPlace };
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
              <button
                onClick={() => this.createEvent(false)}
                className="btn btn-primary mx-1"
              >
                Add event
              </button>
              <button
                onClick={() => this.createEvent(true)}
                className="btn btn-primary mx-1"
              >
                Import event
              </button>
              <button
                onClick={this.createPlace}
                className="btn btn-primary mx-1"
              >
                Add place
              </button>
              <button
                onClick={this.refreshList}
                className="btn btn-primary mx-1"
              >
                Refresh list
              </button>
            </div>
            {this.renderTabList()}
            {this.state.displayTimeline ? (
              <ul className="list-group list-group-flush mx-5">
                {this.renderListItems()}
              </ul>
            ) : (
              <div>{this.renderTimelineItems()}</div>
            )}
          </div>
        </div>
        {this.state.eventModal ? (
          <EventModal
            activeEvent={this.state.activeEvent}
            toggle={this.toggleAdd}
            onSave={this.toggleAndRefreshEvents}
          />
        ) : null}
        {this.state.importModal ? (
          <ImportModal
            activeEvent={this.state.activeEvent}
            toggle={this.toggleImport}
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
