import React, { Component } from 'react';
import TodoFormEdit from "./TodoFormEdit"
import "./Todo.css"
import Moment from 'react-moment';


class TodoCard extends Component {

  render() {
    return (
      <div className="todo-card" key={this.props.todo.id}>
        <h3 id={`task-${this.props.todo.id}`}>{this.props.todo.task}</h3>
        <h6 id={`date-${this.props.todo.id}`}>Expected Completion Date: <Moment format="MM/DD/YY">{this.props.todo.date}</Moment></h6>
        <label>Completed</label>
        <input id={`completed-${this.props.todo.id}`} type="checkbox" className="checkbox" onClick={(evt) => {
          this.props.handleFieldChangeCheckbox(evt, this.props.todo.id)
        }} />
        <button type="button" className="btn_small" onClick={() => {
          this.props.deleteTodo(this.props.todo.id)
        }}>DELETE</button>
        <button type="button" className="btn_small" id={`edit-${this.props.todo.id}`} onClick={() => {
          this.props.toggleEditForm(this.props.todo.id)
          this.props.handleEditClick(`editTask-${this.props.todo.id}`, `editDate-${this.props.todo.id}`)
        }}>EDIT</button>
        <TodoFormEdit todo={this.props.todo} shownForm={this.props.shownForm} hideEditForm={this.props.hideEditForm} toggleEditForm={this.props.toggleEditForm} handleFieldChangeEdit={this.props.handleFieldChangeEdit} editTodo={this.props.editTodo} contructEditedTodo={this.props.contructEditedTodo} {...this.props}/>
      </div>
    )
  }
}

export default TodoCard

