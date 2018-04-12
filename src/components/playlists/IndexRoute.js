import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Search from './Search';

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
    this.setState({ search: e.target.value });
  }

  filterPlaylists = () => {
    const regex = new RegExp(this.state.search, 'i');
    const ordered = _.orderBy(this.state.playlists, ['followers.length'], [this.state.sort]);
    const filtered = _.filter(ordered, (playlist) => regex.test(playlist.title) || playlist.chosenSongs.some(song => regex.test(parseInt(song.year,10))));
    return filtered;
  }

  handleSort = (e) => {
    this.setState({ sort: e.target.value });
  }

  render() {
    return(
      <div className="container" id="index">
        <Search handleChange={this.handleChange} handleSort={this.handleSort} />
        <ul className="columns is-multiline">
          {this.filterPlaylists().map((playlist, i) =>
            <li key={i} className="column is-one-third">
              <Link to={`/playlists/${playlist._id}`}>
                <div className="card">
                  <div className="card-content">
                    <h3 className="title is-4">{playlist.title}</h3>
                    <h4 className="subtitle">{playlist.owner.username}</h4>
                    { playlist.followers.length === 1 && <h4 className="subtitle">{playlist.followers.length} follower</h4>}
                    { playlist.followers.length > 1 && <h4 className="subtitle">{playlist.followers.length} followers</h4>}
                    {playlist.chosenSongs.map((song, i) => <li key={i}>{song.year}</li>)}
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
