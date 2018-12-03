import React, { Component } from "react"
import { Link } from "react-router-dom"
import APIManager from '../../modules/APIManager'
import "bootstrap/dist/css/bootstrap.min.css"
import "./Navbar.css"



class NavBar extends Component {
  isAuthenticated = () => (sessionStorage.getItem("userId") !== null || localStorage.getItem("userId") !== null)

  // getCurrentUser = () => {
  //   const currentUser = sessionStorage.getItem("userId") || localStorage.getItem("userId")
  //   return currentUser
  // }

  // state = {
  //   currentUserId: this.getCurrentUser()
  // }

  logoutUser = () => {
    localStorage.removeItem('userId')
    sessionStorage.removeItem('userId')
  }


  // componentDidMount() {
  //   APIManager.getEntry("users", this.state.currentUserId)
  //   .then((user) => {
  //     this.setState({user: user})
  //   })
  // }

  noNavonLogin = () => {
    if (this.isAuthenticated()) {
      return (
        <div>
          <h2>welcome: {this.props.userName}</h2>
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