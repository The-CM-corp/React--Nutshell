import React, { Component } from 'react';
import "./Todo.css"
import APIManager from "../../modules/APIManager"

class TodoList extends Component {

  state = {
    users: [],
    todos: [],
    task: "",
    date: "",
    completed: "",
    hideNewForm: true,
    currentUserId: ""
  }

  componentDidMount() {
    this.setState({ currentUserId: this.props.getCurrentUser() })
  }

  componentDidUpdate() {
    APIManager.getAllEntries("todos", `?user_id=${this.state.currentUserId}`)
      .then((todos) => this.setState({ todos: todos }))
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


  constructNewTodo = evt => {
    evt.preventDefault()
    const todo = {
      task: this.state.task,
      date: this.state.date,
      completed: false,
      user_id: this.state.currentUserId
    }
    this.addTodo(todo)
  }


  render() {
    return (
      <React.Fragment>
        <section className="todos">
          <h1>To Do List</h1>
          <div className="todo__form__container">
            <form>
              <label htmlFor="task">Add New Task:</label>
              <input type="text" id="task" placeholder="Task Name" onChange={(event) => {
                this.handleFieldChange(event)
              }} />
              <input type="date" id="date" placeholder="Expected Completion" onChange={(event) => {
                this.handleFieldChange(event)
              }} />
              <button type="submit" onClick={(evt) => {
                this.constructNewTodo(evt)
              }}>Save</button>
            </form>
          </div>
          {
            this.state.todos.map(todo =>
              <div key={todo.id} className="todo__card">
                <h3 id={`task-${todo.id}`}>{todo.task}</h3>
                <h5>Expected Completion:</h5>
                <p id={`date-${todo.id}`}>{todo.date}</p>
                <button type="button" onClick={() => {
                  this.deleteTodo(todo.id)
                }}>DELETE</button>
                <button type="button" id={`edit-${todo.id}`} onClick={() => {
                  const taskName = document.getElementById(`task-${todo.id}`)
                  const taskDate = document.getElementById(`date-${todo.id}`)
                  taskName.contentEditable = true;
                  taskDate.contentEditable = true;

                }}>EDIT</button>
                <button type="button" id={`saveNew-${todo.id}`}>SAVE CHANGES</button>
              </div>
            )
          }
        </section>
      </React.Fragment>
    )
  }
}
export default TodoList