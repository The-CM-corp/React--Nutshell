import React, { Component } from "react"

export default class Register extends Component {

  render() {
    return (
      <div className={this.props.hideLoginForm ? "bryans__class" : "hide"}>
        <div className="login__form">
          <h2>Register Here</h2>
          <label className="formLabel" htmlFor="inputName">
            Name
          </label>
          <input className="formInput" onChange={this.props.handleFieldChange} type="text"
            id="registerName"
            placeholder="Display Name"
            required="" autoFocus="" />

          <label className="formLabel" htmlFor="inputEmail">
            Email address
          </label>
          <input className="formInput" onChange={this.props.handleFieldChange} type="email"
            id="registerEmail"
            placeholder="Email address"
            required="" autoFocus="" />

          <label className="formLabel" htmlFor="inputPassword">
            Password
          </label>
          <input className="formInput" onChange={this.props.handleFieldChange} type="password"
            id="registerPassword"
            placeholder="Password"
            required="" />

          <button type="button" className="btn btn_mod" onClick={() => {
            this.props.handleRegister()
          }}>
            Register
          </button>
        </div>

        <div className="text__center">
          <button className="register__link" onClick={() => this.props.handleChangeForm()}>Already have an account? Sign In</button>
        </div>
      </div>
    )
  }
}