import React, { Component } from "react"
import Navbar from "./nav/Navbar"
import ApplicationViews from "./ApplicationViews"
import APIManager from "../modules/APIManager"
import "bootstrap/dist/css/bootstrap.min.css"


export default class Nutshell extends Component {

  isAuthenticated = () => (sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null)


  render() {
    return (
      <React.Fragment>
        <Navbar />
        <ApplicationViews />
      </React.Fragment>
    )
  }
}
