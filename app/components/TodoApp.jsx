var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

import TodoList from 'TodoList';
import AddTodoItem from 'AddTodoItem';
import TodoItemSearch from 'TodoItemSearch';

var TodoApp = React.createClass({
    render: function () {
        return (
            <div>
                <h1 className="page-title">Todo App</h1>
                <div className="row">
                    <div className="column small-centered small-11 medium-6 large-5">
                        <div className="container">
                            <TodoItemSearch/>
                            <TodoList/>
                            <AddTodoItem/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
});

module.exports = TodoApp;