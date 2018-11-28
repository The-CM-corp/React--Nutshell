import React, { Component } from "react"


export default class Login extends Component {

    // Set initial state
    state = {
        email: "",
        password: "",
        remember: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Simplistic handler for login submit
    handleLogin = (e) => {
        e.preventDefault()

        if (this.state.remember==="") {
            sessionStorage.setItem(
                "credentials",
                JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            )
        } else {
            localStorage.setItem(
                "credentials",
                JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            )
        }
    }

    render() {
        return (
            <form className="animalForm" onSubmit={this.handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail">
                    Email address
                </label>
                <br/>
                <input onChange={this.handleFieldChange} type="email"
                       id="email"
                       placeholder="Email address"
                       required="" autoFocus="" />
                <br/>
                <label htmlFor="inputPassword">
                    Password
                </label>
                <br/>
                <input onChange={this.handleFieldChange} type="password"
                       id="password"
                       placeholder="Password"
                       required="" />
                <br/>
                Remember me <input onChange={this.handleFieldChange} type="checkbox"
                       id="remember" />
                <br/>
                <button type="submit">
                    Sign in
                </button>
            </form>
        )
    }
}