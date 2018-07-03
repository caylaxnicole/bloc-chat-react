import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
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
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: '',
      user: null
    }

    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser= this.setUser.bind(this);
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room })
  }

  setUser(user) {
    this.setState({ user: user })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Bloc Chat</h2>
          <User firebase= { firebase } setUser={(user) => this.setUser(user)}
          user= {this.state.user}/>
        </div>
        <div className="App-body">
          <h3> Available Rooms</h3>
          <RoomList firebase= { firebase } activeRoom={this.state.activeRoom}
          setActiveRoom={(room) => this.setActiveRoom(room)}/>
          <MessageList firebase={ firebase } activeRoom={this.state.activeRoom}/>

        </div>
      </div>
    );
  }
}

export default App;
