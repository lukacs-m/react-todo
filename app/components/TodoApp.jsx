var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

import TodoList from 'TodoList';
import AddTodoItem from 'AddTodoItem';
import TodoItemSearch from 'TodoItemSearch';
var TodoAPI = require('TodoAPI');

var TodoApp = React.createClass({
    getInitialState: function () {
        return {
            todos: TodoAPI.getTodos(),
            showCompleted: false,
            searchText:''
        };
    },
    componentDidUpdate: function () {
      TodoAPI.setTodos(this.state.todos);
    },
    handleAddTodo: function (todoText) {
        this.setState({
           todos:[
               ...this.state.todos,
               {
                   id:uuid(),
                   text:todoText,
                   completed: false,
                   createdAt: moment().unix(),
                   completedAt: undefined
               }
           ]
        });
    },
    handleSearch: function (showCompleted, searchText) {
        this.setState({
            showCompleted: showCompleted,
            searchText: searchText.toLowerCase()
        })
    },
    render: function () {
        var {todos, showCompleted, searchText} = this.state;
        var filteredTodos = TodoAPI.filterTodoItems(todos, showCompleted, searchText);
        return (
            <div>
                <h1 className="page-title">Todo App</h1>
                <div className="row">
                    <div className="column small-centered small-11 medium-6 large-5">
                        <div className="container">
                            <TodoItemSearch onSearch={this.handleSearch}/>
                            <TodoList/>
                            <AddTodoItem onAddTodoItem={this.handleAddTodo}/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
});

module.exports = TodoApp;