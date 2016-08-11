var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var TodoList = require('TodoList');
var TodoItem = require('TodoItem');

describe('TodoList', () => {
    it('Should exist', () => {
        expect(TodoList).toExist();
    });


    it('should render one TodoItem component for each todo item', () => {
       var todos= [
           {
               id:1,
               text: "test1"
           },
           {
               id:2,
               text: "test2"
           }
       ];

        var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
        var todoItemsComponents = TestUtils.scryRenderedComponentsWithType(todoList, TodoItem);

        expect(todoItemsComponents.length).toBe(todos.length);
    });

    it('should render message when todos array is empty', () => {
        var todos= [];

        var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
        var $el = $(ReactDOM.findDOMNode(todoList));

        expect($el.find('.container__message').length).toBe(1);
    });
});
