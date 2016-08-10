var React = require('react');
var TodoList = require('TodoList');
var AddTodoItem = require('AddTodoItem');
var TodoItemSearch = require('TodoItemSearch');

var TodoApp = React.createClass({
    getInitialState: function () {
        return {
            todos: [
                {
                    id: 1,
                    text: 'walk the dog'
                },
                {
                    id: 2,
                    text: 'the test'
                }
            ],
            showCompleted: false,
            searchText:''
        };
    },
    handleAddTodo: function (todoText) {
        alert('new todo: ' + todoText);
    },
    handleSearch: function (showCompleted, searchText) {
        this.setState({
            showCompleted: showCompleted,
            searchText: searchText.toLowerCase()
        })
    },
    render: function () {
        var {todos} = this.state;

        return (
            <div>
                <TodoItemSearch onSearch={this.handleSearch}/>
                <TodoList todos={todos}/>
                <AddTodoItem onAddTodoItem={this.handleAddTodo}/>
            </div>
        );
    }
});

module.exports = TodoApp;