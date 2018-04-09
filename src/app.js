import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Common components
import Navbar from './components/common/Navbar';
import Home from './components/Home';
import NotFound from './components/common/NotFound';

//Playlist RESTFUL components
import IndexRoute from './components/playlists/IndexRoute';
import ShowRoute from './components/playlists/ShowRoute';
import NewRoute from './components/playlists/NewRoute';

//Auth components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import 'bulma';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <section>
          <Navbar />
          <main className="container">
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/playlists/new" component={NewRoute} />
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
