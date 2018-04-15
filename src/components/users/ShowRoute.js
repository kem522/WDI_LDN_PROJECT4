import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

class Profile extends React.Component{
  state = {
    user: {
      playlists: [],
      followedPlaylists: []
    }
  };

  componentDidMount(){
    axios.get(`/api/users/${Auth.getPayload().sub}`)
      .then(res => this.setState({ user: res.data }));
  }

  render(){
    return(
      <section>
        <h1 className="title neon">{this.state.user.username}</h1>
        <Link className="button" id="smallBtn" to={`/users/${this.state.user._id}/edit`}>Edit</Link>
        <h2 className="subtitle">Your Playlists <i className="fas fa-caret-down"></i></h2>
        <ul>
          {this.state.user.playlists.map((playlist, i) =>
            <div key={i} >
              <Link className="subtitle" to={`/playlists/${playlist._id}`} >{playlist.title}</Link>
              <ul className="overflow flexy no-column jukebox">
                {playlist.chosenSongs.map((song, i) =>
                  <li key={i} className="field wrapper">
                    <div className="song">
                      <p><span className="songTitle">{song.title}</span>
                        <br/>
                      by {song.artist}</p>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          )}
        </ul>
        <hr />
        <h2 className="subtitle">Followed Playlists <i className="fas fa-caret-down"></i></h2>
        <ul>
          {this.state.user.followedPlaylists.map((playlist, i) =>
            <div key={i} >
              <Link className="subtitle" to={`/playlists/${playlist._id}`} >{playlist.title}</Link>
              <ul className="overflow flexy no-column jukebox">
                {playlist.chosenSongs.map((song, i) =>
                  <li key={i} className="field wrapper">
                    <div className="song">
                      <p>{song.title}
                        <br/>
                      by {song.artist}</p>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          )}
        </ul>
      </section>
    );
  }
}

export default Profile;
