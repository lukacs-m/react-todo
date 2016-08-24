import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import firebase, {firebaseRef} from "app/firebase/";
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

    it('should generate login action', () =>{
        var action ={
            type: 'LOGIN',
            uid: 123
        };

        var res = actions.login(action.uid);
        expect(res).toEqual(action);
    });

    it('should generate logout action', () =>{
        var action ={
            type: 'LOGOUT',
        };

        var res = actions.logout();
        expect(res).toEqual(action);
    });

    describe('Tests with firebase todos', () => {
        var testTodoRef;
        var uid;
        var todosRef;

        beforeEach((done) => {
        var credential = firebase.auth.GithubAuthProvider.credential(process.env.GITHUB_ACCESS_TOKEN);

            firebase.auth().signInWithCredential(credential).then((user) =>{
                uid = user.uid;
                console.log("user uid", uid);
                todosRef = firebaseRef.child(`users/${uid}/todos`);

                return todosRef.remove();
            }).then(() => {
                testTodoRef = todosRef.push();

                return testTodoRef.set({
                    text: 'test',
                    completed: false,
                    createdAt: 20215454
                })
            })
                .then(() => done())
                .catch(done);


        });

        afterEach((done) => {
            todosRef.remove().then(() => done());
        });

        it('should toggle todo item and dispach UPDATE_TODO_ITEM action', (done) => {
            const store = createMockStore({auth:{uid}});
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
            }).catch(done());
        });

        it('should add todos and dispach ADD_TODOS action', (done) => {
            const store = createMockStore({auth:{uid}});
            const action = actions.startAddTodos();

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                expect(mockActions[0].type).toEqual('ADD_TODOS');
                expect(mockActions[0].todos.length).toEqual(1);
                expect(mockActions[0].todos[0].text).toEqual('test');

                done();
            }).catch(done());
        });

        it('should create todo and dispatch ADD_TODO', (done) => {
            const store = createMockStore({auth:{uid}});
            const todoText = "new text";

            store.dispatch(actions.startAddTodo(todoText)).then(() => {
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

        it('should delete todo and dispatch DELETE_TODO_ITEM', (done) => {
            const store = createMockStore({auth:{uid}});
            const action = actions.startDeleteTodoItem(testTodoRef.key);

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                expect(mockActions[0]).toInclude({
                    type: 'DELETE_TODO_ITEM',
                    id: testTodoRef.key,
                });

                expect(mockActions.length).toEqual(0);

                done();
            }).catch(done());
        });


    });
});