import React, { Component } from "react"
import MessageButtons from "./MessageButtons"

export default class MessageCard extends Component {

  render() {
    return (
      <div key={this.props.message.id} className="card message__card">
        <h4 className="username">{this.props.message.user.name}</h4>
        <p className="message__text">{this.props.message.message}</p>
        <p className="message__time">{this.props.message.time}</p>
        <MessageButtons message={this.props.message} editMessages={this.props.editMessages} deleteAndAddMessage={this.props.deleteAndAddMessage} />
      </div>

    )
  }

}