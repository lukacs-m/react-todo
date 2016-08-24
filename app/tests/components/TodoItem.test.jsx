var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

import * as actions from 'actions';
import {TodoItem} from 'TodoItem';

describe('TodoItem', () => {
    it('Should exist', () => {
        expect(TodoItem).toExist();
    });

    it('should dispatch TOGGLE_TODO_ITEM action on click', () =>{
        var todoDataTest = {
          id:199,
            text: 'test',
            completed:true
        };
        var action = actions.startToggleTodoItem(todoDataTest.id, !todoDataTest.completed);

        var spy = expect.createSpy();
        var todoItem = TestUtils.renderIntoDocument(<TodoItem {...todoDataTest} dispatch={spy}/>);
        var $el = $(ReactDOM.findDOMNode(todoItem.refs.selectCompleted));

        TestUtils.Simulate.click($el[0]);

        expect(spy).toHaveBeenCalledWith(action);
    });
});
