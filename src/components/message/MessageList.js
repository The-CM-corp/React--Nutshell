import React, { Component } from "react"
import "./Message.css"
import { Link } from "react-router-dom";

class MessageList extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="new__message bryans__class">
          <button type="button"
          className="btn new__button"
          onClick = { () => {
            console.log("new message")
          }}
          >
          New Message
          </button>
        </div>
        <section className="message__list bryans__class">
          <h2 className="page__title">Messages</h2>
          <div className="card__holder">
            {
              this.props.messages.map(message => 
                <div key={message.id} className="card message__card">
                <h4 className="username">{message.user.name}</h4>
                <p className="message__text">{message.message}</p>
                <p className="message__time">{message.time}</p>
                <div className="button__holder">
                <button className="edit__button btn"
                      // onClick={() => this.props.editMessages(`${message.id}, ${}`)}
                >Edit</button> 
                <button className="delete__button btn"
                      onClick={() => this.props.deleteAndAddMessage(`${message.id}`)}
                >
                Delete
                </button>
                </div>
                 </div> )
            }
          </div>
        
        </section>

      </React.Fragment>
      
//       <React.Fragment>

//         <div className="ownersButton">
//           <button type="button"
//             className="btn btn-success"
//             onClick={() => {
//               this.props.history.push("/owners/new")
//             }
//             }>
//             Add Owner
//                     </button>
//         </div>
//         <section className="owners list">
//           <h2 className="card-title">Owners</h2>
//           <div className="card_holder">
//             {
//               this.props.owners.map(owner =>
//                 <div key={owner.id} className="card">
//                   <section className="ownerName">
//                     {owner.name}
//                   </section>
//                   <section className="ownerNumber">

//                     <Link className="nav-link" to={`/owners/${owner.id}`}>Details</Link>
//                     <a
//                       href="#" onClick={() => this.props.deleteOwner(owner.id)}
//                       className="card-link">Delete</a>
//                   </section>
//                 </div>
//               )
//             }
//           </div>
//         </section>
//       </React.Fragment>
    )
  }
}

export default MessageList