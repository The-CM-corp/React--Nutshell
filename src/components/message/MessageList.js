import React, { Component } from "react"
import "./Message.css"
import APIManager from "../../modules/APIManager"
import NewMessageForm from "./NewMessageForm";
import MessageCard from "./MessageCard";

class MessageList extends Component {

  //state will have all users, message, a form hidden statement, time and message
  state = {
    users: [],
    messages: [],
    hideNewForm: true,
    time: "",
    message: "",
    editMessage: "",
    editId: "",
    userName: "",
    currentUserId: this.props.getCurrentUser(),
  }
  // load page  with all messages from database
  componentDidMount() {
    const newState = {}
    this.props.getAllUsers()
      .then(users => newState.users = users)
      .then(() => APIManager.getAllEntries("messages", "?_sort=time", "&_order=desc", "&_limit=10", "&_expand=user"))
      .then(messages => newState.messages = messages)
      .then(() => this.setState(newState))
    //get the username to display on the page
    APIManager.getEntry("users", this.state.currentUserId)
      .then((user) => {
        this.setState({ userName: user.name })
      })
  }

  //delete a message from the DOM and Database
  deleteAndAddMessage = id => {
    return APIManager.deleteEntry("messages", id)
      .then(() => APIManager.getAllEntries("messages", "?_sort=time", "&_order=desc", "&_limit=10", "&_expand=user"))
      .then(messages => this.setState({
        messages: messages
      })
      )
  }

  // allows a patch of an entry
  editMessages = (id, message) => {
    const newState = {}
    return APIManager.editEntry("messages", id, message)
      .then(() => APIManager.getAllEntries("messages", "?_sort=time", "&_order=desc", "&_limit=10", "&_expand=user"))
      .then(messages => newState.messages = messages)
      .then(() => this.setState(newState))
  }
  //post of a new mesage
  addNewMessage = newMessage => {
    return APIManager.addEntry("messages", newMessage)
      .then(() => APIManager.getAllEntries("messages", "?_sort=time", "&_order=desc", "&_limit=10", "&_expand=user"))
      .then(messages => this.setState({
        messages: messages
      })
      )
  }
  //hide and show handle
  handleNewClick = () => {
    const currentState = this.state.hideNewForm;
    this.setState({ hideNewForm: !currentState });
  };

  //setting the state for the message as it is edited
  handleNewEdit = (editMessage, editId) => {
    this.setState({
      editMessage: editMessage,
      editId: editId,
    })
  }

  //targets the imput field value to be the setting the state
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  //constructor function for a a new mesage
  constructNewMessage = () => {
    const message = {
      userId: +sessionStorage.getItem("userId") || +localStorage.getItem("userId"),
      time: new Date(),
      message: this.state.message,
    }
    //basic form validation, will not let an new message be blank or one space
    if (this.state.message === "" || this.state.message === " ") {
      alert("Please enter a message")
    } else {
      this.addNewMessage(message)
    }
  }

  //constructor function for the edited message
  constructEditMessage = () => {
    const editMessage = {
      userId: +sessionStorage.getItem("userId") || +localStorage.getItem("userId"),
      time: new Date(),
      message: this.state.editMessage,
      id: this.state.editId,
    }
    //basic form validation, will not let an edited message be blank or one space
    if (this.state.editMessage === "" || this.state.editMessage === " ") {
      alert("Please enter a message")
    } else {
      this.editMessages(editMessage.id, editMessage)
    }
  }

  render() {
    return (
      <React.Fragment>
        <section className="message__list bryans__class">
          <h1 className="page__title">{this.state.userName}&#39;s Messages</h1>
          <NewMessageForm handleNewClick={this.handleNewClick} constructNewMessage={this.constructNewMessage} hideNewForm={this.state.hideNewForm}
            handleFieldChange={this.handleFieldChange} />
          <hr></hr>
          <div className="card__holder">
            {
              this.state.messages.map(message =>
                <MessageCard key={message.id} message={message} editMessages={this.editMessages} deleteAndAddMessage={this.deleteAndAddMessage} handleFieldChange={this.handleFieldChange} constructNewMessage={this.constructNewMessage}
                  constructEditMessage={this.constructEditMessage} handleNewEdit={this.handleNewEdit} />
              ).reverse()
            }
          </div>

        </section>

      </React.Fragment>
    )
  }
}


export default MessageList