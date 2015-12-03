import React, { Component } from 'react';
import User from './User';
import HttpService from '../utils/HttpService';

const usersUrl = "https://api.github.com/users";

class UserList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      url: usersUrl
    };
    this.httpServiceObj = new HttpService();
  }

  componentDidMount() {
    console.log( "UserList params: ", this.props.params );
    this.loadUsers();
  }

  loadUsers() {
    this.httpServiceObj.get({
       url: this.state.url,
       dataType: 'json',
       success: function(data) {
         this.setState({
           users: data
         });
       }.bind(this),
       error: function(xhr, status, err) {
         console.error(this.state.url, status, err.toString());
       }.bind(this)
     });
  }

  render() {
    var users = this.state.users.map(function(user) {
      return (
        <User user={user}
              url={this.props.url}
              key={user.id}/>
      );
    }, this);
    return (
      <div>
        {users}
      </div>
    );
  }

}

export default UserList;
