import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class Profile extends React.Component{
  state = {
    user: {}
  };

  componentDidMount(){
    axios.get(`/api/users/${Auth.getPayload().sub}`)
      .then(res => this.setState({ user: res.data }, () => console.log(this.state)));
  }

  render(){
    return(
      <section>
        <h1>{this.state.user.username}</h1>
        {/* <ul>
          {this.state.user.playlists.map((playlist, i) =>
            <li key={i}>{playlist.title}</li>
          )}
        </ul> */}
      </section>
    );
  }
}

export default Profile;
