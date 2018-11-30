import React, { Component } from "react"
import MessageEditForm from "./MessageEditForm";

export default class MessageButtons extends Component {

  buttonsForUser = () => {
    if (this.props.message.userId === +sessionStorage.getItem("userId") || this.props.message.userId === +localStorage.getItem("userId")) {
      return (
        <div className="button__holder">
          <button className={this.props.hideEditForm ? "edit__button btn" : "hide"}
            onClick={() => {
              // this.props.editMessages(`${this.props.message.id}, ${this.props.message}`)
              this.props.handleEditClick()
              this.props.handleNewEdit(this.props.message.message, this.props.message.id)
            }}
          >Edit</button>
          <MessageEditForm message={this.props.message} hideEditForm={this.props.hideEditForm} handleFieldChange={this.props.handleFieldChange} constructNewMessage={this.props.constructNewMessage} constructEditMessage={this.props.constructEditMessage} handleEditClick={this.props.handleEditClick} />
          <button className={this.props.hideEditForm ? "delete__button btn" : "hide"}
            onClick={() => {
              this.props.deleteAndAddMessage(`${this.props.message.id}`)
              this.props.handleEditClick()
            }}
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