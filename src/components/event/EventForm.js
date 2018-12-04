import React, { Component } from "react";
import "./Event.css";


export default class EventForm extends Component {

render() {
  return(
<React.Fragment> 
  
  <div className="new__event">
  <button
    className={this.props.hideNewForm ? "btn btn_mod new__button" : "hide"}
    id="new__button"
    onClick={() => {
      this.props.handleNewClick();
    }}>
    Add New Event
  </button>
  <div className={this.props.hideNewForm ? "hide" : null}
            id="new__event__form">
    <hr></hr>
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          Event Title
        </span>
      </div>
        <input
          value={this.props.title}
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
          value={this.props.date}
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
        value={this.props.synopsis}
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
          value={this.props.location}
          type="text"
          className="form-control"
          onChange={this.props.handleFieldChange}
          id="location"
          placeholder="Event Location"
        />
    </div>
    <div className="button__holder">
      <button className="btn btn_delete btn_small"
        onClick={() => {
        this.props.handleNewClick();
          }}>
          Cancel
      </button>
      <button
        type="submit"
        className="btn btn_mod btn_small"
        onClick={() => {
        this.props.constructNewEvent();
        this.props.handleNewClick();
          }}>
          Submit
      </button>
    </div>
  </div>
  </div>
  <hr></hr>
</React.Fragment>
    )
  }
}