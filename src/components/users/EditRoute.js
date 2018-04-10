import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Form from './Form';

class EditRoute extends React.Component {

  state = {}

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/users/${this.props.match.params.id}`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push(`/users/${this.props.match.params.id}`));
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState(res.data));
  }

  render() {
    return (
      <Form handleChange={this.handleChange} handleSubmit={this.handleSubmit} data={this.state}/>
    );
  }
}

export default EditRoute;
