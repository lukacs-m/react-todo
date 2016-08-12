import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

var actions = require('actions');

var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
    it('should generate search text action', () => {
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText: 'some search text'
        };

        var res = actions.setSearchText(action.searchText);
        expect(res).toEqual(action);
    });

    it('should generate add todo item action', () => {
        var action = {
            type: 'ADD_TODO_ITEM',
            todo: {
                id: 'abc',
                text: "test",
                completed: false,
                createAt: 500
            }
        };

        var res = actions.addTodoItem(action.todo);
        expect(res).toEqual(action);
    });

    it('should create todo and dispatch ADD_TODO', (done) => {
        const store = createMockStore({});
        const todoText = "new text";

        store.dispatch(actions.startAddTodo(todoText)).then(() =>{
            const actions = store.getActions();
            expect(actions[0]).toInclude({
                type: 'ADD_TODO_ITEM'
            });
            expect(actions[0].todo).toInclude({
                text: todoText
            });
            done();
        }).catch(done);
    });

    it('should generate add todos action', () => {
        var action = {
            type: 'ADD_TODOS',
            todos: []
        };

        var res = actions.addTodos(action.todos);
        expect(res).toEqual(action);
    });

    it('should generate toggle todo item action', () => {
        var action = {
            type: 'TOGGLE_TODO_ITEM',
            id: '1'
        };

        var res = actions.toggleTodoItem(action.id);
        expect(res).toEqual(action);
    });

    it('should generate toggle show completed action', () => {
        var action = {
            type: 'TOGGLE_SHOW_COMPLETED',
        };

        var res = actions.toggleShowCompleted();
        expect(res).toEqual(action);
    });
});