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

});
