import React, { Component } from 'react';
import "./Todo.css"
import APIManager from "../../modules/APIManager"

class TodoList extends Component {

  state = {
    users: [],
    todos: []
  }

  componentDidMount() {
    const newState = {}

    this.props.getAllUsers()
      .then(users => newState.users = users)
      .then(() => APIManager.getAllEntries("todos"))
      .then(todos => newState.todos = todos)
      .then(() => this.setState(newState))
  }

  deleteTodo = (id) => {
    APIManager.deleteEntry("todos", id)
      .then(() => APIManager.getAllEntries("todos"))
      .then(todos => this.setState({ todos: todos }))
  }

  editTodo = (id, editedTodo) => {
    APIManager.editEntry("todos", id, editedTodo)
      .then(() => APIManager.getAllEntries("todos"))
      .then(todos => this.setState({ todos: todos }))
  }

  addTodo = (newTodo) => {
    APIManager.addEntry("todos", newTodo)
      .then(() => APIManager.getAllEntries("todos"))
      .then(todos => this.setState({ todos: todos }))
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
}


  render() {
    return (
      <React.Fragment>
        <section className="todos">
          <h1>To Do List</h1>
          <div className="add__todo__form">
            <label htmlFor="task">Add New Task:</label>
            <input type="text" id="task" onChange={(event) => {
              this.handleFieldChange(event)
            }} />
            <button type="button" >Save</button>
          </div>
          {
            this.state.todos.map(todo =>
              <div key={todo.id} className="todo__card">
                <h3>{todo.task}</h3>
                <p>Expected Completion: {todo.date}</p>
                <button type="button" onClick={() => {
                  this.deleteTodo(todo.id)
                }}>DELETE</button>
              </div>
            )
          }
        </section>
      </React.Fragment>
    )
  }
}
export default TodoList