var React = require('react');
var uuid = require('node-uuid');

var TodoList = require('TodoList');
var AddTodoItem = require('AddTodoItem');
var TodoItemSearch = require('TodoItemSearch');
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
                   completed: false
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
    handleToggle: function (id) {
        var updatedTodoItems = this.state.todos.map((todoItem) =>{
            if (todoItem.id === id){
                todoItem.completed = !todoItem.completed;
            }
            return todoItem;
        });

        this.setState({
           todos: updatedTodoItems
        });
    },
    render: function () {
        var {todos, showCompleted, searchText} = this.state;
        var filteredTodos = TodoAPI.filterTodoItems(todos, showCompleted, searchText);
        return (
            <div>
                <TodoItemSearch onSearch={this.handleSearch}/>
                <TodoList todos={filteredTodos} onToggle={this.handleToggle}/>
                <AddTodoItem onAddTodoItem={this.handleAddTodo}/>
            </div>
        );
    }
});

module.exports = TodoApp;