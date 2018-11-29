import React, { Component } from "react";
import { Link } from "react-router-dom";
import APIManager from "../../modules/APIManager";
import "./Event.css";
// import EventCard from "./EventCard";

// this is the HTML representation of the event list

export default class EventList extends Component {
  state = {
    users: [],
    events: []
  };

  componentDidMount() {
    const newState = {};

    this.props.getAllUsers().then(allUsers => {
      this.setState({
        users: allUsers
      });
    });

    APIManager.getAllEntries("events")
      .then(events => {
        this.setState({
          events: events
        });
      })

      .then(() => this.setState(newState));
  }

  addEvent = event =>
    APIManager.addEntry("events", event)
      .then(() => APIManager.getAllEntries("events"))
      .then(events =>
        this.setState({
          events: events
        })
      );

  deleteEvent = id =>
    APIManager.deleteEntry("events", id)
      .then(() => APIManager.getAllEntries("events"))
      .then(events =>
        this.setState({
          events: events
        })
      );

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewEvent = evt => {
    evt.preventDefault();
    const event = {
      title: this.state.title,
      date: this.state.date,
      synopsis: this.state.synopsis,
      location: this.state.location
    };

    // Create the event
    this.addEvent(event);
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="event__title bryan">Events</h1>

        <form className="eventForm bryan">
          <div className="form-group">
            <label htmlFor="eventTitle">Event Title</label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleFieldChange}
              id="title"
              placeholder="Event Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              onChange={this.handleFieldChange}
              id="date"
              placeholder="Date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventSynopsis">Event Synopsis</label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleFieldChange}
              id="synopsis"
              placeholder="Event Synopsis"
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventLocation">Event Location</label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleFieldChange}
              id="location"
              placeholder="Event Location"
            />
          </div>
          <button
            type="submit"
            onClick={this.constructNewEvent}
            className="btn"
          >
            Add Event
          </button>
        </form>

        <section className="events">
          {this.state.events.map(event => (
            <div key={event.id} className="card">
              <div className="card-body details">
                <h4 className="card-title">{event.title}</h4>
                <h6 className="card-title">{event.date}</h6>
                <h6 className="card-title">
                  Location:
                  <br />
                  {event.location}
                </h6>
                <p className="card-details">
                  Synopsis:
                  <br />
                  {event.synopsis}
                </p>
                <div className="card-button">
                  <button type="button" className="btn">
                    <Link className="nav-link" to={`/events/edit/${event.id}`}>
                      Edit
                    </Link>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      this.deleteEvent(event.id).then(() =>
                        this.props.history.push("/events")
                      )
                    }
                    className="card-button btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </React.Fragment>
    );
  }
}
