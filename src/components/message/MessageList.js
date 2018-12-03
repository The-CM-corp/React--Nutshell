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
  }
  // load page  with messages from database
  componentDidMount() {
    const newState = {}
    this.props.getAllUsers()
      .then(users => newState.users = users)
      .then(() => APIManager.getAllEntries("messages", "?_sort=time","&_order=desc", "&_limit=10", "&_expand=user"))
      .then(messages => newState.messages = messages)
      .then(() => this.setState(newState))
  }

  deleteAndAddMessage = id => {
    return APIManager.deleteEntry("messages", id)
      .then(() => APIManager.getAllEntries("messages", "?_sort=time","&_order=desc", "&_limit=10", "&_expand=user"))
      .then(messages => this.setState({
        messages: messages
      })
      )

  }

  editMessages = (id, message) => {
    const newState = {}
    return APIManager.editEntry("messages", id, message)
      .then(() => APIManager.getAllEntries("messages", "?_sort=time","&_order=desc", "&_limit=10", "&_expand=user"))
      .then(messages => newState.messages = messages)
      .then(() => this.setState(newState))
  }

  addNewMessage = newMessage => {
    return APIManager.addEntry("messages", newMessage)
      .then(() => APIManager.getAllEntries("messages", "?_sort=time", "&_order=desc", "&_limit=10", "&_expand=user"))
      .then(messages => this.setState({
        messages: messages
      })
      )
  }
  handleNewClick = () => {
    const currentState = this.state.hideNewForm;
    this.setState({ hideNewForm: !currentState });
  };

  handleNewEdit = (editMessage, editId) => {
    this.setState({
      editMessage: editMessage,
      editId: editId,
    })
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
    console.log(stateToChange)
  }

  timestamp = () => {
    let currentDate = new Date()
    let date = currentDate.getDate()
    let month = currentDate.getMonth()
    let year = currentDate.getFullYear()
    let hour = currentDate.getHours()
    let min = ('0' + currentDate.getMinutes()).slice(-2)
    console.log(currentDate)
    return `${month + 1}-${date}-${year} ${hour}:${min}`
  }

  constructNewMessage = () => {
    const message = {
      userId: +sessionStorage.getItem("userId") || +localStorage.getItem("userId"),
      time: this.timestamp(),
      message: this.state.message,
    }
    this.addNewMessage(message)
    console.log(message)
  }

  constructEditMessage = () => {

    const editMessage = {
      userId: +sessionStorage.getItem("userId") || +localStorage.getItem("userId"),
      time: this.timestamp(),
      message: this.state.editMessage,
      id: this.state.editId,
    }
    console.log("my new message", editMessage.id)
    this.editMessages(editMessage.id, editMessage)
  }

  render() {
    return (
      <React.Fragment>
      <section className="message__list bryans__class">
      <h1 className="page__title">Messages</h1>
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