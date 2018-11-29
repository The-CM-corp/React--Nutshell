import React, { Component } from 'react';
import "./Todo.css"
// import { Link } from "react-router-dom";

class TodoList extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="todos navclear">
          {
            this.props.todos.map( todo =>
              <div key={todo.id}>
              <h3>{todo.task}</h3>
              <p>Expected Completion: {todo.date}</p>
              <button type="button" onClick={() =>{
                this.props.deleteTodo(todo.id)
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