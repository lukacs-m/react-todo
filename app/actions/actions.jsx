import moment from "moment";
import {firebaseRef, githubProvider} from "app/firebase/";

export var setSearchText = (searchText) => {
    return {
        type: 'SET_SEARCH_TEXT',
        searchText
    };
};

export var toggleShowCompleted = () => {
    return {
        type: 'TOGGLE_SHOW_COMPLETED',
    };
};

export var addTodoItem = (todo) => {
    return {
        type: 'ADD_TODO_ITEM',
        todo
    };
};

export var startAddTodo = (text) => {
    return (dispatch, getState) => {
        var todo = {
            text,
            completed: false,
            createdAt: moment().unix(),
            completedAt: null
        };
        var todoRef = firebaseRef.child('todos').push(todo);

        return todoRef.then(() => {
            dispatch(addTodoItem({
                ...todo,
                id: todoRef.key
            }));
        });
    };
};

export var addTodos = (todos) => {
    return {
        type: 'ADD_TODOS',
        todos
    };
};

export var startAddTodos = () => {
    return (dispatch, getState) => {
        var todosRef = firebaseRef.child('todos');

        return todosRef.once('value').then((snapshot) => {
            var todos = snapshot.val() || {};
            var todosArray = [];

            Object.keys(todos).forEach((todoId) => {
                todosArray.push({
                   id: todoId,
                    ...todos[todoId]
                });
            });
            dispatch(addTodos(todosArray));
        });



    };
};

export var updateTodoItem = (id, updates) => {
    return {
        type: 'UPDATE_TODO_ITEM',
        id,
        updates
    };
};

export var startToggleTodoItem = (id, completed) => {
    return (dispatch, getState) => {
        var todoRef = firebaseRef.child(`todos/${id}`);
        var updates = {
            completed,
            completedAt: completed ? moment().unix() : null
        };

        return todoRef.update(updates).then(() => {
            dispatch(updateTodoItem(id, updates));
        });
    };
};

export var startLogin = () => {
    return (dispatch, getState) => {
      return firebase.auth().signInWithPopup(githubProvider).then((result) =>{
            console.log('auth worked', result);
        }).catch((error) => {
            console.log("Unable to auth", error);
        });
    };
};

export var startLogout = () => {
    return (dispatch, getState) => {
        return firebase.auth().signOut().then(() => {
            console.log('Logged out!');
        });
    };
};