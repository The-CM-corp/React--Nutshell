import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import Login from './authentication/Login'
import NewsList from './news/NewsList'
import TodoList from './todo/TodoList'
import './Nutshell.css'
import MessageList from './message/MessageList';


export default class ApplicationViews extends Component {

  isAuthenticated = () => (sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null)

  getAllUsers = () => APIManager.getAllEntries("users")

  render() {
    return (
      <React.Fragment>
        <Route exact path="/news" render={(props) => {
          if (this.isAuthenticated()) {
            return <NewsList news={this.state.news} deleteEntry={this.deleteEntry} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route exact path="/messages" render={(props) => {
          if (this.isAuthenticated()) {
            return <MessageList {...props}
              getAllUsers={this.getAllUsers}
          />} else {
            return <Redirect to="/login" />
          }
        }} />
        <Route exact path="/todos" render={(props) => {
          if (this.isAuthenticated()) {
            return <TodoList getAllUsers={this.getAllUsers} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/login" component={Login} />

      </React.Fragment>
    )
  }
}
