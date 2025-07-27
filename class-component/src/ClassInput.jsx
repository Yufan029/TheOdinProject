
import React, { Component } from 'react';
import { TodosCount } from './TodosCount';
import { TodoItem } from './TodoItem';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeTodo = this.handleChangeTodo.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
    }));
  }

  handleDelete(todo) {
    this.setState(state => ({
      todos: state.todos.filter(t => t !== todo),
      inputVal: '',
    }));
  }

  handleChangeTodo(oldTodo, newTodo) {
    this.setState(state => ({
        todos: state.todos.map(todo => todo === oldTodo ? newTodo : todo),
    }));
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <TodosCount key={this.state.todos.length} todos={this.state.todos} />

        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            <div key={todo}>
                <li key={todo}>
                    <TodoItem key={todo} todo={todo} onChange={this.handleChangeTodo}/>
                </li>
                <button
                    key={`${todo}-delete`} 
                    onClick={() => this.handleDelete(todo)}>
                    Delete
                </button>
            </div>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
