import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Auth from '../../lib/Auth';

class Index extends React.Component {
    state = {
      songs: [],
      chosenSongs: []
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

    this.setState({ years: years }, () => this.getData());
  }

  componentDidMount() {
    const id = Auth.getPayload().sub;
    axios.get(`/api/users/${id}`)
      .then(user => this.setState({ birthday: user.data.birthday }));
  }

  handleChange = (e) => {
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
    if (!this.state.chosenSongs.includes(e.target.value)) {
      updatedChosenSongs = this.state.chosenSongs.concat(e.target.value);
    } else {
      const index = this.state.chosenSongs.indexOf(e.target.value);
      updatedChosenSongs = [ ...this.state.chosenSongs.slice(0, index), ...this.state.chosenSongs.slice(index + 1)];
    }
    this.setState({ chosenSongs: updatedChosenSongs });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
  }

  render(){
    return(
      <section>
        <form>
          <label className="label" htmlFor="senior">Secondary School</label>
          <input onChange={this.handleChange} className="radio" type="radio" name="era" value="senior" />

          <label className="label" htmlFor="university">University</label>
          <input onChange={this.handleChange} className="radio" type="radio" name="era" value="university" />

          <label className="label" htmlFor="20s">20s</label>
          <input onChange={this.handleChange} className="radio" type="radio" name="era" value="20s" />

          <label className="label" htmlFor="30s">30s</label>
          <input onChange={this.handleChange} className="radio" type="radio" name="era" value="30s" />

          <label className="label" htmlFor="40s">40s</label>
          <input onChange={this.handleChange} className="radio" type="radio" name="era" value="40s" />
        </form>
        <form onSubmit={this.handleSubmit}>
          {this.state.songs.map((songs, i) =>
            <div key={i}>
              <h2 className="subtitle">{this.state.years[i]}</h2>
              {songs.map((song, i) =>
                <div key={i} className="field">
                  <input onChange={this.handleCheck} type="checkbox" value={song.song + ' ' + song.artist}/>
                  <p>{song.song} by {song.artist}</p>
                </div> )}
            </div>
          )}
          <button>Submit</button>
        </form>
      </section>
    );
  }
}

export default Index;
