var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

var AddTodoItem = require('AddTodoItem');

describe('AddTodoItem', ()=> {
    it('should exist', () => {
        expect(AddTodoItem).toExist();
    });

    it('should call onAddTodoItem if valid todoItem entered', () => {
       var todoItemTest = "test1";
        var spy = expect.createSpy();
        var addTodoItem = TestUtils.renderIntoDocument(<AddTodoItem onAddTodoItem={spy}/>);
        var $el = $(ReactDOM.findDOMNode(addTodoItem));

        addTodoItem.refs.todoItem.value = todoItemTest;
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toHaveBeenCalledWith(todoItemTest);
    });

    it('should not call onAddTodoItem if invalid todoItem entered', () => {
        var spy = expect.createSpy();
        var addTodoItem = TestUtils.renderIntoDocument(<AddTodoItem onAddTodoItem={spy}/>);
        var $el = $(ReactDOM.findDOMNode(addTodoItem));

        addTodoItem.refs.todoItem.value = "";
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toNotHaveBeenCalled();
    });
});