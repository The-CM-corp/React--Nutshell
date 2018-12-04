import React, { Component } from 'react';
import "./Todo.css"
import APIManager from "../../modules/APIManager"
import TodoCard from "./TodoCard"
import TodoFormNew from "./TodoFormNew"


class TodoList extends Component {

  state = {
    users: [],
    todos: [],
    task: "",
    date: "",
    shownForm: null,
    completed: false,
    hideNewForm: true,
    hideEditForm: true,
    currentUserId: this.props.getCurrentUser(),
    editTask: "",
    editDate: ""
  }

  componentDidMount() {
    this.getUserTodos()
  }

  // Functions to handle API fetches and setting state after
  getUserTodos = () => {
    APIManager.getAllEntries("todos", `?completed=false&user_id=${this.state.currentUserId}`)
      .then((todos) => this.setState({ todos: todos }))
  }

  deleteTodo = (id) => {
    APIManager.deleteEntry("todos", id)
      .then(() => this.getUserTodos())
  }

  editTodo = (id, editedTodo) => {
    APIManager.editEntry("todos", id, editedTodo)
      .then(() => this.getUserTodos())
  }

  addTodo = (newTodo) => {
    APIManager.addEntry("todos", newTodo)
      .then(() => this.getUserTodos())
  }

  // Update state whenever an input field is edited
  handleFieldChangeNew = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleFieldChangeEdit = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id.split("-")[0]] = evt.target.value
    this.setState(stateToChange)
  }

  handleEditClick = (inputTaskId, inputDateId) => {
    let taskValue = document.getElementById(inputTaskId).value
    let dateValue = document.getElementById(inputDateId).value
    this.setState({editTask: taskValue, editDate: dateValue})
  }

  handleFieldChangeCheckbox = (evt, id) => {
    this.setState({ completed: evt.target.checked }, () => {
      let editedCompletion = this.constructEditedCompletion()
      this.editTodo(id, editedCompletion)
    })
  }

  // contruct objects and pass to fetch calls
  constructNewTodo = evt => {
    if (this.state.task === "" || this.state.date === "") {
      alert("No fields should be left blank")
    } else {
      const todo = {
        task: this.state.task,
        date: this.state.date,
        completed: this.state.completed,
        user_id: this.state.currentUserId
      }
      this.addTodo(todo)
    }
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

  // Show and Hide Functions
  toggleEditForm = (id) => {
    if (this.state.shownForm === null) {
      this.setState({
        shownForm: id,
      });
    } else {
      this.setState({
        shownForm: null,
      });
    }
  }

  toggleNewForm = () => {
    const currentState = this.state.hideNewForm;
    this.setState({
      hideNewForm: !currentState,
    });
  }

  render() {
    return (
      <React.Fragment>
        <section className="todos">
          <h1>To Do List</h1>
          <TodoFormNew hideNewForm={this.state.hideNewForm} handleFieldChangeNew={this.handleFieldChangeNew} constructNewTodo={this.constructNewTodo} toggleNewForm={this.toggleNewForm} />
          <button className="btn_large" id="addNewTodoBtn" type="button" onClick={() => {
            this.toggleNewForm()
          }}>Add New Task</button>
          {
            this.state.todos.map(todo =>

              <TodoCard key={todo.id} todo={todo} handleFieldChangeCheckbox={this.handleFieldChangeCheckbox} handleFieldChangeEdit={this.handleFieldChangeEdit} editTodo={this.editTodo} deleteTodo={this.deleteTodo} toggleEditForm={this.toggleEditForm} shownForm={this.state.shownForm} hideEditForm={this.state.hideEditForm} constructEditedTodo={this.constructEditedTodo} handleEditClick={this.handleEditClick} {...this.props} />
            )
          }
        </section>
      </React.Fragment>
    )
  }
}
export default TodoList