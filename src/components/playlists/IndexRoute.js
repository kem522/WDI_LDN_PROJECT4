import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class IndexRoute extends React.Component {
  state = {
    playlists: []
  }

  componentDidMount(){
    axios.get('/api/playlists')
      .then(res => {
        res.data = res.data.filter(playlist => playlist.public);
        this.setState({ playlists: res.data });
      });
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value }, () => console.log(this.state));
  }

  filterPlaylists = () => {
    //make a regex
    const regex = new RegExp(this.state.search, 'i');
    //use _.filter to filter the bangers
    const filtered = _.filter(this.state.playlists, (playlist) => regex.test(playlist.title));
    return filtered;
  }

  render() {
    return(
      <div className="container">
        <form>
          <div className="field">
            <input onChange={this.handleChange} className="input" type="text" name="search" placeholder="Search "/>
          </div>
        </form>
        <ul className="columns is-multiline">
          {this.filterPlaylists().map((playlist, i) =>
            <li key={i} className="column is-one-third">
              <Link to={`/playlists/${playlist._id}`}>
                <div className="card">
                  <div className="card-content">
                    <h3 className="title is-4">{playlist.title}</h3>
                    {/* <h4 className="subtitle">{.artist}</h4> */}
                  </div>
                </div>
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default IndexRoute;
