import firebase from 'firebase';

try{
    var config = {
        apiKey: "AIzaSyDTEk_i-TNcwIdo_rgxq45nwkA7oEuuLQg",
        authDomain: "react-todo-app-4af86.firebaseapp.com",
        databaseURL: "https://react-todo-app-4af86.firebaseio.com",
        storageBucket: "react-todo-app-4af86.appspot.com",
    };
    firebase.initializeApp(config);
} catch(e) {

}

export var firebaseRef = firebase.database().ref();

export default firebase;