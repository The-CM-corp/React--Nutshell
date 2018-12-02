import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import Register from "./Register"
import Login from "./Login"

export default class Welcome extends Component {
  // Set initial state
  state = {
    loginEmail: "",
    loginPassword: "",
    remember: "",
    registerEmail: "",
    registerPassword: "",
    registerName: "",
    users: []
  }

  componentDidMount() {
    const newState = {}

    this.props.getAllUsers()
      .then((users) => newState.users = users)
      .then(() => this.setState(newState))
  }

  // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  // Handle for Login (existing user)
  handleLogin = (e) => {
    e.preventDefault()
    this.state.users.forEach(user => {
      if (user.email === this.state.loginEmail) {
        if (this.state.remember === "") {
          sessionStorage.setItem(
            "userId", user.id
          )
        } else {
          localStorage.setItem(
            "userId", user.id
          )
        }
      }
    })
  }

  // Handle register for new user
  handleRegister = (e) => {
    e.preventDefault()
    this.state.users.forEach(user => {
      if (user.email === this.state.registerEmail) {
        alert("This email is already taken")
      }
    })
  }

  //registion functions, cunstructing a new user and posting it to the database
  constructNewUser = () => {
    const user = {
      name: this.state.registerName,
      password: this.state.registerPassword,
      email: this.state.registerEmail,
    }
    this.registerNewUser(user)
    console.log(user)
  }

  registerNewUser = user => {
    return APIManager.addEntry("users", user)
  }
  render() {
    return (
      <React.Fragment>
        <Login handleLogin={this.handleLogin} handleFieldChange={this.handleFieldChange} />
        <Register constructNewUser={this.constructNewUser} handleFieldChange={this.handleFieldChange} />
      </React.Fragment>
    )
  }
}