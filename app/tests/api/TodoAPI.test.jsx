var expect = require('expect');
var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {

    beforeEach(() => {
        localStorage.removeItem('todos');
    });

    it('should exist', () => {
        expect(TodoAPI).toExist();
    });

    describe('setTodos', () => {
        it('should set valid todos array', () => {
            var todos = [{
                id: 23,
                text: "test",
                completed: false
            }];
            TodoAPI.setTodos(todos);

            var actualTodos = JSON.parse(localStorage.getItem('todos'));

            expect(actualTodos).toEqual(todos);
        });

        it('should not set invalid todos array', () => {
            var badTodos = {a: 'b'};
            TodoAPI.setTodos(badTodos);

            expect(localStorage.getItem('todos')).toBe(null);
        });
    });

    describe('getTodos', () => {
        it('should return empty array for bad localstorage data', () => {
            var actualTodos = TodoAPI.getTodos();
            expect(actualTodos).toEqual([]);
        });

        it('should return todo if valid array in localstorage', () => {
            var todos = [{
                id: 23,
                text: "test",
                completed: false
            }];
            localStorage.setItem('todos', JSON.stringify(todos));
            var actualTodos = TodoAPI.getTodos();

            expect(actualTodos).toEqual(todos);
        });
    });

    describe('filterTodos', () => {
        var todos = [
            {
                id: 1,
                text: "test 1",
                completed: true
            },
            {
                id: 2,
                text: "test Two",
                completed: false
            },
            {
                id: 3,
                text: "test 3",
                completed: true
            }
        ];

        it("should return all item if showCompleted is true", () => {
            var filteredTodos = TodoAPI.filterTodoItems(todos, true, '');

            expect(filteredTodos.length).toBe(3);
        });

        it("should return only non completed todo items if showCompleted is false", () => {
            var filteredTodos = TodoAPI.filterTodoItems(todos, false, '');

            expect(filteredTodos.length).toBe(1);
        });

        it('should sorts by completed todo items', () => {
            var filtedTodos = TodoAPI.filterTodoItems(todos, true, '');
            expect(filtedTodos[0].completed).toBe(false);
        });

        it("should filter todos by searchText", () => {
            var filteredTodos = TodoAPI.filterTodoItems(todos, true, 'two');

            expect(filteredTodos.length).toBe(1);
        });

        it("should return all todos item if searchText is empty", () => {
            var filteredTodos = TodoAPI.filterTodoItems(todos, true, '');

            expect(filteredTodos.length).toBe(3);
        });

    })
});