// import React, { Component } from "react";
// import "./Event.css";

//  export default class EventForm extends Component {
//   // Set initial state
//   state = {
//     title: "",
//     date: "",
//     synopsis: "",
//     location: ""
//   };

//   // Update state whenever an input field is edited
//   handleFieldChange = evt => {
//     const stateToChange = {};
//     stateToChange[evt.target.id] = evt.target.value;
//     this.setState(stateToChange);
//   };

//   constructNewEvent = evt => {
//     evt.preventDefault();
//       const event = {
//         title: this.state.title,
//         date: this.state.date,
//         synopsis: this.state.synopsis,
//         location: this.state.location
//       };

//       // Create the event and redirect user to event list
//       this.props
//         .addEvent(event)
//       }
  

//   render() {
//     return (
//       <React.Fragment>
        
//           <form className="eventForm bryan">
//           <div className="form-group">
//             <label htmlFor="eventTitle">Event Title</label>
//             <input
//               type="text"
//               className="form-control"
//               onChange={this.handleFieldChange}
//               id="title"
//               placeholder="Event Name"
             
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="date">Date</label>
//             <input
//               type="date"
//               className="form-control"
//               onChange={this.handleFieldChange}
//               id="date"
//               placeholder="Date"
             
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="eventSynopsis">Event Synopsis</label>
//             <input
//               type="text"
//               className="form-control"
//               onChange={this.handleFieldChange}
//               id="synopsis"
//               placeholder="Event Synopsis"
              
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="eventLocation">Event Location</label>
//             <input
//               type="text"
//               className="form-control"
//               onChange={this.handleFieldChange}
//               id="location"
//               placeholder="Event Location"
             
//             />
//           </div>
//           <button
//             type="submit"
//             onClick={this.constructNewEvent}
//             className="btn"
//           >
//             Add Event
//           </button>
//         </form>
//       </React.Fragment>
//     );
//   }
//  }






 
