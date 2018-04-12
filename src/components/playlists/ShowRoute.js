import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

import { Link } from 'react-router-dom';
import Youtube from './Youtube';

class ShowRoute extends React.Component {

  state = {
    playlist: null,
    videoIds: [],
    modalOpen: false,
    currentVideo: ''
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
    if (this.state.playlist) console.log(this.state.playlist.chosenSongs);
    return (
      this.state.playlist ? (
        <div className="container">
          {this.state.modalOpen && <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-content">
              <Youtube width="640" height="360" id={this.state.currentVideo} />
            </div>
            <button className="modal-close is-large" onClick={() => this.setState({ modalOpen: false })}>x</button>
          </div>
          }
          <h1 className="title"><u>{this.state.playlist.title}</u></h1>
          <h2 className="subtitle">{this.state.playlist.owner.username}</h2>
          <p>{this.state.playlist.description}</p>
          <button className="button largeBtn" onClick={this.handleYoutube}><span className="ytRed"><i className="fab fa-youtube"></i></span> Make this a <span className="ytRed">YouTube</span> Playlist!</button>
          {!this.state.isOwner && <button onClick={this.handleClick} className="button">Follow</button>}

          <ul className="overflow flexy no-column jukebox">
            {this.state.playlist.chosenSongs.map((song, i) =>
              <li key={i} className="wrapper">
                <div onClick={() => this.setState({ modalOpen: true, currentVideo: this.state.videoIds[i]})} className="song large" id={this.state.videoIds[i]}>
                  <p>{song.title} by {song.artist}</p>
                  <Youtube width="100%" height="100%" onClick={() => this.setState({ modalOpen: true })} id={this.state.videoIds[i]} />
                </div>
              </li>
            )}
          </ul>

          {this.state.isOwner && <Link className="button" to={`/playlists/${this.state.playlist._id}/edit`}>Edit</Link> }
          {' '}
          {this.state.isOwner && <button className="button" onClick={this.handleDelete}>Delete</button> }
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
