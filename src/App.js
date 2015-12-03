import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router'

import {render} from 'react-dom';
import UserList from './components/UserList';
import User from './components/User';

require('./sass/app.scss');

var usersUrl = "https://api.github.com/users";

class App extends Component {
  render() {
    return (
      <div>
          {this.props.children}
      </div>
    );
  }
}

//
// render(<App url={usersUrl} />,
//   document.getElementById('root'));
//

render((
  <Router>
    <Route path="/" component={App}>

      <Route path="users" component={UserList} />
      <Route name="user" path="/user/:id" component={User} />
      <IndexRoute component={UserList}/>.
    </Route>
  </Router>
), document.getElementById('root'))

export default App;
