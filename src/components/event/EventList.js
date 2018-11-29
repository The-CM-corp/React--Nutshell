import React, { Component } from "react";
import { Link } from "react-router-dom";
import APIManager from '../../modules/APIManager'
import "./Event.css";
// import EventCard from "./EventCard";

// this is the HTML representation of the event list


export default class EventList extends Component {

  state = {
    users: [],
    events: []
  }

  componentDidMount() {
  const newState = {};

  APIManager.getAllEntries("users")
  .then(allUsers => {
    this.setState({
      users: allUsers
    })
  })

  APIManager.getAllEntries("events")
  .then(allEvents => {
    this.setState({
      events: allEvents
    })
  })

  .then(() => this.setState(newState));
  }



  addEvent = event =>
      APIManager.addEntry("events", event)
        .then(() => APIManager.getAllEntries("events"))
        .then(events =>
          this.setState({
            events: events
          })
        );

    deleteEvent = id =>
      APIManager.deleteEntry("events", id)
      .then(() => APIManager.getAllEntries("events"))
      .then(events =>
        this.setState({
          events: events
        })
      );


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
          {this.state.events.map(event => (
            <div key={event.id} className="card">
              <div className="card-body details">
                <h4 className="card-title">{event.title}</h4>
                <h6 className="card-title">{event.date}</h6>
                <h6 className="card-title">
                  Location:<br />
                  {event.location}
                </h6>
                <p className="card-details">
                  Synopsis:<br />
                  {event.synopsis}
                </p>
                <div className="card-button">
                  <button type="button" className="btn">
                    <Link className="nav-link" to={`/events/edit/${event.id}`}>
                      Edit
                    </Link>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      this.deleteEvent(event.id)
                        .then(() => this.props.history.push("/events"))
                    }
                    className="card-button btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </React.Fragment>
    );
  }
}
