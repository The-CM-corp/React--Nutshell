import React, { Component } from "react";
import { Link } from "react-router-dom";
import APIManager from "../../modules/APIManager";
import "./Event.css";

// this is the HTML representation of the event list

export default class EventList extends Component {
  state = {
    users: [],
    events: [],
    hideNewForm: true
  };

  componentDidMount() {
    const newState = {};

    this.props.getAllUsers().then(allUsers => {
      this.setState({
        users: allUsers
      });
    });

    APIManager.getAllEntries("events", "?_sort=date&_order=asc")
      .then(events => {
        this.setState({
          events: events
        });
      })

      .then(() => this.setState(newState));
  }

  addEvent = event =>
    APIManager.addEntry("events", event)
      .then(() => APIManager.getAllEntries("events", "?_sort=date&_order=asc"))
      .then(events =>
        this.setState({
          events: events
        })
      );

  deleteEvent = id =>
    APIManager.deleteEntry("events", id)
      .then(() => APIManager.getAllEntries("events", "?_sort=date&_order=asc"))
      .then(events =>
        this.setState({
          events: events
        })
      );

  handleNewClick = () => {
    const currentState = this.state.hideNewForm;
    this.setState({ hideNewForm: !currentState });
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewEvent = () => {
    const event = {
      title: this.state.title,
      date: this.state.date,
      synopsis: this.state.synopsis,
      location: this.state.location
    };

    // Create the event
    this.addEvent(event).then(() => {
      this.setState({
        title: "",
        date: "",
        synopsis: "",
        location: ""
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="event__title bryan">Events</h1>
        <div className="new__event bryans__class">
          <button
            type="button"
            className={this.state.hideNewForm ? "btn new__button" : "hide"}
            id="new__button"
            onClick={() => {
              this.handleNewClick();
            }}
          >
            Add Event
          </button>
          <div
            className={this.state.hideNewForm ? "hide" : null}
            id="new__event__form"
          >
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Event Title
                </span>
              </div>
              <input
                value={this.state.title ||""}
                type="text"
                className="form-control"
                onChange={this.handleFieldChange}
                id="title"
                placeholder="Event Name"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Event Date
                </span>
              </div>
              <input
                value={this.state.date ||""}
                type="date"
                className="form-control"
                onChange={this.handleFieldChange}
                id="date"
                placeholder="Date"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Event Synopsis
                </span>
              </div>
              <input
                value={this.state.synopsis ||""}
                type="text"
                className="form-control"
                onChange={this.handleFieldChange}
                id="synopsis"
                placeholder="Event Synopsis"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Event Location
                </span>
              </div>
              <input
                value={this.state.location ||""}
                type="text"
                className="form-control"
                onChange={this.handleFieldChange}
                id="location"
                placeholder="Event Location"
              />
            </div>
            <div className="button__holder">
              <button
                className="btn"
                onClick={() => {
                  this.handleNewClick();
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn"
                onClick={() => {
                  this.constructNewEvent();
                  this.handleNewClick();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <section className="events">
          {this.state.events.map(event => (
            <div key={event.id} className="card">
              <div className={`card-body details ${event.id}`}>
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
                    onClick={() => this.deleteEvent(event.id)}
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
