import React, { Component } from 'react';

class User extends Component {
  constructor(props){
    super(props);


  }

componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

render() {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  return (
    <div className="CurrentUser">
      <div className="CurrentUser--identification">
       {this.props.user === null ?  <button className="Sign-in button"
       onClick={() => this.props.firebase.auth().signInWithPopup( provider )}>
         Sign In
       </button> : <div>
       <h3>{ this.props.user.displayName }</h3>
        <button onClick={() => this.props.firebase.auth().signOut() }>
          Sign Out
        </button>
        </div>}
      </div>
    </div>
  );

  }
}

export default User;
