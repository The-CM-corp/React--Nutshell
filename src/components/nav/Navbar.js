import React, { Component } from "react"
import { Link } from "react-router-dom"
import APIManager from "../../modules/APIManager"
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
        <div className="nav_bkg">
          <h2 className="nav_title">Welcome to Nutshell v.2.0 <img src="nutshell.png" width="40px"></img></h2>
          <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
            <ul className="nav">
              <li className="nav-item">
                <Link className="nav-link nav_link_colors" to="/">Messages</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav_link_colors" to="/events">Events</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav_link_colors" to="/news">News</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav_link_colors" to="/todos">To Do</Link>
              </li>
              <li>
                <Link className="nav-link nav_link_colors" to="/welcome" onClick={() => this.logoutUser()}>Logout</Link>
              </li>
            </ul>
          </nav>
        </div>
      )
    } else {
      return(
        <div className="welcome__div">
          <h1>Nutshell v.2.0</h1>
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