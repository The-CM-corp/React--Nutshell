import React, { Component } from 'react';
import "./Todo.css"
// import { Link } from "react-router-dom";

class TodoList extends Component {
  render() {
    return (
      <React.Fragment>
        <ul className="todos navclear">
          {
            this.props.todos.map( todo =>
              <li key={todo.id}>{todo.task}</li>
            )
          }
        </ul>
      </React.Fragment>
    )
  }
}
export default TodoList