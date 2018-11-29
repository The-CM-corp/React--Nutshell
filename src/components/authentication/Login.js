import React, { Component } from "react"


export default class Login extends Component {

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
      if(user.email === this.state.registerEmail) {
        alert("This email is already taken")
      }
    })
  }


  render() {
    return (
      <React.Fragment>
        <form className="bryans__class" onSubmit={this.handleLogin}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail">
            Email address
                </label>
          <br />
          <input onChange={this.handleFieldChange} type="email"
            id="loginEmail"
            placeholder="Email address"
            required="" autoFocus="" />
          <br />
          <label htmlFor="inputPassword">
            Password
                </label>
          <br />
          <input onChange={this.handleFieldChange} type="password"
            id="loginPassword"
            placeholder="Password"
            required="" />
          <br />
          Remember me <input onChange={this.handleFieldChange} type="checkbox"
            id="remember" />
          <br />
          <button type="submit">
            Sign in
                </button>
        </form>


        <form className="bryans__class" onSubmit={this.handleRegister}>
          <h1 className="h3 mb-3 font-weight-normal">New here? Create an account</h1>

          <label htmlFor="inputName">
            Name
                </label>
          <br />
          <input onChange={this.handleFieldChange} type="text"
            id="registerName"
            placeholder="Display Name"
            required="" autoFocus="" />
          <br />

          <label htmlFor="inputEmail">
            Email address
                </label>
          <br />
          <input onChange={this.handleFieldChange} type="email"
            id="registerEmail"
            placeholder="Email address"
            required="" autoFocus="" />
          <br />

          <label htmlFor="inputPassword">
            Password
                </label>
          <br />
          <input onChange={this.handleFieldChange} type="password"
            id="registerPassword"
            placeholder="Password"
            required="" />
          <br />
          <button type="submit">
            Register
                </button>
        </form>
      </React.Fragment>
    )
  }
}