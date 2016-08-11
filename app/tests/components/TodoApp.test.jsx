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
        expect(todoApp.state.todos[0].text).toBe(todoItemText);
        expect(todoApp.state.todos[0].createdAt).toBeA('number');

    });

    it('should toggle completed value when handleToggle called', () => {
       var todoDataTest = {
           id: 11,
           text: 'test toggle',
           completed: false,
           createAt:0,
           completedAt: undefined
       };
       var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
        todoApp.setState({todos: [todoDataTest]});
        expect(todoApp.state.todos[0].completed).toBe(false);
        todoApp.handleToggle(11);
        expect(todoApp.state.todos[0].completed).toBe(true);
        expect(todoApp.state.todos[0].completedAt).toBeA('number');
    });

    it('should remove completedAt value when completed set to false', () => {
        var todoDataTest = {
            id: 11,
            text: 'test toggle',
            completed: true,
            createAt:0,
            completedAt: 0
        };
        var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
        todoApp.setState({todos: [todoDataTest]});
        expect(todoApp.state.todos[0].completed).toBe(true);
        todoApp.handleToggle(11);
        expect(todoApp.state.todos[0].completed).toBe(false);
        expect(todoApp.state.todos[0].completedAt).toNotExist();
    });
});
