import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase/';
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

    it('should generate update todo item action', () => {
        var action = {
            type: 'UPDATE_TODO_ITEM',
            id: '1',
            updates: {
                completed: false,

            }
        };

        var res = actions.updateTodoItem(action.id, action.updates);
        expect(res).toEqual(action);
    });

    it('should generate toggle show completed action', () => {
        var action = {
            type: 'TOGGLE_SHOW_COMPLETED',
        };

        var res = actions.toggleShowCompleted();
        expect(res).toEqual(action);
    });

    describe('Tests with firebase todos', () => {
        var testTodoRef;

        beforeEach((done) => {
            testTodoRef = firebaseRef.child('todos').push();

            testTodoRef.set({
               text: 'test',
                completed: false,
                createdAt: 20215454
            }).then(() => done());
        });

        afterEach((done) => {
            testTodoRef.remove().then(() => done());
        });

        it('should toggle todo item and dispach UPDATE_TODO_ITEM action', (done) => {
            const store = createMockStore({});
            const action = actions.startToggleTodoItem(testTodoRef.key, true);

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                expect(mockActions[0]).toInclude({
                    type: 'UPDATE_TODO_ITEM',
                    id: testTodoRef.key,
                });

                expect(mockActions[0].updates).toInclude({
                  completed: true
                });

                expect(mockActions[0].updates.completedAt).toExist();

                done();
            }).catch(() => {
                done();
            })
        });
    });
});