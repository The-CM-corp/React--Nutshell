import React, { Component } from "react"

export default class Login extends Component {

  render() {
    return (
      <React.Fragment>
        <form className="bryans__class" onSubmit={this.props.handleLogin}>
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
          <button type="submit">
            Sign in
                </button>
        </form>

      </React.Fragment>
    )
  }
}