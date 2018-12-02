import React, { Component } from "react"

export default class Register extends Component {
  
  render() {
    return (
      <form className="bryans__class" onSubmit={this.props.handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">New here? Create an account</h1>

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
        <button type="submit" onClick={() => this.props.constructNewUser()}>
          Register
                </button>
      </form >
    )
  }
}