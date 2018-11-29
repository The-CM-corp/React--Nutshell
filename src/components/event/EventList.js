import React, { Component } from "react";
// import { Link } from "react-router-dom";
import "./Event.css";
import EventCard from "./EventCard";

// this is the HTML representation of the event list

export default class EventList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="eventButton" >
          <button
            type="button" 
            onClick={() => this.props.history.push("/events/new")}
            className="btn"
          >
            Add Event
          </button>
        </div>
        <br />
        <section className="events" >
          {this.props.events.map(
            event => (
              <EventCard key={event.id} event={event}
             {...this.props}

            />  
            )
            
          )}
        </section>
        <br></br>
      </React.Fragment>
    );
  }
}
