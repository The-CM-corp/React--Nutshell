import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import Login from './authentication/Login'
import NewsList from './news/NewsList'
import './Nutshell.css'
import MessageList from './message/MessageList';


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

    APIManager.getAllEntries("users").then(users => newState.users = users)
    APIManager.getAllEntries("events").then(events => newState.events = events)
    APIManager.getAllEntries("todos").then(todos => newState.todos = todos)
    APIManager.getAllEntries("news").then(news => newState.news = news)
    APIManager.getAllEntries("messages").then(messages => newState.messages = messages)
    APIManager.getAllEntries("friends").then(friends => newState.friends = friends)

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
        <Route exact path="/messages" render={(props) => {
          if (this.isAuthenticated()) {
            return <MessageList {...props}
              messages={this.state.messages}
            />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        {/* <Route exact path="/employees" render={(props) => {
            if (this.isAuthenticated()) {
              return <EmployeeList
                deleteEmployee={this.deleteEmployee}
                animals={this.state.animals}
                employees={this.state.employees} />
            } else {
              return <Redirect to="/login" />
            }
          }} />

          <Route exact path="/owners" render={(props) => {
            if (this.isAuthenticated()) {
              return <OwnerList owners={this.state.owners} deleteOwner={this.deleteOwner} />
            } else {
              return <Redirect to="/login" />
            }
          }} />
          <Route exact path="/search" render={(props) => {
            console.log("props: ", props)
            return <Search results={this.props.searchResults} />
          }} />
          <Route path="/animals/:animalId(\d+)" render={(props) => {
            return <AnimalDetail {...props}
              deleteAnimal={this.deleteAnimal}
              animals={this.state.animals}
              employees={this.state.employees}
              owners={this.state.owners}
              animalOwners={this.state.animalOwners}
            />
          }} />
          <Route path="/employees/:employeeId(\d+)" render={(props) => {
            return <EmployeeDetail {...props} deleteEmployee={this.deleteEmployee} employees={this.state.employees} />
          }} />
          <Route path="/owners/:ownerId(\d+)" render={(props) => {
            return <OwnerDetail {...props} deleteOwner={this.deleteOwner} owners={this.state.owners} />
          }} />
          <Route path="/locations/:locationId(\d+)" render={(props) => {
            return <LocationDetail {...props} deleteLocation={this.deleteLocation} locations={this.state.locations} />
          }} />

          <Route path="/animals/new" render={(props) => {
            return <AnimalForm {...props}
              addAnimal={this.addAnimal}
              employees={this.state.employees} />
          }} /> */}
        <Route path="/login" component={Login} />

      </React.Fragment>
    )
  }
}
