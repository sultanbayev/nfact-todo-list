import firebase from 'firebase'

const config = {
        apiKey: "AIzaSyAcbvG8nL7OWWgJ-K3UPj0whrYTpOUP0oE",
        authDomain: "nfactorial-todo-list.firebaseapp.com",
        databaseURL: "https://nfactorial-todo-list.firebaseio.com",
        projectId: "nfactorial-todo-list",
        storageBucket: "nfactorial-todo-list.appspot.com",
        messagingSenderId: "218489651941",
        appId: "1:218489651941:web:f7c40a2e140a47e2c58a0c"
      };

firebase.initializeApp(config);

export default firebase;