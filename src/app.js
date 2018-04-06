import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// import Youtube from './components/Youtube';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      year: 2000
    };

    this.handleChange = this.handleChange.bind(this);
  }

  getData() {
    axios.get('/api/wiki', {
      params: { year: this.state.year }
    })
      .then(res => {
        this.setState({ songs: res.data }, () => console.log(this.state));
      });
  }

  componentDidMount() {
    this.getData();
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({ year: e.target.value }, () => this.getData());

  }

  render() {
    return (
      <section>
        <h1>WDI32 Project 4</h1>
        <form onSubmit={this.handleSubmit}>
          <select id="year" onChange={this.handleChange}>
            <option>2001</option>
            <option>1980</option>
            <option>2015</option>
          </select>
          <button>Submit</button>
        </form>
        <ul>
          {this.state.songs.map((song,i) => <li key={i}>{song.song}</li>)}
        </ul>
      </section>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
