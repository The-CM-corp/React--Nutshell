import React, { Component } from "react";
import "./Event.css";

export default class EventEdit extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          className={this.props.hideEditForm ? 'hide' : null}
          id="new__event__form"
        >
          <div className="form-group">
            <label htmlFor="eventTitle">Event Title</label>
            <input
              type="text"
              className="form-control"
              onChange={this.props.handleFieldChange}
              id="editTitle"
              placeholder="Event Name"
              defaultValue={this.props.event.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              onChange={this.props.handleFieldChange}
              id="editDate"
              placeholder="Date"
              defaultValue={this.props.event.date}
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventSynopsis">Event Synopsis</label>
            <input
              type="text"
              className="form-control"
              onChange={this.props.handleFieldChange}
              id="editSynopsis"
              placeholder="Event Synopsis"
              defaultValue={this.props.event.synopsis}
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventLocation">Event Location</label>
            <input
              type="text"
              className="form-control"
              onChange={this.props.handleFieldChange}
              id="editLocation"
              placeholder="Event Location"
              defaultValue={this.props.event.location}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control hide"
              onChange={this.props.handleFieldChange}
              id="editId"
              placeholder="event id"
              defaultValue={this.props.event.id}
            />
          </div>
          <div className="button__holder">
            <button
              className="btn"
              onClick={() => {
                this.props.handleEditClick();
              }}
            >
              Cancel
            </button>

            <button
              onClick={() => {
                this.props.constructEditedEvent();
                this.props.handleEditClick();
              }}
              className="btn"
            >
              Submit
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
