import React, { Component } from 'react';
import "./Todo.css"

class TodoFormNew extends Component {
  render () {
  return (
    <div id="todo__form__container" className={this.props.hideNewForm ? "hideForm" : null}>
      <div>
        <input type="text" id="task" placeholder="Task Name" onChange={(event) => {
          this.props.handleFieldChangeNew(event)
        }} />
        <input type="date" id="date" placeholder="Expected Completion" onChange={(event) => {
          this.props.handleFieldChangeNew(event)
        }} />
        <button type="button" onClick={(evt) => {
          this.props.constructNewTodo(evt)
          this.props.toggleNewForm()
        }}>Save</button>
        <button type="button" onClick={() => {
          this.props.toggleNewForm()
        }}>Cancel</button>
      </div>
    </div>
  )
}

}

export default TodoFormNew