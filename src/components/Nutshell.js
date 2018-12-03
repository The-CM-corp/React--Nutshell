import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import Navbar from "./nav/Navbar"
import ApplicationViews from "./ApplicationViews"
import APIManager from "../modules/APIManager"
import Login from './authentication/Login'

// import "./Nutshell.css"
import "bootstrap/dist/css/bootstrap.min.css"


export default class Nutshell extends Component {

    isAuthenticated = () => (sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null)

    getCurrentUserId = () => {
      const currentUser = sessionStorage.getItem("userId") || localStorage.getItem("userId")
      return currentUser
    }

    state = {
      currentUserId: this.getCurrentUserId(),
      userName: ""
    }

    componentDidMount() {
      APIManager.getEntry("users", this.state.currentUserId)
      .then((user) => {
        this.setState({userName: user.name})
      })
    }

    render() {
        return (
                            <React.Fragment>
                                <Navbar userName={this.state.userName}/>
                                <ApplicationViews />
                            </React.Fragment>
        )
    }
}
