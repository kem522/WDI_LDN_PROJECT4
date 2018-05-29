import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import Auth from './lib/Auth';

//Common components
import Navbar from './components/common/Navbar';
import FlashMessages from './components/common/FlashMessages';
import Home from './components/Home';
import NotFound from './components/common/NotFound';
import ProtectedRoute from './components/common/ProtectedRoute';

//Playlist RESTFUL components
import IndexRoute from './components/playlists/IndexRoute';
import ShowRoute from './components/playlists/ShowRoute';
import NewRoute from './components/playlists/NewRoute';

//User components
import Profile from './components/users/ShowRoute';
import EditProfile from './components/users/EditRoute';

//Auth components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import 'bulma';
import './assets/style/styles.scss';

class App extends React.Component {

  componentDidMount(){
    if(!window.location.search) return false;
    const data = queryString.parse(window.location.search);
    data.redirectUri = window.location.origin + '/';
    if(window.location.search.includes('state')) {
      axios.post('/api/spotify', data)
        .then(res => {
          Auth.setToken(res.data.token);
          window.location.replace(window.location.origin);
        });
    } else {
      axios.post('/api/google', data)
        .then(res => {
          Auth.setToken(res.data.token);
          window.location.replace(window.location.origin);
        });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <section>
          <Navbar />
          <FlashMessages />
          <main className="container">
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/profile" component={Profile} />
              <Route path="/users/:id/edit" component={EditProfile} />
              <ProtectedRoute path="/playlists/new" component={NewRoute} />
              <Route path="/playlists/:id" component={ShowRoute} />
              <Route path="/playlists" component={IndexRoute} />
              <Route path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </section>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
