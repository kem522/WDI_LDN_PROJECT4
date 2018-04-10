import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Form from '../users/Form';

class Register extends React.Component {

  state = {}

  handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'birthday') value = value.split('-').map(num => parseInt(num, 10));
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/register', this.state)
      .then(res => {
        Auth.setToken(res.data.token);
      })
      .then(() => this.props.history.push('/playlists'));
  }

  render() {
    return (
      <Form handleChange={this.handleChange} handleSubmit={this.handleSubmit} data={this.state}/>
    );
  }
}

export default Register;
