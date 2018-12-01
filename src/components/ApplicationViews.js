import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import Login from './authentication/Login'
import NewsList from './news/NewsList'
import EventList from './event/EventList'
import TodoList from './todo/TodoList'
import './Nutshell.css'
import MessageList from './message/MessageList';


export default class ApplicationViews extends Component {

  isAuthenticated = () => (sessionStorage.getItem("userId") !== null || localStorage.getItem("userId") !== null)

  getAllUsers = () => APIManager.getAllEntries("users")

  getCurrentUser = () => {
    const currentUser = sessionStorage.getItem("userId") || localStorage.getItem("userId")
    return currentUser
}


  render() {
    return (
      <React.Fragment>
        <Route exact path="/news" render={(props) => {
          if (this.isAuthenticated()) {
            return <NewsList getAllUsers={this.getAllUsers} getCurrentUser={this.getCurrentUser}/>
          } else {
            return <Redirect to="/login" />
          }
        }} />

        <Route exact path="/messages" render={(props) => {
          if (this.isAuthenticated()) {
            return <MessageList {...props}
              getAllUsers={this.getAllUsers}
            />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route exact path="/todos" render={(props) => {
          if (this.isAuthenticated()) {
            return <TodoList getAllUsers={this.getAllUsers} getCurrentUser={this.getCurrentUser}/>
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route exact path="/events"
          render={(props) => {
            if (this.isAuthenticated()) {
              return (
                <EventList 
                getAllUsers={this.getAllUsers}
                getCurrentUser={this.getCurrentUser}/>
              );
            } else {
              return <Redirect to="/login" />
            }
          }} />
        <Route path="/login" render={props => {
          return (
            <Login getAllUsers={this.getAllUsers} />)
        }} />

      </React.Fragment>
    )
  }
}
