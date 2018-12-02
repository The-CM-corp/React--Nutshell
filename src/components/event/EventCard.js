import React, { Component } from "react";
import EventEdit from "./EventEdit";
import "./Event.css";

export default class EventCard extends Component {
  state = {
    hideEditForm: true
  };

  handleEditClick = () => {
    const currentState = this.state.hideEditForm;
    this.setState({ hideEditForm: !currentState });
  };

  render() {
    return (
      <div key={this.props.event.id} className="event__card">
        <div
          className={this.props.events[0].id === this.props.event.id ? "coral" : "other"}
        >
          <p className="card-title">{this.props.event.title}</p>
          <p className="card-date">{this.props.event.date}</p>
          <p className="card-location">
            Location:
            <br />
            {this.props.event.location}
          </p>
          <p className="card-details">
            Synopsis:
            <br />
            {this.props.event.synopsis}
          </p>
          <div className="card-button">
            <button
              type="button"
              className="card-button btn"
              onClick={() => {
                this.handleEditClick(
                  this.props.event.title,
                  this.props.event.date,
                  this.props.event.synopsis,
                  this.props.event.location,
                  this.props.event.id
                );
              }}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => this.deleteEvent(this.props.event.id)}
              className="card-button btn"
            >
              Delete
            </button>
          </div>
          <EventEdit
            event={this.props.event}
            hideEditForm={this.state.hideEditForm}
            handleEditClick={this.handleEditClick}
            constructEditedEvent={this.props.constructEditedEvent}
            handleFieldChange={this.handleFieldChange}
          />
        </div>
      </div>
    );
  }
}
