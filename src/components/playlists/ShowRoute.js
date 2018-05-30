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
    currentVideo: '',
    youtubeSuccess: false,
    followed: false
  };

  componentDidMount() {
    axios.get(`/api/playlists/${this.props.match.params.id}`)
      .then(res => this.setState({ playlist: res.data }, () => {
        (Auth.getPayload().sub === this.state.playlist.owner._id) ? this.setState({ isOwner: true }) : this.setState({ isOwner: false });

        if (this.state.playlist.followers.includes(Auth.getPayload().sub)) this.setState({ followed: true});

        axios.get('/api/youtube',  {
          params: { songs: this.state.playlist.chosenSongs }
        })
          .then(res => this.setState({ videoIds: res.data }));
      }));

    axios.get(`/api/users/${Auth.getPayload().sub}`)
      .then(res => {
        this.setState({
          googleUser: res.data.googleId,
          spotifyUser: res.data.spotifyId
        });
      });

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
      videoIds: this.state.videoIds.filter(video => video !== null)
    };

    axios.post('/api/youtubeplaylists', data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        if (res.status === 200) this.setState({ youtubeSuccess: true });
      });
  }

  handleSpotify = () => {
    const data = {
      playlist: {
        name: this.state.playlist.title,
        description: this.state.playlist.description
      }
    };

    axios.post('/api/spotifyplaylists', data, {
      headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
    })
      .then(res => console.log(res));

  }


  render() {
    return (
      this.state.playlist ? (
        <div className="container">
          {this.state.modalOpen && <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-content">
              { this.state.currentVideo !== null  && <Youtube width="640" height="360" id={this.state.currentVideo} />}
              { this.state.currentVideo === null && <h2 className="subtitle">Sorry! We couldn&apos;t find a video for this throwback :(</h2>}
            </div>
            <button className="modal-close is-large" onClick={() => this.setState({ modalOpen: false })}>x</button>
          </div>
          }
          <h1 className="title"><u>{this.state.playlist.title}</u></h1>
          <h2 className="subtitle">{this.state.playlist.owner.username}</h2>
          {this.state.isOwner && <Link className="button smallBtn" to={`/playlists/${this.state.playlist._id}/edit`}>Edit</Link> }
          {' '}
          {this.state.isOwner && <button className="button smallBtn" onClick={this.handleDelete}>Delete</button> }
          <p>{this.state.playlist.description}</p>
          <p><small><i>Click on a song to see the video!</i></small></p>
          <ul className="overflow flexy no-column jukebox">
            {this.state.playlist.chosenSongs.map((song, i) =>
              <li key={i} className="wrapper">
                <div onClick={() => this.setState({ modalOpen: true, currentVideo: this.state.videoIds[i]})} className="song large" id={this.state.videoIds[i]}>
                  <p><span className="songTitle">{song.title}</span> <br /> by  <br />{song.artist}</p>
                </div>
              </li>
            )}
          </ul>

          { !this.state.googleUser && <p>Sign into Nostalgiafy with Google to create this playlist on your YouTube channel!</p>}
          { this.state.googleUser && !this.state.youtubeSuccess && Auth.isAuthenticated && <button className="button largeBtn" onClick={this.handleYoutube}><span className="ytRed"><i className="fab fa-youtube"></i></span> Make this a <span className="ytRed">YouTube</span> Playlist!</button>}
          { this.state.youtubeSuccess && <button className="button largeBtn" onClick={this.handleYoutube}><span className="ytRed"><i className="fab fa-youtube"></i></span> You got it!</button>}
          { this.state.spotifyUser && Auth.isAuthenticated && <button className="button largeBtn" onClick={this.handleSpotify}>Make this a Spotify Playlist!</button>}
          {!this.state.isOwner && Auth.isAuthenticated && !this.state.followed && <button onClick={this.handleClick} className="button">Follow</button>}

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
