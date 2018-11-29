import React, { Component } from "react";
import "./Event.css";

export default class EventEdit extends Component {
  componentDidMount() {
    const event = this.props.events.find(
      e => e.id === parseInt(this.props.match.params.eventId)
    );
    this.setState(event);
  }
  state = {
    title: "",
    date: "",
    synopsis: "",
    location: "",
    id: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewEvent = evt => {
    evt.preventDefault();
        const newEvent = {
        title: this.state.title,
        date: this.state.date,
        synopsis: this.state.synopsis,
        location: this.state.location,
        id: this.state.id
    };
    this.props
      .editEvent(this.state.id, newEvent)
      .then(() => this.props.history.push("/events"))
      console.log(newEvent)
      console.log(this.state.id)
  };

  render() {
    
    return (
      <React.Fragment>
        <form className="eventForm bryan">
          <div className="form-group">
            <label htmlFor="eventTitle">Event Title</label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleFieldChange}
              id="title"
              placeholder="Event Name"
              defaultValue={this.state.title}
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
              defaultValue={this.state.date}
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
              defaultValue={this.state.synopsis}
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
              defaultValue={this.state.location}
            />
          </div>
          
          <button
            type="submit"
            onClick={this.constructNewEvent}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
