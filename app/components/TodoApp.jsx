var React = require('react');
var TodoList = require('TodoList');
var AddTodoItem = require('AddTodoItem');
var TodoItemSearch = require('TodoItemSearch');
var uuid = require('node-uuid');

var TodoApp = React.createClass({
    getInitialState: function () {
        return {
            todos: [
                {
                    id: uuid(),
                    text: 'walk the dog'
                },
                {
                    id: uuid(),
                    text: 'the test'
                }
            ],
            showCompleted: false,
            searchText:''
        };
    },
    handleAddTodo: function (todoText) {
        this.setState({
           todos:[
               ...this.state.todos,
               {
                   id:uuid(),
                   text:todoText
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