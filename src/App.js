import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDtZYXIUSKrBEjSeSDiRiDO0xYebg6ZUyA",
    authDomain: "bloc-chat-react-e42d7.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-e42d7.firebaseio.com",
    projectId: "bloc-chat-react-e42d7",
    storageBucket: "bloc-chat-react-e42d7.appspot.com",
    messagingSenderId: "581635321105"
  };
  firebase.initializeApp(config);

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Bloc Chat</h2>
        </div>
        <div className="App-body">
          <h3> Available Rooms</h3>
          <RoomList firebase= { firebase } />
        </div>
      </div>
    );
  }
}

export default App;
