import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Navbar.css"



class NavBar extends Component {
  isAuthenticated = () => (sessionStorage.getItem("userId") !== null || localStorage.getItem("userId") !== null)

  logoutUser = () => {
    localStorage.removeItem('userId')
    sessionStorage.removeItem('userId')
  }

  noNavonLogin = () => {
    if (this.isAuthenticated()) {
      return (
        <div>
          <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <Link className="nav-link" to="/">Messages</Link>
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
    } else {
      return (
        <div>
          <h1 className="welcome__title">Welcome To Nutshell</h1>
        </div>
      )
    }
  }

  render() {
    return (
      this.noNavonLogin()
    )
  }
}

export default NavBar