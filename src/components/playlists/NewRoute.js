import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class NewRoute extends React.Component {
    state = {
      songs: [],
      chosenSongs: [],
      public: true,
      owner: Auth.getPayload().sub,
      title: '',
      description: '',
      years: [],
      errors: {}
    }

  getData = () => {
    axios.get('/api/wiki', {
      params: { years: this.state.years }
    })
      .then(res => this.setState({ songs: res.data }));
  }

  setYears = (years) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    if (years.every(year => year >= currentYear)) {
      this.setState({ songs: [] });
      return null;
    } else if (years.some(year => year >= currentYear)) {
      const index = years.findIndex(num => num >= currentYear);
      years = years.slice(0,index);
    }
    this.setState({ years: years }, this.getData);
  }

  componentDidMount() {
    const id = Auth.getPayload().sub;
    axios.get(`/api/users/${id}`)
      .then(user => {
        if (user.data.birthday.length === 0) {
          Flash.setMessage('danger', 'Please add a birthday to your profile to create a playlist');
          this.props.history.push('/profile');
        } else {
          this.setState({ birthday: user.data.birthday });
        }
      });
  }

  handleClick = (e) => {
    let years = [];
    const birthYear = parseInt(this.state.birthday[0],10);
    switch(e.target.value){
      case 'senior':
        years = _.range(birthYear + 11, birthYear + 17, 1);
        break;
      case 'university':
        years = _.range(birthYear + 18, birthYear + 22, 1);
        break;
      case '20s':
        years = _.range(birthYear + 20, birthYear + 30, 1);
        break;
      case '30s':
        years = _.range(birthYear + 30, birthYear + 40, 1);
        break;
      case '40s':
        years = _.range(birthYear + 40, birthYear + 50, 1);
        break;
      default:
        console.log('Something went wrong');
    }
    this.setYears(years);
  }

  handleCheck = (e) => {
    let updatedChosenSongs = [];
    const song = {
      artist: e.target.name,
      title: e.target.value
    };
    if (this.state.chosenSongs.findIndex(x => x.title === song.title) === -1) {
      updatedChosenSongs = this.state.chosenSongs.concat(song);
    } else {
      const index = this.state.chosenSongs.findIndex(x => x.title === song.title);
      updatedChosenSongs = [ ...this.state.chosenSongs.slice(0, index), ...this.state.chosenSongs.slice(index + 1)];
    }
    this.setState({ chosenSongs: updatedChosenSongs });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/playlists', this.state)
      .then(() => this.props.history.push('/playlists'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    const errors = { ...this.state.errors, [name]: '' };
    if (name === 'public') value = !this.state.public;
    this.setState({ [name]: value, errors });
  }

  render(){
    return(
      <section>
        <div className="flexy">
          <button className="button" onClick={this.handleClick} type="radio" name="era" value="senior">Secondary School</button>
          <button className="button" onClick={this.handleClick} type="radio" name="era" value="university">University</button>
          <button className="button" onClick={this.handleClick} type="radio" name="era" value="20s">20s</button>
          <button className="button" onClick={this.handleClick} type="radio" name="era" value="30s">30s</button>
          <button className="button" onClick={this.handleClick} type="radio" name="era" value="40s">40s</button>
        </div>

        <hr />
        {this.state.years.length === 0 && <p>Select an era above to get some tunes!</p>}
        <form onSubmit={this.handleSubmit}>
          {this.state.songs.map((songs, i) =>
            <div key={i}  className="gallery">
              <h2 className="subtitle">{this.state.years[i]}</h2>
              <div className="overflow flexy">
                {songs.map((song, i) =>
                  <div key={i} className="field song">
                    <input className="regular-checkbox" onChange={this.handleCheck} type="checkbox" name={song.artist} value={song.title}/>
                    <p>{song.title} by {song.artist}</p>
                  </div> )}
              </div>
            </div>
          )}

          <hr />

          <div className="field">
            <label className="label" htmlFor="title">Name your playlist!</label>
            <input onChange={this.handleChange} className="input" type="text" name="title" />
            {this.state.errors.title && <small>{this.state.errors.title}</small>}
          </div>

          <div className="field">
            <label className="label" htmlFor="description">Description</label>
            <textarea onChange={this.handleChange} className="textarea" name="description"></textarea>
          </div>

          <div className="field">
            <label className="label" htmlFor="public">Make it private?</label>
            <input onChange={this.handleChange} className="checkbox" type="checkbox" name="private" />
          </div>

          <button className="button btn-halo">Submit</button>
        </form>
      </section>
    );
  }
}

export default NewRoute;
