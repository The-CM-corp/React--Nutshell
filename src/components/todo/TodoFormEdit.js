import React, { Component } from 'react';
import "./Todo.css"


class TodoFormEdit extends Component {

  render() {
    return (
      <div className={`${this.props.shownForm === this.props.todo.id ? null : 'hideForm'}`}>

        <input className="input" type="text" id={`editTask-${this.props.todo.id}`} defaultValue={this.props.todo.task} onChange={(evt) => { this.props.handleFieldChangeEdit(evt) }} />

        <input type="date" className="input" id={`editDate-${this.props.todo.id}`} defaultValue={this.props.todo.date} onChange={(evt) => {
          this.props.handleFieldChangeEdit(evt)
        }} />

        <button type="button" className="btn_small" id={`saveNew-${this.props.todo.id}`} onClick={(evt) => {
          this.props.toggleEditForm()
          this.props.constructEditedTodo(this.props.todo.id)
        }}>SAVE CHANGES</button>

      </div>
    )
  }
}

export default TodoFormEdit