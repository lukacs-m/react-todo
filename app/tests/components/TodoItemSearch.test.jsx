var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

import {TodoItemSearch} from "TodoItemSearch";

describe('TodoItemSearch', () => {
    it('Should exist', () => {
        expect(TodoItemSearch).toExist();
    });

    it('should dispatch SET_SEARCH_TEXT when input text entered', () => {
        var spy = expect.createSpy();
        var searchText = 'test';
        var action = {
            type: "SET_SEARCH_TEXT",
            searchText
        };
        var todoItemSearch = TestUtils.renderIntoDocument(<TodoItemSearch dispatch={spy}/>);


        todoItemSearch.refs.searchText.value = searchText;
        TestUtils.Simulate.change(todoItemSearch.refs.searchText);

        expect(spy).toHaveBeenCalledWith(action);
    });

    it('should dispatch TOGGLE_SHOW_COMPLETED when checkbox checked', () => {
        var action = {
            type: "TOGGLE_SHOW_COMPLETED"
        };
        var spy = expect.createSpy();
        var todoItemSearch = TestUtils.renderIntoDocument(<TodoItemSearch dispatch={spy}/>);

        todoItemSearch.refs.showCompleted.checked = true;
        TestUtils.Simulate.change(todoItemSearch.refs.showCompleted);

        expect(spy).toHaveBeenCalledWith(action);
    });
});
