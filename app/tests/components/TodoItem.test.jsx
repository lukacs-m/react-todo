var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');
var TodoItem = require('TodoItem');

describe('TodoItem', () => {
    it('Should exist', () => {
        expect(TodoItem).toExist();
    });

    it('should call onToggle prop with id on click', () =>{
        var todoDataTest = {
          id:199,
            text: 'test',
            conmpleted:true
        };
        var spy = expect.createSpy();
        var todoItem = TestUtils.renderIntoDocument(<TodoItem {...todoDataTest} onToggle={spy}/>);
        var $el = $(ReactDOM.findDOMNode(todoItem));

        TestUtils.Simulate.click($el[0]);
        
        expect(spy).toHaveBeenCalledWith(199);
    });
});
