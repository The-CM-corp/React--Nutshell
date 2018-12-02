import React, { Component } from "react";
import "./Event.css";


export default class EventForm extends Component {

render() {
  return(
<React.Fragment> 
  <div className="new__event bryan">
  <button
    className={this.props.hideNewForm ? "btn new__button" : "hide"}
    id="new__button"
    onClick={() => {
      this.props.handleNewClick();
    }}>
    Add Event
  </button>
  <div className={this.props.hideNewForm ? "hide" : null}
            id="new__event__form">
    <div className="input-group mb-3 bryan">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          Event Title
        </span>
      </div>
        <input
          defaultValue={this.props.title || ""}
          type="text"
          className="form-control"
          onChange={this.props.handleFieldChange}
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
          defaultValue={this.props.date || ""}
          type="date"
          className="form-control"
          onChange={this.props.handleFieldChange}
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
        defaultValue={this.props.synopsis || ""}
        type="text"
        className="form-control"
        onChange={this.props.handleFieldChange}
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
          defaultValue={this.props.location || ""}
          type="text"
          className="form-control"
          onChange={this.props.handleFieldChange}
          id="location"
          placeholder="Event Location"
        />
    </div>
    <div className="button__holder">
      <button className="btn"
        onClick={() => {
        this.props.handleNewClick();
          }}>
          Cancel
      </button>
      <button
        type="submit"
        className="btn"
        onClick={() => {
        this.props.constructNewEvent();
        this.props.handleNewClick();
          }}>
          Submit
      </button>
    </div>
  </div>
  </div>
</React.Fragment>
    )
  }
}