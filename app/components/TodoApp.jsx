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
                    text: 'walk the dog',
                    completed: false
                },
                {
                    id: uuid(),
                    text: 'the test',
                    completed: true
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
        var {todos} = this.state;

        return (
            <div>
                <TodoItemSearch onSearch={this.handleSearch}/>
                <TodoList todos={todos} onToggle={this.handleToggle}/>
                <AddTodoItem onAddTodoItem={this.handleAddTodo}/>
            </div>
        );
    }
});

module.exports = TodoApp;