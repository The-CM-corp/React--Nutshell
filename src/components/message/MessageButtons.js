import React, { Component } from "react"
import MessageEditForm from "./MessageEditForm";

export default class MessageButtons extends Component {
  state = {
    hideEditForm: true
  }
  handleEditClick = () => {
    const currentState = this.state.hideEditForm;
    this.setState({ hideEditForm: !currentState });
  };

  buttonsForUser = () => {
    if (this.props.message.userId === +sessionStorage.getItem("userId") || this.props.message.userId === +localStorage.getItem("userId")) {
      return (
        <div className="button__holder">
          <button className="edit__button btn"
            onClick={() => {
              // this.props.editMessages(`${this.props.message.id}, ${this.props.message}`)
              this.handleEditClick()
      }}
          >Edit</button>
          <MessageEditForm message ={this.props.message} hideEditForm={this.state.hideEditForm} />
          <button className="delete__button btn"
            onClick={() => this.props.deleteAndAddMessage(`${this.props.message.id}`)}
          >
            Delete
                </button>
        </div>
      )
    } else {
      return (
        <div className="button__holder"></div>
      )
    }
  } 
  
  render() {
    return (
      this.buttonsForUser()
    )

  }
}