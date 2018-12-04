import React, { Component } from "react";
import "./Event.css";

export default class EventEdit extends Component {
  render() {
    return (
      <React.Fragment>
        
        <div
          className={`${this.props.shownForm === this.props.event.id?null: 'hide'}`}
          id="new__event__form"
        >
        <hr></hr>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
            Event Title
            </span>
              <input
                type="text"
                className="form-control"
                onChange={this.props.handleFieldChange}
                id="editTitle"
                placeholder="Event Name"
                defaultValue={this.props.event.title}
              />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
            Date
            </span>
            <input
              type="date"
              className="form-control"
              onChange={this.props.handleFieldChange}
              id="editDate"
              placeholder="Date"
              defaultValue={this.props.event.date}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
            Event Synopsis
            </span>
            <input
              type="text"
              className="form-control"
              onChange={this.props.handleFieldChange}
              id="editSynopsis"
              placeholder="Event Synopsis"
              defaultValue={this.props.event.synopsis}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
            Event Location
            </span>
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
              className="btn btn_delete btn_small"
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
              className="btn btn_mod btn_small"
            >
              Submit
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
