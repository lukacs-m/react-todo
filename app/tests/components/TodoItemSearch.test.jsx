var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');
var TodoItemSearch = require('TodoItemSearch');

describe('TodoItemSearch', () => {
    it('Should exist', () => {
        expect(TodoItemSearch).toExist();
    });

    it('should call onSearch with entered input text', () => {
        var spy = expect.createSpy();
        var searchText = 'test';
        var todoItemSearch = TestUtils.renderIntoDocument(<TodoItemSearch onSearch={spy}/>);

        todoItemSearch.refs.searchText.value = searchText;
        TestUtils.Simulate.change(todoItemSearch.refs.searchText);

        expect(spy).toHaveBeenCalledWith(false, 'test');
    });

    it('should call onSearch with proper checked value', () => {
        var spy = expect.createSpy();
        var todoItemSearch = TestUtils.renderIntoDocument(<TodoItemSearch onSearch={spy}/>);

        todoItemSearch.refs.showCompleted.checked = true;
        TestUtils.Simulate.change(todoItemSearch.refs.showCompleted);

        expect(spy).toHaveBeenCalledWith(true, '');
    });
});
