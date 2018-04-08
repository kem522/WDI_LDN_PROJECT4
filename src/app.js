import React from 'react';
import ReactDOM from 'react-dom';
// import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import _ from 'lodash';

import Navbar from './components/common/Navbar';
import Home from './components/Home';
import Index from './components/songs/Index';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// import Youtube from './components/Youtube';
import NotFound from './components/common/NotFound';

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
              <Route path="/songs" component={Index} />
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
