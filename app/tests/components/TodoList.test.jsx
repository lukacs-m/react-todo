var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var {Provider} = require('react-redux');
var TestUtils = require('react-addons-test-utils');

import {configure} from 'configureStore';
import ConnectedTodoList, {TodoList} from 'TodoList';
import ConnectedTodoItem, {TodoItem} from 'TodoItem'

describe('TodoList', () => {
    it('Should exist', () => {
        expect(TodoList).toExist();
    });


    it('should render one TodoItem component for each todo item', () => {
       var todos= [
           {
               id:1,
               text: "test1",
               completed: false,
               completedAt:undefined,
               createdAt: 500
           },
           {
               id:2,
               text: "test2",
               completed: false,
               completedAt:undefined,
               createdAt: 500
           }
       ];


        var store = configure({
            todos
        });
        var provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <ConnectedTodoList/>
            </Provider>
        );
        var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
        var todoItemsComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodoItem);

        expect(todoItemsComponents.length).toBe(todos.length);
    });

    it('should render message when todos array is empty', () => {
        var todos= [];

        var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
        var $el = $(ReactDOM.findDOMNode(todoList));

        expect($el.find('.container__message').length).toBe(1);
    });
});
