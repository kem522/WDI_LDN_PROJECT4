import React from 'react';
import axios from 'axios';

class Youtube extends React.Component {
  state = {};

  componentDidMount() {
    axios.get('/api/youtube')
      .then(res => {
        const id = res.data.items[0].id.videoId;
        this.setState({url: `https://www.youtube.com/embed/${id}?autoplay=1` });
      });
  }

  render(){
    return(
      <iframe id="ytplayer" type="text/html" width="640" height="360" src={this.state.url} frameBorder="0"></iframe>
    );
  }
}

export default Youtube;
