import React, { Component } from "react"

export default class Register extends Component {

  render() {
    return (
      <div className={this.props.hideLoginForm ? "bryans__class" : "hide"}>
        <h2>Register Here</h2>
        <div className="register__form">
          <label htmlFor="inputName">
            Name
                </label>
          <br />
          <input onChange={this.props.handleFieldChange} type="text"
            id="registerName"
            placeholder="Display Name"
            required="" autoFocus="" />
          <br />

          <label htmlFor="inputEmail">
            Email address
                </label>
          <br />
          <input onChange={this.props.handleFieldChange} type="email"
            id="registerEmail"
            placeholder="Email address"
            required="" autoFocus="" />
          <br />

          <label htmlFor="inputPassword">
            Password
                </label>
          <br />
          <input onChange={this.props.handleFieldChange} type="password"
            id="registerPassword"
            placeholder="Password"
            required="" />
          <br />
          <button type="button" onClick={() => this.props.handleRegister()}>
            Register
                </button>
        </div >
      </div>
    )
  }
}