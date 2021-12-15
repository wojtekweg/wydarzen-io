import React, { Component } from "react";
import "./App.css";
import EventModal from "./components/EventModal";
import PlaceModal from "./components/PlaceModal";
import ImportModal from "./components/ImportModal";
import axios from "axios";
import config from "./config.json";
import { format, startOfMonth, subHours } from "date-fns";
import {
  MonthlyBody,
  MonthlyDay,
  MonthlyCalendar,
  DefaultMonthlyEventItem,
} from "@zach.codes/react-calendar";
import { MonthlyNav } from "./components/3rd-party/MonthlyNav";

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
      listDisplay: true,
      eventModal: false,
      placeModal: false,
      importModal: false,
      sortReversed: false,
      currentMonth: startOfMonth(new Date()),
      searchPhrase: "",
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

  handleSearchInput = (input) => {
    return this.setState({ searchPhrase: input });
  };

  invertSort = (status) => {
    return this.setState({ sortReversed: !!status });
  };

  setCurrentMonth = (month) => {
    return this.setState({ currentMonth: month });
  };

  getActiveEvents = () => {
    const { viewCancelled, sortReversed, searchPhrase } = this.state;
    let arr = this.state.eventsList
      .filter((event) => event.is_cancelled === viewCancelled)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    if (searchPhrase.length > 0) {
      // TODO search for ":", "/" etc will raise error
      arr = arr.filter((event) =>
        event.title.toLowerCase().match(searchPhrase.toLowerCase())
      );
    }
    if (sortReversed) {
      return arr.reverse();
    }
    return arr;
  };

  getActiveEventsForCalendarView = () => {
    let arr = [];
    this.getActiveEvents().forEach((i) =>
      arr.push({
        title: i.title,
        date: subHours(new Date(i.date), 1),
      })
    );
    return arr;
  };

  listDisplayView = (status) => {
    return this.setState({ listDisplay: !!status });
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
          className="btn btn-warning"
          onClick={() => this.handleDelete(event)}
        >
          Delete
        </button>
      </span>
    );
  };

  renderMenuButtons = () => {
    return (
      <div>
        <div className={"menu-buttons"}>
          <input
            className={`search-input ${
              this.state.searchPhrase !== "" ? "toggle" : null
            } justify-items-center`}
            placeholder="Search event title"
            onChange={(input) => this.handleSearchInput(input.target.value)}
          />
          <button
            className="btn"
            onClick={() => this.invertSort(!this.state.sortReversed)}
          >
            {this.state.sortReversed ? "⬆" : "⬇"}
          </button>
        </div>
        <div className={"menu-buttons"}>
          <button
            className={`btn toggle ${this.state.viewCancelled ? "active" : ""}`}
            onClick={() => this.displayCancelled(!this.state.viewCancelled)}
          >
            {this.state.viewCancelled ? "Cancelled" : "Active"} events
          </button>
          <button
            className={`btn toggle ${this.state.listDisplay ? "" : "active"}`}
            onClick={() => this.listDisplayView(!this.state.listDisplay)}
          >
            {this.state.listDisplay ? "List" : "Calendar"} view
          </button>
          |
          <button className="btn" onClick={this.refreshList}>
            Refresh list
          </button>
          |
          <button className="btn modal" onClick={() => this.createEvent(false)}>
            Add event
          </button>
          <button className="btn modal" onClick={() => this.createEvent(true)}>
            Import event
          </button>
          <button
            type="text"
            placeholder="Search for event name..."
            className="btn modal"
            value={this.searchPhrase}
            onClick={this.createPlace}
          >
            Add place
          </button>
        </div>
      </div>
    );
  };

  renderListItems = () => {
    const activeEvents = this.getActiveEvents();

    return activeEvents.map((event) => (
      <li key={event.id} className="events-list-row">
        <span
          className={`event-title ${
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

  renderCalendarItems = () => {
    // TODO days are not displayed, probably bug of the package
    return (
      <MonthlyCalendar
        currentMonth={this.state.currentMonth}
        onCurrentMonthChange={(date) => this.setCurrentMonth(date)}
      >
        <MonthlyNav />
        <MonthlyBody
          // omitDays={[2, 3, 4, 5, 6]}
          events={this.getActiveEventsForCalendarView()}
        >
          <MonthlyDay
            renderDay={(data) => {
              data.map((item, index) => (
                <DefaultMonthlyEventItem
                  key={index}
                  title={item.title}
                  // Format the date here to be in the format you prefer
                  date={format(item.date, "k:mm")}
                />
              ));
            }}
          />
        </MonthlyBody>
      </MonthlyCalendar>
    );
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
        <div className="mx-auto">
          <div
            // colorOverlay="#aaaaff"
            // className="blur-lg"
            // opacity="0.5"
            width="100%"
            height="5%"
            // blur={10}
          >
            <h1 className="text-3xl font-bold underline">
              <a href="/">wydarzen.io</a>
            </h1>
          </div>
          <div
            // colorOverlay="#aaaaff"
            // opacity="0.5"
            width="100%"
            height="5%"
            top="10"
            className="menu-buttons"
            // blur={10}
          >
            {this.renderMenuButtons()}
          </div>
        </div>
        <div className="row mx-100 my-5">
          <div className="col-md-6 col-sma-10 mx-auto p-0"></div>
          <div className="card p-3 mx-5">
            {this.state.listDisplay ? (
              <ul className="list-group">{this.renderListItems()}</ul>
            ) : (
              <div>{this.renderCalendarItems()}</div>
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
