import React, { Component } from "react"
import { Link } from "react-router-dom"
import APIManager from '../../modules/APIManager'
import "bootstrap/dist/css/bootstrap.min.css"
import "./Navbar.css"



class NavBar extends Component {

  logoutUser = () => {
    localStorage.removeItem('userId')
    sessionStorage.removeItem('userId')
  }

  state = {
    user: []
  }

  getCurrentUser = () => {
    const currentUser = sessionStorage.getItem("userId") || localStorage.getItem("userId")
    return currentUser
  }


  componentDidMount() {
    const userId = this.getCurrentUser()
    APIManager.getEntry("users", userId)
      .then(user => {
        this.setState({ user: user })
        console.log(this.state.user.name)
      })
  }


  render() {
    return (
      <div>
        <h2>welcome: {this.state.user.name}</h2>
        <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className="nav-link" to="/messages">Messages</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/events">Events</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/news">News</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/todos">Todo</Link>
            </li>
            <li>
              <Link className="nav-link" to="/welcome" onClick={() => this.logoutUser()}>Logout</Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default NavBar