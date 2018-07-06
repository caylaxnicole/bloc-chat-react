import React, { Component } from 'react';
import moment from 'moment';


class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state ={
      messages: [],
      newMessage: []

    };

    this.messageRef = this.props.firebase.database().ref('messages');
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.timeRef = moment().format('h:mm:ss a');


  }

  componentDidUpdate(prevProps) {
    if (this.props.activeRoom.key !== prevProps.activeRoom.key) {
      this.setState({ messages: [] });
      this.messageRef.orderByChild('roomId').equalTo(this.props.activeRoom.key).on('value', snapshots => {
        const messages = [];
        snapshots.forEach(snap => {
          const message = snap.val();
          message.key = snap.key;
          messages.push(message);
        });
        this.setState({ messages });
      });
    }

  }



  handleChange(event){
    const newMessage= event.target.value;
    this.setState({
      newMessage: newMessage
    });
  }

  createMessage(event){
    event.preventDefault();
    this.messageRef.push({
      content: this.state.newMessage,
      username: this.props.user.displayName,
      roomId: this.props.activeRoom.key,
      sentAt:   this.timeRef
    });
    this.setState({ newMessage: [] });
  }


    render() {
      return (
        <div>
          <div className= 'Messages'>
          <h3>Messages in {this.props.activeRoom.name}</h3>
          { this.state.messages.map((message, index) => (
            <li key={index}> Username: {message.username}: {message.content} Sent at: {message.sentAt}</li>
          ))}
          <form className= "App--form" onSubmit={this.createMessage}>
            <input type="text"
            value={this.state.newMessage}
            placeholder= "Send a message"
            onChange={this.handleChange}/>
            <input type="submit" />
          </form>
          </div>

        </div>
      );
  }
}
  export default MessageList;
