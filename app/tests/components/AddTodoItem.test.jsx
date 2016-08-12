var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

var {AddTodoItem} = require('AddTodoItem');

describe('AddTodoItem', ()=> {
    it('should exist', () => {
        expect(AddTodoItem).toExist();
    });

    it('should dispatch ADD_TODO_ITEM if valid todoItem text', () => {
       var todoItemTest = "test1";
        var action = {
            type: "ADD_TODO_ITEM",
            text: todoItemTest
        };
        var spy = expect.createSpy();
        var addTodoItem = TestUtils.renderIntoDocument(<AddTodoItem dispatch={spy}/>);
        var $el = $(ReactDOM.findDOMNode(addTodoItem));

        addTodoItem.refs.todoItem.value = todoItemTest;
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toHaveBeenCalledWith(action);
    });

    it('should not dispatch ADD_TODO_ITEM if invalid todoItem text entered', () => {
        var spy = expect.createSpy();
        var addTodoItem = TestUtils.renderIntoDocument(<AddTodoItem dispatch={spy}/>);
        var $el = $(ReactDOM.findDOMNode(addTodoItem));

        addTodoItem.refs.todoItem.value = "";
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toNotHaveBeenCalled();
    });
});