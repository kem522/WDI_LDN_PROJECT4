import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import GoogleLogin from './GoogleLogin';
import SpotifyLogin from './SpotifyLogin';
import Flash from '../../lib/Flash';

class Login extends React.Component{

  state = {
    errors: {}
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const errors = { ...this.state.errors, [name]: '' };
    this.setState({ [name]: value, errors });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', this.state)
      .then(res => {
        Auth.setToken(res.data.token);
      })
      .then(() => Flash.setMessage('success', 'Welcome back!'))
      .then(() => this.props.history.push('/playlists'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="email">
            <input
              name="email"
              onChange={this.handleChange}
            />
            <div className="input-text">Email</div>
            {this.state.errors.email && <small>{this.state.errors.email}</small>}
          </label>
        </div>
        <div className="field">
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
            />
            <div className="input-text">Password</div>
            {this.state.errors.password && <small>{this.state.errors.password}</small>}
          </label>
        </div>
        <div className="buttons">
          <button className="button">Submit</button>
          <GoogleLogin />
          <SpotifyLogin />
        </div>
      </form>
    );
  }
}

export default Login;
