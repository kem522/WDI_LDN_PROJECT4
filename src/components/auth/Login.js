import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import GoogleLogin from './GoogleLogin';

class Login extends React.Component{

  state = {}

  handleChange = (e) => {
    const { name, value } = e.target;
    // const errors = { ...this.state.errors, [name]: '' };
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', this.state)
      .then(res => {
        Auth.setToken(res.data.token);
      })
      .then(() => this.props.history.push('/playlists'));
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
          </label>
        </div>
        <button className="button">Submit</button>
        <GoogleLogin />
      </form>
    );
  }
}

export default Login;
