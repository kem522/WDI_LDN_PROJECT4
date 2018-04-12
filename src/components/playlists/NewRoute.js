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
      errors: {},
      disabled: true
    }

  getData = () => {
    axios.get('/api/wiki', {
      params: { years: this.state.years }
    })
      .then(res => this.setState({ songs: res.data }));
  }

  setYears = (years) => {
    if (years.every(year => year >= this.state.currentYear)) {
      this.setState({ songs: [] });
      return null;
    } else if (years.some(year => year >= this.state.currentYear)) {
      const index = years.findIndex(num => num >= this.state.currentYear);
      years = years.slice(0,index);
    }
    this.setState({ years: years, chosenSongs: [] }, this.getData);
  }

  componentDidMount() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    this.setState({ currentYear: currentYear });
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

  handleCheck = (song) => {
    let updatedChosenSongs = [];
    song = {
      artist: song.artist,
      title: song.title,
      year: song.year
    };
    if (this.state.chosenSongs.findIndex(x => x.title === song.title) === -1) {
      updatedChosenSongs = this.state.chosenSongs.concat(song);
    } else {
      const index = this.state.chosenSongs.findIndex(x => x.title === song.title);
      updatedChosenSongs = [ ...this.state.chosenSongs.slice(0, index), ...this.state.chosenSongs.slice(index + 1)];
    }
    this.setState({ chosenSongs: updatedChosenSongs }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/playlists', this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
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

  handleRange = (e) => {
    if (e.target.name === 'start') this.setState({ start: e.target.value, disabled: false, years: [], chosenSongs: [] });
    if (e.target.name === 'end') {
      const years =  _.range(this.state.start, e.target.value, 1);
      this.setYears(years);
    }
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
        <div className="centered">
          <p>or choose a range of years:</p>
          <select className="select is-medium is-rounded" onChange={this.handleRange} name="start">
            <option value="">Start ...</option>
            {_.range(1950, this.state.currentYear, 1).map((year, i) =>
              <option key={i} value={year}>{year}</option>
            )}
          </select>
          <select onChange={this.handleRange} className="select is-medium is-rounded" name="end" disabled={this.state.disabled}>
            <option value="">End ...</option>
            {_.range(this.state.start, this.state.currentYear, 1).map((year, i) =>
              <option key={i} value={year}>{year}</option>
            )}
          </select>
        </div>
        <hr />
        {this.state.songs.length === 0 && <p className="centered">Choose an era above to get some songs!</p>}
        <form onSubmit={this.handleSubmit}>
          {this.state.songs.map((songs, i) =>
            <div key={i}>
              <h2 className="subtitle">{this.state.years[i]}</h2>
              <div className="overflow flexy no-column jukebox">
                {songs.map((song, i) =>
                  <div key={i} className="field wrapper">
                    <div className="song">
                      <input className="checkbox" onChange={() => this.handleCheck(song)} type="checkbox" />
                      <p>{song.title}
                        <br/>
                      by {song.artist}</p>
                    </div>
                  </div> )}
              </div>
            </div>
          )}

          <hr />

          <div className="field">
            <label className="label" htmlFor="title">
              <input onChange={this.handleChange} className="input wider" type="text" name="title" />
              <div className="input-text">Name your playlist!</div>
              {this.state.errors.title && <small>{this.state.errors.title}</small>}
            </label>
          </div>

          <div className="field">
            <label className="label" htmlFor="description">
              <textarea onChange={this.handleChange} className="textarea" name="description"></textarea>
              <div className="input-text">Description</div>
            </label>
          </div>



          <div className="field">
            <p className="label inline" htmlFor="public">Make it private?</p>
            <input onChange={this.handleChange} className="checkbox" type="checkbox" name="private" />
          </div>

          <button className="button btn-halo">Submit</button>


        </form>
      </section>
    );
  }
}

export default NewRoute;
