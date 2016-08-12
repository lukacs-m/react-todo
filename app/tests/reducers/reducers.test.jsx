var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', () => {
    describe('searchTextReducer', () => {
        it('should set searchText', () => {
            var action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'dog'
            };
            var res = reducers.searchTextReducer(df(''), df(action));

            expect(res).toEqual(action.searchText);
        })
    });

    describe('showCompletedReducer', () => {
        it('should toggle showCompleted', () => {
            var action = {
                type: 'TOGGLE_SHOW_COMPLETED',
            };
            var res = reducers.showCompletedReducer(df(false), df(action));

            expect(res).toEqual(true);
        })
    });

    describe('todosReducer', () => {
        it('should add new todo item', () => {
            var action = {
                type: 'ADD_TODO_ITEM',
                text: "test new todo"
            };
            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0].text).toBe(action.text);
        });

        it('should toggle todo item', () => {
            var action = {
                type: 'TOGGLE_TODO_ITEM',
                id: 1
            };
            var todo = {
                id:1,
                completed: false,
                completedAt : undefined
            };
            var res = reducers.todosReducer(df([todo]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0].completed).toBe(true);
            expect(res[0].completedAt).toBeA('number');
        });

        it('should add  existing todos', () => {
            var todos = [{
                id:1,
                completed: false,
                completedAt : undefined
            }];
            var action = {
                type: 'ADD_TODOS',
                todos
            };
            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0]).toEqual(todos[0]);
        })
    });
});