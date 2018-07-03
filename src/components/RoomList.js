import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state ={
      rooms: [],
      newRoomName:''

    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);

  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });

  }

  handleChange(event){
    const newRoomName= event.target.value;
    this.setState({
      newRoomName: newRoomName
    });
  }

  createRoom(event){
    event.preventDefault();
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({ newRoomName: ''});
  }

  currentRoom(room) {
    this.props.setActiveRoom(room);
  }

    render() {
      return (
        <div>
          <div className= 'Rooms'>
          { this.state.rooms.map(( room, index ) =>
            <li key={index} onClick={(event) => this.currentRoom(room, event)}> {room.name} </li>
          )}
          </div>
          <form className= "App--form" onSubmit={this.createRoom}>
            <h4> Create a new Room below:</h4>
            <input type="text" value={this.state.newRoomName} onChange={this.handleChange}/>
            <input type="submit" />
          </form>
        </div>
      );
  }
}

export default RoomList;
