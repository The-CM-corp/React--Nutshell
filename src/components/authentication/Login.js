import React, { Component } from "react"

export default class Login extends Component {

  render() {
    return (
      <React.Fragment>
        <div className={this.props.hideLoginForm ? "hide" : "bryans__class"}>
          <div className="login__form">
            <h2>Please sign in</h2>

            <label className="formLabel" htmlFor="inputEmail">
              Email address
            </label>
            <input className="formInput" onChange={this.props.handleFieldChange} type="email"
              id="loginEmail"
              placeholder="Email address"
              required="" autoFocus="" />

            <label className="formLabel" htmlFor="inputPassword">
              Password
            </label>
            <input className="formInput" onChange={this.props.handleFieldChange} type="password"
              id="loginPassword"
              placeholder="Password"
              required="" />
              <br/>

            <p className="formLabel">Remember me <input className="formInput" onChange={this.props.handleFieldChange} type="checkbox"
              id="remember" /></p>

            <button className="btn btn_mod" type="submit" onClick={() => {this.props.handleLogin()}}>
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
