import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import EventForm from "./EventForm"
// import EventEdit from "./EventEdit"
import "./Event.css";

// this is the HTML representation of the event list

export default class EventList extends Component {
  
 
  state = {
    users: [],
    events: [],
    title: "",
    date: "",
    synopsis: "",
    location: "",
    shownForm: null,
    hideNewForm: true,
    hideEditForm: true,
    currentUserId: this.props.getCurrentUser(),
    editTitle: "",
    editDate: "",
    editSynopsis: "",
    editLocation: "",
    editId: ""
  }

  componentDidMount() {
    const newState = {}
    APIManager.getAllEntries("events", `?user_id=${this.state.currentUserId}&_sort=date&_order=asc`)
      .then((events) => {
        this.setState({events: events})
      })

      .then(() => this.setState(newState))
      
  }

  addEvent = event => {
    return APIManager.addEntry("events", event)
      .then(() => APIManager.getAllEntries("events", `?user_id=${this.state.currentUserId}&_sort=date&_order=asc`))
      .then(events =>
        this.setState({
          events: events
        })
      );
    } 

  deleteEvent = id =>
    APIManager.deleteEntry("events", id)
      .then(() => APIManager.getAllEntries("events", `?user_id=${this.state.currentUserId}&_sort=date&_order=asc`))
      .then(events =>
        this.setState({
          events: events
        })
      );

  editEvent = (editId, editEvent) =>
    APIManager.editEntry("events", editId, editEvent)
      .then(() => APIManager.getAllEntries("events", `?user_id=${this.state.currentUserId}&_sort=date&_order=asc`))
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
  } else {
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
          <h1 className="event__title bryan">Events</h1>
        <section className="events">
          {this.state.events.map(event => (
            <div key={event.id} className="event__card">
              <div 
              className={this.state.events[0].id === event.id ? 'coral' : 'other'}
              >
                <p className="card-title">{event.title}</p>
                <p className="card-date">{event.date}</p>
                <p className="card-location">
                  Location:
                  <br />
                  {event.location}
                </p>
                <p className="card-details">
                  Synopsis:
                  <br />
                  {event.synopsis}
                </p>
                <div className="card-button">
                  <button
                    type="button"
                    className="card-button btn"
                    onClick={() => {
                      this.handleEditClick(
                        event.title,
                        event.date,
                        event.synopsis,
                        event.location,
                        event.id
                      );
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => this.deleteEvent(event.id)}
                    className="card-button btn"
                  >
                    Delete
                  </button>
                </div>
                {/* <EventEdit/> */}
                <div
                  className={`${this.state.shownForm === event.id?null: 'hide'}`}
                  id="new__event__form"
                >
                  <div className="form-group">
                    <label htmlFor="eventTitle">Event Title</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleFieldChange}
                      id="editTitle"
                      placeholder="Event Name"
                      defaultValue={event.title}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={this.handleFieldChange}
                      id="editDate"
                      placeholder="Date"
                      defaultValue={event.date}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="eventSynopsis">Event Synopsis</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleFieldChange}
                      id="editSynopsis"
                      placeholder="Event Synopsis"
                      defaultValue={event.synopsis}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="eventLocation">Event Location</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleFieldChange}
                      id="editLocation"
                      placeholder="Event Location"
                      defaultValue={event.location}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control hide"
                      onChange={this.handleFieldChange}
                      id="editId"
                      placeholder="event id"
                      defaultValue={event.id}
                    />
                  </div>
                  <div className="button__holder">
                    <button
                      className="btn"
                      onClick={() => {
                        this.handleEditClick();
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => {
                        this.constructEditedEvent();
                        this.handleEditClick();
                      }}
                      className="btn"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </React.Fragment>
    );
  }
}
