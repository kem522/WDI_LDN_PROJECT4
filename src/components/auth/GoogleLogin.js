import React from 'react';

const GoogleLogin = () => {
  return(
    <a className="button" href="https://accounts.google.com/o/oauth2/v2/auth?client_id=400334582026-ntl55q3o07v68j85uenlniiqtkg13m86.apps.googleusercontent.com&redirect_uri=https://shielded-hamlet-82582.herokuapp.com/&response_type=code&scope=https://www.googleapis.com/auth/youtube profile email"><span className="ytRed"><i className="fab fa-google"></i></span> Log in with Google</a>
  );
};

export default GoogleLogin;
