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
        <h1>{this.state.user.username}</h1>
        <Link className="button is-primary" to={`/users/${this.state.user._id}/edit`}>Edit</Link>
        <ul>
          {this.state.user.playlists.map((playlist, i) =>
            <Link to={`/playlists/${playlist._id}`} key={i}>{playlist.title}</Link>
          )}
        </ul>
      </section>
    );
  }
}

export default Profile;
