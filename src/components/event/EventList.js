import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
// import EventEdit from "./EventEdit"
import "./Event.css";

// this is the HTML representation of the event list

export default class EventList extends Component {
  constructor(props) {
    super(props)
    this.eventRefs = []
  }
  state = {
    users: [],
    events: [],
    editTitle: "",
    editDate: "",
    editSynopsis: "",
    editLocation: "",
    editId: "",
    hideNewForm: true,
    hideEditForm: true
  };

  componentDidMount() {
    this.eventRefs[0] && this.eventRefs[0].focus()

    const newState = {};

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

  editEvent = (editId, editEvent) =>
    APIManager.editEntry("events", editId, editEvent)
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

  handleEditClick = (
    editTitle,
    editDate,
    editSynopsis,
    editLocation,
    editId
  ) => {
    const currentState = this.state.hideNewForm;
    this.setState({
      hideEditForm: !currentState,
      editTitle: editTitle,
      editDate: editDate,
      editSynopsis: editSynopsis,
      editLocation: editLocation,
      editId: editId
    });
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

  constructEditedEvent = () => {
    // evt.preventDefault();
    const editEvent = {
      title: this.state.editTitle,
      date: this.state.editDate,
      synopsis: this.state.editSynopsis,
      location: this.state.editLocation,
      id: this.state.editId
    };
    this.editEvent(editEvent.id, editEvent);
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
                value={this.state.title || ""}
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
                value={this.state.date || ""}
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
                value={this.state.synopsis || ""}
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
                value={this.state.location || ""}
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
          {this.state.events.map(event, index => (
            <div key={event.id}{index} className="card">
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
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      this.handleEditClick(
                        event.title,
                        event.date,
                        event.synopsis,
                        event.location,
                        event.id
                      );
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => this.deleteEvent(event.id)}
                    className="card-button btn"
                  >
                    Delete
                  </button>
                </div>
                {/* <EventEdit/> */}
                <form
                  className={this.state.hideEditForm ? "hide" : null}
                  id="new__event__form"
                >
                  <div className="form-group">
                    <label htmlFor="eventTitle">Event Title</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleFieldChange}
                      id="editTitle"
                      placeholder="Event Name"
                      defaultValue={event.title}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={this.handleFieldChange}
                      id="editDate"
                      placeholder="Date"
                      defaultValue={event.date}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="eventSynopsis">Event Synopsis</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleFieldChange}
                      id="editSynopsis"
                      placeholder="Event Synopsis"
                      defaultValue={event.synopsis}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="eventLocation">Event Location</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleFieldChange}
                      id="editLocation"
                      placeholder="Event Location"
                      defaultValue={event.location}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control hide"
                      onChange={this.handleFieldChange}
                      id="editId"
                      placeholder="event id"
                      defaultValue={event.id}
                    />
                  </div>
                  <div className="button__holder">
                    <button
                      className="btn"
                      onClick={() => {
                        this.handleEditClick();
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      // onClick={this.constructEditedEvent}
                      onClick={() => {
                        this.constructEditedEvent();
                        this.handleEditClick();
                      }}
                      className="btn"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ))}
        </section>
      </React.Fragment>
    );
  }
}
