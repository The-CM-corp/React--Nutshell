import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Event.css";

export default class EventCard extends Component {
  render() {
    return (
      <React.Fragment>
      <div key={this.props.event.id} className="card">
        <div className="card-body">
          <h5 className="card-title">
          {this.props.event.title}
          </h5>
          <h6 className="card-details">
          {this.props.event.date}
          </h6>
          <p className="card-details">
          Synopsis: <br></br>
          {this.props.event.synopsis}
          </p>
          <p className="card-details">
          Location: <br></br>
          {this.props.event.location}
          </p>
          <div className="card-button">
          <button type="button" className="btn">
          <Link
          to={`/events/${this.props.event.id}`}>
            Details
          </Link>
          </button>
          
          <button type="button"
            onClick={() => this.props.deleteEvent(this.props.event.id)}
            className="btn">
            Delete
          </button>
          </div>
        </div>
      </div>
      <br></br>
      </React.Fragment>
    );
  }
}
