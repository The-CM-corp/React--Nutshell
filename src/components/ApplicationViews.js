import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import Login from './authentication/Login'
import NewsList from './news/NewsList'
import TodoList from './todo/TodoList'
import './Nutshell.css'


export default class ApplicationViews extends Component {

  isAuthenticated = () => (sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null)

  state = {
    users: [],
    events: [],
    todos: [],
    news: [],
    messages: [],
    friends: []
  }

  componentDidMount() {
    const newState = {}

    APIManager.getAllEntries("users")
      .then(users => newState.users = users)
      .then(() => APIManager.getAllEntries("events"))
      .then(events => newState.events = events)
      .then(() => APIManager.getAllEntries("todos"))
      .then(todos => newState.todos = todos)
      .then(() => APIManager.getAllEntries("news"))
      .then(news => newState.news = news)
      .then(() => APIManager.getAllEntries("messages"))
      .then(messages => newState.messages = messages)
      .then(() => APIManager.getAllEntries("friends"))
      .then(friends => newState.friends = friends)
      .then(() => this.setState(newState))
  }

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
          <Route exact path="/todos" render={(props) => {
            if (this.isAuthenticated()) {
              return <TodoList todos={this.state.todos} />
            } else {
              return <Redirect to="/login" />
            }
          }}/>
          <Route path="/login" component={Login} />

        </React.Fragment>
      )
    }
  }
