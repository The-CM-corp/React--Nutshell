import React, { Component } from "react";
import EventEdit from "./EventEdit";
import Moment from 'react-moment';
import "./Event.css";

export default class EventCard extends Component {

  render() {
    return (
      <div key={this.props.event.id} className="event__card">
        <div
          className={this.props.events[0].id === this.props.event.id ? "coral" : "other"}
        >
          <p className="card-title">{this.props.event.title}</p>
          <p className="card-date">
          <Moment format="MMMM Do YYYY">
          {this.props.event.date}
          </Moment>
          </p>
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
              className="btn btn_mod btn_small"
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
              className="btn btn_delete btn_small"
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
            shownForm={this.props.shownForm}
          />
        </div>
      </div>
    );
  }
}
