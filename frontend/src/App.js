import React, { Component } from "react";
import "./App.css";
import CustomModal from "./components/Modal";

const events = [
  {
    id: 1,
    title: "Plan projektu ze wzorców projektowych",
    date: "2021-11-12",
    place: 1,
    is_cancelled: false,
  },
  {
    id: 2,
    title: "Plan projektu ze wzorców projektowych anulowany",
    date: "2021-11-12",
    place: 1,
    is_cancelled: true,
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCancelled: false,
      eventsList: events,
    };
  }

  displayCancelled = (status) => {
    return this.setState({ viewCancelled: status }); // TODO: make sure it is bool
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
        <span>
          <button className="btn btn-info mr-2">Edit</button>
          <button className="btn btn-danger mr-2">Delete</button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="context">
        <h1 className="text-center my-4">wydarzen.io</h1>
        <div className="row">
          <div className="col-md-6 col-sma-10 mx-auto p-0"></div>
          <div className="card p-3">
            <div>
              <button className="btn btn-primary">Add event</button>
            </div>
            {this.renderTabList()}
            <ul className="list-group list-group-flush">
              {this.renderItems()}
            </ul>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
