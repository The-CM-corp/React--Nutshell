import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import EventForm from "./EventForm";
import EventCard from "./EventCard";
import "./Event.css";

// this is the HTML representation of the event list

export default class EventList extends Component {
  state = {
    users: [],
    events: [],
    shownForm: null,
    hideNewForm: true,
    hideEditForm: true,
    currentUserId: this.props.getCurrentUser(),
    editTitle: "",
    editDate: "",
    editSynopsis: "",
    editLocation: "",
    editId: ""
  };

  componentDidMount() {
    const newState = {};
    APIManager.getAllEntries(
      "events",
      `?user_id=${this.state.currentUserId}&_sort=date&_order=asc`
    )
      .then(events => {
        this.setState({ events: events });
      })

      .then(() => this.setState(newState));
  }

  addEvent = event => {
    return APIManager.addEntry("events", event)
      .then(() =>
        APIManager.getAllEntries(
          "events",
          `?user_id=${this.state.currentUserId}&_sort=date&_order=asc`
        )
      )
      .then(events =>
        this.setState({
          events: events
        })
      );
  };

  deleteEvent = id =>
    APIManager.deleteEntry("events", id)
      .then(() =>
        APIManager.getAllEntries(
          "events",
          `?user_id=${this.state.currentUserId}&_sort=date&_order=asc`
        )
      )
      .then(events =>
        this.setState({
          events: events
        })
      );

  editEvent = (editId, editEvent) =>
    APIManager.editEntry("events", editId, editEvent)
      .then(() =>
        APIManager.getAllEntries(
          "events",
          `?user_id=${this.state.currentUserId}&_sort=date&_order=asc`
        )
      )
      .then(events =>
        this.setState({
          events: events
        })
      );

  handleNewClick = () => {
    const currentState = this.state.hideNewForm;
    this.setState({ hideNewForm: !currentState });
  };

  handleEditClick = (
    editTitle,
    editDate,
    editSynopsis,
    editLocation,
    editId
  ) => {
    if(this.state.shownForm ===null){
    this.setState({
      shownForm:editId,
      editTitle: editTitle,
      editDate: editDate,
      editSynopsis: editSynopsis,
      editLocation: editLocation,
      editId: editId
    });
  }else{
    this.setState({
      shownForm:null
    })
  }
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewEvent = () => {
    const event = {
      title: this.state.title,
      date: this.state.date,
      synopsis: this.state.synopsis,
      location: this.state.location,
      user_id: +this.state.currentUserId
    };

    // Create the event
    this.addEvent(event).then(() => {
      this.setState({
        title: "",
        date: "",
        synopsis: "",
        location: ""
      });
    });
  };

  constructEditedEvent = () => {
    // evt.preventDefault();
    const editEvent = {
      title: this.state.editTitle,
      date: this.state.editDate,
      synopsis: this.state.editSynopsis,
      location: this.state.editLocation,
      id: this.state.editId
    };
    this.editEvent(editEvent.id, editEvent);
  };

  render() {
    return (
      <React.Fragment>
        <EventForm
          handleNewClick={this.handleNewClick}
          constructNewEvent={this.constructNewEvent}
          hideNewForm={this.state.hideNewForm}
          handleFieldChange={this.handleFieldChange}
        />
        <section className="events">
          <h1 className="event__title bryan">Events</h1>
          <div className="card__holder">
            {this.state.events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                events={this.state.events}
                editEvent={this.editEvent}
                deleteEvent={this.deleteEvent}
                handleFieldChange={this.handleFieldChange}
                constructNewEvent={this.constructNewEvent}
                constructEditedEvent={this.constructEditedEvent}
                hideNewForm={this.state.hideNewForm}
                hideEditForm={this.state.hideEditForm}
                handleEditClick={this.handleEditClick}
                shownForm={this.state.shownForm}
              />
            ))}
          </div>
        </section>
      </React.Fragment>
    );
  }
}
