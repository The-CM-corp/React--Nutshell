import React, { Component } from "react";
import { Link } from 'react-router-dom'
import "./Event.css";

export default class EventDetail extends Component {
  render() {
    /*
            Using the route parameter, find the event that the
            user clicked on by looking at the `this.props.events`
            collection that was passed down from ApplicationViews
        */
    const event =
      this.props.events.find(
        a => a.id === parseInt(this.props.match.params.eventId)
      ) || {};

    return (
      <section className="event bryan">
        <div key={event.id} className="card">
          <div className="card-body details">
            <h4 className="card-title">
              {event.title}
            </h4>
            <h6 className="card-title">{event.date}</h6>
            <h6 className="card-title">{event.location}</h6>
            <p className="card-details">{event.synopsis}</p>
            <div className="card-button">
            <button type="button" className="btn">
            <Link className="nav-link" to={`/events/edit/${event.id}`}>edit</Link>
            </button>
            <button type="button"
              onClick={() =>
                this.props
                  .deleteEvent(event.id)
                  .then(() => this.props.history.push("/events"))
              }
              className="card-button btn"
            >
              Delete
            </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
