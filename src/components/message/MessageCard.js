import React, { Component } from "react"
import MessageButtons from "./MessageButtons"
import Moment from 'react-moment';
import 'moment-timezone';

export default class MessageCard extends Component {
  state = {
    hideEditForm: true
  }
  handleEditClick = () => {
    const currentState = this.state.hideEditForm;
    this.setState({ hideEditForm: !currentState });
  };

  render() {
    return (
      <div key={this.props.message.id} className={this.props.message.userId === +sessionStorage.getItem("userId") || this.props.message.userId === +localStorage.getItem("userId") ? "userMessage message__card" : "otherscard message__card"}>
        <h4 className={this.state.hideEditForm ? "username" : "hide"}>{this.props.message.user.name}</h4>
        <p className={this.state.hideEditForm ? "message__text" : "hide"}>{this.props.message.message}</p>
        <p className={this.state.hideEditForm ? "message__time" : "hide"}><Moment format="MM/DD/YYYY hh:mm a">{this.props.message.time}</Moment></p>
        <MessageButtons message={this.props.message} editMessages={this.props.editMessages} deleteAndAddMessage={this.props.deleteAndAddMessage} handleFieldChange={this.props.handleFieldChange} constructNewMessage={this.props.constructNewMessage} constructEditMessage={this.props.constructEditMessage} handleNewEdit={this.props.handleNewEdit} hideEditForm={this.state.hideEditForm} handleEditClick={this.handleEditClick} />
      </div>

    )
  }

}