import React, { Component } from 'react';
import "./Todo.css"

class TodoFormNew extends Component {
  render () {
  return (
    <div id="todo__form__container" className={this.props.hideNewForm ? "hideForm" : null}>
      <div>
        <input className="input" type="text" id="task" placeholder="Task Name" onChange={(event) => {
          this.props.handleFieldChangeNew(event)
        }} />
        <input className="input" type="date" id="date" placeholder="Expected Completion" onChange={(event) => {
          this.props.handleFieldChangeNew(event)
        }} />
        <button type="button" className="btn_large" onClick={(evt) => {
          this.props.constructNewTodo(evt)
          this.props.toggleNewForm()
        }}>Save</button>
        <button type="button" className="btn_large" onClick={() => {
          this.props.toggleNewForm()
        }}>Cancel</button>
      </div>
    </div>
  )
}

}

export default TodoFormNew