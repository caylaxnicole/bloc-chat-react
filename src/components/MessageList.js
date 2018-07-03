import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state ={
      messages: []

    };

    this.messageRef = this.props.firebase.database().ref('messages');

  }

  componentDidUpdate(prevProps) {
    if (this.props.activeRoom.key !== prevProps.activeRoom.key) {
      this.setState({ messages: []});
      this.messageRef.orderByChild('roomId').equalTo(this.props.activeRoom.key).on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({ messages:  [message] });
      });
    }

  }



    render() {
      return (
        <div>
          <div className= 'Messages'>
          <h3>Messages in {this.props.activeRoom.name}</h3>
          { this.state.messages.map((message, index) =>
            <li key={index}> Username: {message.username}: {message.content} Sent at: {message.sentAt}</li>
          )}

          </div>
        </div>
      );
  }
}
  export default MessageList;
