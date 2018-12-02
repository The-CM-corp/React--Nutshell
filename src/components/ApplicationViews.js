import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import NewsList from './news/NewsList'
import EventList from './event/EventList'
import TodoList from './todo/TodoList'
import './Nutshell.css'
import MessageList from './message/MessageList';
import Welcome from './authentication/Welcome';


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
            return <Redirect to="/welcome" />
          }
        }} />

        <Route exact path="/messages" render={(props) => {
          if (this.isAuthenticated()) {
            return <MessageList {...props}
              getAllUsers={this.getAllUsers}
            />
          } else {
            return <Redirect to="/welcome" />
          }
        }} />
        <Route exact path="/todos" render={(props) => {
          if (this.isAuthenticated()) {
            return <TodoList getAllUsers={this.getAllUsers} getCurrentUser={this.getCurrentUser}/>
          } else {
            return <Redirect to="/welcome" />
          }
        }} />
        <Route exact path="/events"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <EventList getAllUsers={this.getAllUsers}
                  {...props}

                />
              );
            } else {
              return <Redirect to="/welcome" />
            }
          }} />
        <Route path="/welcome" render={props => {
          return (
            <Welcome getAllUsers={this.getAllUsers} />)
        }} />

      </React.Fragment>
    )
  }
}
