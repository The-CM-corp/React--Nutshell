import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import Register from "./Register"
import Login from "./Login"
import { Route } from "react-router-dom"

export default class Welcome extends Component {
  // Set initial state
  state = {
    loginEmail: "",
    loginPassword: "",
    remember: "",
    registerEmail: "",
    registerPassword: "",
    registerName: "",
    users: [],
    hideLoginForm: false,
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
handleChangeForm = () => {
    const currentState = this.state.hideLoginForm;
    this.setState({ hideLoginForm: !currentState });
  };
  // Handle register for new user
  handleRegister = (e) => {
    e.preventDefault()
    this.state.users.forEach(user => {
      if (user.email === this.state.registerEmail) {
        alert("This email is already taken")
      } else if (user.email === "") {
        alert("Please fill out all required forms")
      } else if (user.name === "") {
        alert("Please fill out all required forms")
      } else if (user.password === "") {
        alert("Please fill out all required forms")
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
        <Login handleLogin={this.handleLogin} handleFieldChange={this.handleFieldChange} handleChangeForm={this.handleChangeForm} hideLoginForm={this.state.hideLoginForm}/>
        <Register constructNewUser={this.constructNewUser} handleFieldChange={this.handleFieldChange} handleChangeForm={this.handleChangeForm} hideLoginForm={this.state.hideLoginForm} handleRegister={this.handleRegister}/>
      </React.Fragment>
    )
  }
}

