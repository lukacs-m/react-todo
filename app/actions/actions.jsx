import moment from 'moment';
import firebase, {firebaseRef} from 'app/firebase/';

export var setSearchText = (searchText) => {
    return{
        type: 'SET_SEARCH_TEXT',
        searchText
    };
};

export var toggleShowCompleted = () => {
    return{
        type: 'TOGGLE_SHOW_COMPLETED',
    };
};

export var addTodoItem = (todo) => {
    return{
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
    return{
        type: 'ADD_TODOS',
        todos
    };
};

export var toggleTodoItem = (id) => {
    return{
        type: 'TOGGLE_TODO_ITEM',
        id
    };
};