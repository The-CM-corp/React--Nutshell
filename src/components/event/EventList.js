import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Event.css";
// import EventCard from "./EventCard";

// this is the HTML representation of the event list

export default class EventList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="eventButton">
          <button
            type="button"
            onClick={() => this.props.history.push("/events/new")}
            className="btn"
          >
            Add Event
          </button>
        </div>
        <br />
        <section className="events">
          {this.props.events.map(
            event => (
              <div key={event.id} className="card">
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <h6 className="card-details">{event.date}</h6>
                  <p className="card-details">
                    Synopsis: <br />
                    {event.synopsis}
                  </p>
                  <p className="card-details">
                    Location: <br />
                    {event.location}
                  </p>
                  <div className="card-button">
                    <button type="button" className="btn">
                      <Link to={`/events/${event.id}`}>Details</Link>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        this.props.deleteEvent(event.id)
                      }
                      className="btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
                
            )
            // <EventCard key={event.id} event={event}
            //  {...this.props}

            // />
          )}
        </section>
        <br></br>
      </React.Fragment>
    );
  }
}
