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
        <div className="nav_bkg">
          <h2 className="nav_title">welcome: {this.props.userName}</h2>
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
                <Link className="nav-link nav_link_colors" to="/todos">Todo</Link>
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
          <h1>nutshell v.2.0</h1>
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