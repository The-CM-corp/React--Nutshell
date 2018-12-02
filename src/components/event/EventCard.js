import React, { Component } from "react";
import EventEdit from "./EventEdit";
import "./Event.css";

export default class EventCard extends Component {

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
                this.props.handleEditClick(
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
              onClick={() => this.props.deleteEvent(this.props.event.id)}
              className="card-button btn"
            >
              Delete
            </button>
          </div>
          <EventEdit
            event={this.props.event}
            hideEditForm={this.props.hideEditForm}
            handleEditClick={this.props.handleEditClick}
            constructEditedEvent={this.props.constructEditedEvent}
            handleFieldChange={this.props.handleFieldChange}
          />
        </div>
      </div>
    );
  }
}
