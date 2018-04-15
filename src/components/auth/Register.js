import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import GoogleLogin from './GoogleLogin';
import Flash from '../../lib/Flash';

class Register extends React.Component {

  state = {
    errors: {},
    birthday: '',
    username: '',
    email: ''
  }

  handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'birthday') value = value.split('-').map(num => parseInt(num, 10));
    const errors = { ...this.state.errors, [name]: '' };
    this.setState({ [name]: value, errors });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/register', this.state)
      .then(res => {
        Auth.setToken(res.data.token);
      })
      .then(() => Flash.setMessage('success', 'Welcome!'))
      .then(() => this.props.history.push('/playlists'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="username">
              <input
                name="username"
                onChange={this.handleChange}
                value={this.state.username}
              />
              <div className="input-text">Username</div>
              {this.state.errors.username && <small>{this.state.errors.username}</small>}
            </label>
          </div>
          <div className="field">
            <label htmlFor="email">
              <input
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
              <div className="input-text">Email</div>
              {this.state.errors.email && <small>{this.state.errors.email}</small>}
            </label>
          </div>

          <div className="field">
            <label htmlFor="birthday">
              <input
                onChange={this.handleChange}
                name="birthday"
                type="date"
              />
              <div className="input-text">Birthday</div>
              <small>We use your birthday to calculate the eras when you create a playlist! </small>
              {this.state.errors.birthday && <small>{this.state.errors.birthday}</small>}
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
          <div className="field">
            <label htmlFor="passwordConfirmation">
              <input
                type="password"
                name="passwordConfirmation"
                onChange={this.handleChange}
              />
              <div className="input-text">Password Confirmation</div>
            </label>
          </div>
          <div className="buttons">
            <button className="button">Submit</button>
          </div>
        </form>

        <GoogleLogin />
      </section>
    );
  }
}

export default Register;
