import React, { Component } from 'react';
import HttpService from '../utils/HttpService';
import { Router, Route, Link } from 'react-router'

var usersUrl = "https://api.github.com/users";
class User extends Component {

  constructor(props) {
    super(props);

    if (this.props.user) {
      this.state = {
        user: this.props.user
      };
    } else {
      this.state = {
        user: {}
      };
    }

    this.httpServiceObj = new HttpService();
  }

  componentDidMount() {
    console.log( "User params: ", this.props.params );
    if (this.props.params && this.props.params.id) {
      this.viewDetails(usersUrl + "/" + this.props.params.id);
    }
  }

  viewDetails(url) {
    if ( typeof url !== "string" ) {
      url = this.props.user.url;
    }
    this.httpServiceObj.get({
       url: url,
       dataType: 'json',
       success: function(data) {
         console.log("User Details", data);
         this.setState({
           userDetails: data
         });
       }.bind(this),
       error: function(xhr, status, err) {
         console.error(this.state.url, status, err.toString());
       }.bind(this)
     });
  }

  render() {
    if (this.state.userDetails) {
      var userDetails = <div>
                          <div>
                            Name : <span>{this.state.userDetails.login}</span>
                          </div>
                          <div>
                            Location : <span>{this.state.userDetails.location}</span>
                          </div>
                          <div>
                            Followers : <span>{this.state.userDetails.followers}</span>
                          </div>
                          <div>
                            <img src={this.state.userDetails.avatar_url} />
                          </div>
                        </div>;
   }

    var user = <div>
                <div>
                  Name : <span>{this.state.user.login}</span>
                </div>
                <div>
                  <Link to={`/user/${this.state.user.login}`}>View Details</Link>
                </div>
                <div>
                  <img src={this.state.user.avatar_url} />
                </div>
              </div>;
    return (
      <div>
        {this.state.userDetails ? userDetails : user}
      </div>
    );
  }

}

export default User;
