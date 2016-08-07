var React = require('react');
var TodoList = require('TodoList');
var AddTodoItem = require('AddTodoItem');

var TodoApp = React.createClass({
    getInitialState: function () {
        return {
            todos: [
                {
                    id: 1,
                    text: 'walk the dog'
                },
                {
                    id:2,
                    text: 'the test'
                }
            ]
        };
    },
    handleAddTodo: function (todoText) {
        alert('new todo: '+ todoText);
    },
    render: function () {
        var {todos} = this.state;

        return (
            <div>
               <TodoList todos={todos}/>
                <AddTodoItem onAddTodoItem={this.handleAddTodo}/>
            </div>
        );
    }
});

module.exports = TodoApp;