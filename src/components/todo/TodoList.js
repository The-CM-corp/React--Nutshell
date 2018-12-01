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
    currentUserId: this.props.getCurrentUser(),
    editTask: "",
    editDate: ""
  }

  componentDidMount() {
    APIManager.getAllEntries("todos", `?completed=false&user_id=${this.state.currentUserId}`)
      .then((todos) => this.setState({ todos: todos }))
  }



  deleteTodo = (id) => {
    APIManager.deleteEntry("todos", id)
      .then(() => APIManager.getAllEntries("todos", `?completed=false&user_id=${this.state.currentUserId}`))
      .then(todos => this.setState({ todos: todos }))
  }

  editTodo = (id, editedTodo) => {
    APIManager.editEntry("todos", id, editedTodo)
      .then(() => APIManager.getAllEntries("todos", `?completed=false&user_id=${this.state.currentUserId}`))
      .then(todos => this.setState({ todos: todos }))
  }

  addTodo = (newTodo) => {
    APIManager.addEntry("todos", newTodo)
      .then(() => APIManager.getAllEntries("todos", `?completed=false&user_id=${this.state.currentUserId}`))
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
  }

  handleFieldChangeCheckbox = (evt, id) => {
    this.setState({ completed: evt.target.checked }, () => {
      let editedCompletion = this.constructEditedCompletion()
      this.editTodo(id, editedCompletion)
    })
  }

  constructEditedTodo = (id) => {
    let editedTodo = {
      task: this.state.editTask,
      date: this.state.editDate,
      completed: this.state.completed,
      user_id: this.state.currentUserId
    }
    this.editTodo(id, editedTodo)
  }

  constructEditedCompletion = () => {
    return {
      completed: this.state.completed
    }
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
                Expected Completion Date:
                <p id={`date-${todo.id}`}> {todo.date}</p>
                <label>Completed</label>
                <input id={`completed-${todo.id}`} type="checkbox" onClick={(evt) => {
                  this.handleFieldChangeCheckbox(evt, todo.id)
                }} />
                <button type="button" onClick={() => {
                  this.deleteTodo(todo.id)
                }}>DELETE</button>
                <input type="text" id={`editTask-${todo.id}`} defaultValue={todo.task} onChange={(evt) => { this.handleFieldChangeEdit(evt) }} />

                <input type="date" id={`editDate-${todo.id}`} defaultValue={todo.date}onChange={(evt) => this.handleFieldChangeEdit(evt)} />
                <button type="button" id={`edit-${todo.id}`} onClick={() => {
                }}>EDIT</button>

                <button type="button" id={`saveNew-${todo.id}`} onClick={(evt) =>
                  this.constructEditedTodo(todo.id)
                }>SAVE CHANGES</button>
              </div>
            )
          }
        </section>
      </React.Fragment>
    )
  }
}
export default TodoList