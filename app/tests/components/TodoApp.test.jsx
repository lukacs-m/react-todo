var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');
var TodoApp = require('TodoApp');

describe('TodoApp', () => {
    it('Should exist', () => {
        expect(TodoApp).toExist();
    });

    it('should add todoItem to the todos state on handleAddTodo', () => {
        var todoItemText = "test text";
        var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

        todoApp.setState({todos: []});
        todoApp.handleAddTodo(todoItemText);
        expect(todoApp.state.todos.length).toBe(1);
        expect(todoApp.state.todos[0].text).toBe('test text');
    });
});
