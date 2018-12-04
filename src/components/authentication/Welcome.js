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
    hideLoginForm: false,
    currentUser: ""
  }


  // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  // Handle for Login (existing user)
  handleLogin = (e) => {
    if (this.state.loginEmail === "" || this.state.loginPassword === "") {
      alert("No fields should be left blank")
    }
    else {
      APIManager.getAllEntries("users", `/?email=${this.state.loginEmail}&password=${this.state.loginPassword
        }`)
        .then(returns => {

          if (returns.length < 1) {
            alert("That email doesn't exist or your password doesn't match. Please try again")
          } else if (this.state.remember === "") {
            sessionStorage.setItem(
              "userId", returns[0].id
            )
            this.setState({
              currentUser: sessionStorage.getItem("userId")
            }, console.log(this.state.currentUser))
            this.props.history.push("/")

          } else {
            localStorage.setItem(
              "userId", returns[0].id
            )
            this.setState({
              currentUser: localStorage.getItem("userId")
            }, console.log(this.state.currentUser))
            this.props.history.push("/")
          }
        })
    }
  }
  handleChangeForm = () => {
    const currentState = this.state.hideLoginForm;
    this.setState({ hideLoginForm: !currentState });
  };

  // Handle register for new user
  handleRegister = (e) => {

    if (this.state.registerEmail === "" || this.state.registerName === "" || this.state.registerPassword === "") {
      alert("No fields should be left blank")
    } else if (this.state.registerEmail.includes("@")) {
      APIManager.getAllEntries("users", `/?email=${this.state.registerEmail}`)
        .then((returns) => {
          if (returns.length > 0) {
            alert("Tht email is already. Please use another email")
          } else {
            this.constructNewUser()
            alert("You are now registered! Please log in")
            this.handleChangeForm()
          }
        })
    } else {
      alert("Please enter a valid email")
    }
  }

  //registion functions, cunstructing a new user and posting it to the database
  constructNewUser = () => {
    const user = {
      name: this.state.registerName,
      password: this.state.registerPassword,
      email: this.state.registerEmail,
    }
    this.registerNewUser(user)
      .then(() => console.log(user))

  }

  registerNewUser = user => {
    return APIManager.addEntry("users", user)
  }
  render() {
    return (
      <React.Fragment>
        <Login handleLogin={this.handleLogin} handleFieldChange={this.handleFieldChange} handleChangeForm={this.handleChangeForm} hideLoginForm={this.state.hideLoginForm} />
        <Register constructNewUser={this.constructNewUser} handleFieldChange={this.handleFieldChange} handleChangeForm={this.handleChangeForm} hideLoginForm={this.state.hideLoginForm} handleRegister={this.handleRegister} />
      </React.Fragment>
    )
  }
}

