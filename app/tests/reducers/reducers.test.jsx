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
                todo: {
                    id: 'abc',
                    text: "test",
                    completed: false,
                    createAt: 500
                }
            };
            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0]).toBe(action.todo);
        });

        it('should update todo item', () => {
            var updates= {
              completed:true,
                completedAt :125
            };
            var todo = {
                id:1,
                text: 'test',
                completed: false,
                completedAt : undefined
            };
            var action = {
                type: 'UPDATE_TODO_ITEM',
                id: todo.id,
                updates
            };
            var res = reducers.todosReducer(df([todo]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0].completed).toEqual(updates.completed);
            expect(res[0].completedAt).toEqual(updates.completedAt);
            expect(res[0].text).toBe(todo.text);

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