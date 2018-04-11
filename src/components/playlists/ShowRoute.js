import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

import { Link } from 'react-router-dom';
import Youtube from './Youtube';

class ShowRoute extends React.Component {

  state = {
    playlist: null,
    videoIds: []
  };

  componentDidMount() {
    axios.get(`/api/playlists/${this.props.match.params.id}`)
      .then(res => this.setState({ playlist: res.data }, () => {
        (Auth.getPayload().sub === this.state.playlist.owner._id) ? this.setState({ isOwner: true }) : this.setState({ isOwner: false });

        axios.get('/api/youtube',  {
          params: { songs: this.state.playlist.chosenSongs }
        })
          .then(res => this.setState({ videoIds: res.data }));
      }));
  }

  handleDelete = () => {
    axios.delete(`/api/playlists/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/playlists'));
  }

  handleClick = () => {
    axios.post(`/api/playlists/${this.props.match.params.id}/followers`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
      params: { user: Auth.getPayload().sub }
    });
  }

  handleYoutube = () => {
    const data = {
      snippet: {
        title: this.state.playlist.title,
        description: this.state.playlist.description
      },
      videoIds: this.state.videoIds
    };

    axios.post('/api/youtubeplaylists', data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => console.log(res));
  }

  render() {
    return (
      this.state.playlist ? (
        <div className="container">
          <h1 className="title">{this.state.playlist.title}</h1>
          <h2 className="subtitle">{this.state.playlist.owner.username}</h2>
          <p>{this.state.playlist.description}</p>
          <button onClick={this.handleYoutube}>Youtube</button>
          {!this.state.isOwner && <button onClick={this.handleClick} className="button">Follow</button>}

          <ul>
            {this.state.playlist.chosenSongs.map((song, i) =>
              <li key={i}>
                {song.title} by {song.artist}
                <Youtube id={this.state.videoIds[i]} />{this.state.videoIds[i]}
              </li>
            )}
          </ul>

          {this.state.isOwner && <Link className="button is-primary" to={`/playlists/${this.state.playlist._id}/edit`}>Edit</Link> }
          {' '}
          {this.state.isOwner && <button className="button is-danger" onClick={this.handleDelete}>Delete</button> }
        </div>
      ) : (
        <div className="container">
          <h1 className="title">LOADING</h1>
        </div>
      )
    );
  }
}

export default ShowRoute;
