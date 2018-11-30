import React, { Component } from 'react';
import "./Todo.css"
import APIManager from "../../modules/APIManager"

class TodoList extends Component {

  state = {
    users: [],
    todos: [],
    task: "",
    date: "",
    completed: false,
    hideNewForm: true,
    currentUserId: "",
    editTask: "",
    editDate: ""
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

  handleNewClick = () => {
    const currentState = this.state.hideNewForm;
    this.setState({ hideNewForm: !currentState });
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleFieldChangeEdit = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id.split("-")[0]] = evt.target.value
    this.setState(stateToChange)
    console.log(this.state.editDate)
  }

  handleFieldChangeCheckbox = evt => {
    this.setState({ completed: evt.target.checked })
  }

  updateCompletion = evt => {
    const completionId = evt.target.id.split("-")[1]
    let updatedCompletion = {
      completed: this.state.completed
    }
    this.editTodo(completionId, updatedCompletion)
  }

  constructEditedTodo = evt => {
    let editedId = evt.target.id.split("-")[1]

    let editedTodo = {
      task: this.state.editTask,
      date: this.state.editDate,
      completed: this.state.completed
    }
    this.editTodo(editedId, editedTodo)
  }


  constructNewTodo = evt => {
    evt.preventDefault()
    const todo = {
      task: this.state.task,
      date: this.state.date,
      completed: this.state.completed,
      user_id: this.state.currentUserId
    }
    this.addTodo(todo)
  }


  render() {
    return (
      <React.Fragment>
        <section className="todos">
          <h1>To Do List</h1>
          <div id="todo__form__container" className={this.state.hideNewForm ? "hideForm" : null}>
            <form>
              <input type="text" id="task" placeholder="Task Name" onChange={(event) => {
                this.handleFieldChange(event)
              }} />
              <input type="date" id="date" placeholder="Expected Completion" onChange={(event) => {
                this.handleFieldChange(event)
              }} />
              <button type="submit" onClick={(evt) => {
                this.constructNewTodo(evt)
                this.handleNewClick()
              }}>Save</button>
              <button type="button" className={this.state.hideNewForm ? "hideForm" : null} onClick={() => {
                this.handleNewClick()
              }}>Cancel</button>
            </form>
          </div>
          <button className="add-new-btn" id="addNewTodoBtn" type="button" onClick={() => {
            this.handleNewClick()
          }}>Add New Task</button>
          {
            this.state.todos.map(todo =>
              <div key={todo.id} className="todo__card">
                <h3 id={`task-${todo.id}`}>{todo.task}</h3>
                <p id={`editDate-${todo.id}`} onChange={(evt) => {
                  this.handleFieldChange(evt).then(() => this.updateCompletion(evt))
                }
                }>Expected Completion Date: {todo.date}</p>
                <label>Completed</label>
                <input id={`completed-${todo.id}`} type="checkbox" onClick={(evt) => {
                  this.handleFieldChangeCheckbox(evt)
                }}></input>
                <button type="button" onClick={() => {
                  this.deleteTodo(todo.id)
                }}>DELETE</button>
                <button type="button" id={`edit-${todo.id}`} onClick={() => {
                  this.handleNewClick()
                }}>EDIT</button>
                <div id={`editForm-${todo.id}`} className={this.state.hideNewForm ? "hideForm" : null}>
                  <input type="text" id={`editTask-${todo.id}`} onChange={(evt) => this.handleFieldChangeEdit(evt)} />
                  <input type="date" id={`editDate-${todo.id}`} onChange={(evt) => this.handleFieldChangeEdit(evt)} />

                  <button type="button" id={`saveNew-${todo.id}`} onClick={(evt) =>
                    this.constructEditedTodo(evt)
                  }>SAVE CHANGES</button>
                </div>
              </div>
            )
          }
        </section>
      </React.Fragment>
    )
  }
}
export default TodoList