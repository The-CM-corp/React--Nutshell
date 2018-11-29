import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import Login from './authentication/Login'
import NewsList from './news/NewsList'
import './Nutshell.css'


export default class ApplicationViews extends Component {

  isAuthenticated = () => (sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null)

  getAllUsers = () => APIManager.getAllEntries("users")




render() {
  return (
    <React.Fragment>
      <Route exact path="/news" render={(props) => {
        if (this.isAuthenticated()) {
          return <NewsList getAllUsers={this.getAllUsers} />
        } else {
          return <Redirect to="/login" />
        }
      }} />
      <Route path="/login" component={Login} />

    </React.Fragment>
  )
}
  }
