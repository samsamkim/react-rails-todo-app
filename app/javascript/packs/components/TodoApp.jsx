import React from 'react';
import ReactDOM from 'react-dom';

import TodoItem from './TodoItem';
import TodoItems from './TodoItems';

import axios from 'axios';

class TodoApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todoItems: []
    };

    this.getTodoItems = this.getTodoItems.bind(this);
  };

  componentDidMount(){
    this.getTodoItems();
  }

  getTodoItems() {
    axios
      .get("/api/v1/todo_items")
      .then(response => {
        const todoItems = response.data;
        this.setState({ todoItems });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <TodoItems>
        {this.state.todoItems.map(todoItem => (
          <TodoItem key={todoItem.id} todoItem={todoItem} />
          ))}
      </TodoItems>
    );
  };
};

document.addEventListener('turbolinks:load', () => {
  const app = document.getElementById('todo-app');
  app && ReactDOM.render(<TodoApp />, app);
})
