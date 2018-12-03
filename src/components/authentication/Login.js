import React, { Component } from "react"
import { Link, Route, Redirect } from "react-router-dom"
import Register from "./Register"

export default class Login extends Component {

  render() {
    return (
      <React.Fragment>
        <div className={this.props.hideLoginForm ? "hide" : "bryans__class"}>
          <div className="login__form">
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label htmlFor="inputEmail">
              Email address
                </label>
            <br />
            <input onChange={this.props.handleFieldChange} type="email"
              id="loginEmail"
              placeholder="Email address"
              required="" autoFocus="" />
            <br />
            <label htmlFor="inputPassword">
              Password
                </label>
            <br />
            <input onChange={this.props.handleFieldChange} type="password"
              id="loginPassword"
              placeholder="Password"
              required="" />
            <br />
            Remember me <input onChange={this.props.handleFieldChange} type="checkbox"
              id="remember" />
            <br />
            <button type="submit" onClick={() => {this.props.handleLogin()}}>
              Sign in
                </button>
          </div>
          <div className="text__center">
          <button  className="register__link" onClick={() => this.props.handleChangeForm()}>New here? Create an account</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
