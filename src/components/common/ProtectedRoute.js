import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  //if the user isn't authenticated then set this flash message that will be displayed on the page from the component <FlashMessage /> in app.js
  !Auth.isAuthenticated() && Flash.setMessage('danger', 'You must be logged in.');
  return (
    <Route {...rest} render={props =>
      Auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login"
        />
      )
    }
    />
  );
};

export default ProtectedRoute;
