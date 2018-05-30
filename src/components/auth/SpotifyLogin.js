import React from 'react';

const SpotifyLogin = () => {
  return(
    <a className="button" href="https://accounts.spotify.com/authorize?client_id=59cafa29eb524521ab3193fae3c08cb7&redirect_uri=http://localhost:8000/&response_type=code&state=123&scope=user-read-email user-read-birthdate playlist-modify-public">Log in with Spotify</a>
  );
};

export default SpotifyLogin;
