import React, { Component } from "react";
import "./Event.css";

 export default class EventForm extends Component {
  // Set initial state
  state = {
    title: "",
    date: "",
    synopsis: "",
    location: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /*
        Local method for validation, creating event object, and
        invoking the function reference passed from parent component
     */
  constructNewEvent = evt => {
      const event = {
        title: this.state.title,
        date: this.state.date,
        synopsis: this.state.synopsis,
        location: this.state.location
      };

      // Create the event and redirect user to event list
      this.props
        .addevent(event)
        .then(() => this.props.history.push("/events"));
    }
  

  render() {
    return (
      <React.Fragment>
        
          <form className="eventForm newForm">
          <div className="form-group">
            <label htmlFor="eventTitle">Event Title</label>
            <input
              type="text"
              required="true"
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
              required="true"
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
              required="true"
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
              required="true"
              className="form-control"
              onChange={this.handleFieldChange}
              id="location"
              placeholder="Event Location"
             
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






 
