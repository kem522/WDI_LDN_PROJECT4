import React from 'react';

const GoogleLogin = () => {
  return(
    <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=400334582026-ntl55q3o07v68j85uenlniiqtkg13m86.apps.googleusercontent.com&redirect_uri=http://localhost:8000/&response_type=code&scope=https://www.googleapis.com/auth/youtube profile email">Log in with YouTube</a>
  );
};

export default GoogleLogin;
