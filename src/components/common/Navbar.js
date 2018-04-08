import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

class Navbar extends React.Component {

  state = {
    navIsOpen: false
  }

  handleToggle = () => {
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }

  componentWillUpdate() {
    this.state.navIsOpen && this.setState({ navIsOpen: false  });
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.push('/');
  }

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            WDI32 Bangers
          </Link>
          <div className={`navbar-burger ${this.state.navIsOpen? 'is-active' : ''}`}
            onClick={this.handleToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={`navbar-menu ${this.state.navIsOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">

            {Auth.isAuthenticated() ?
              <div>
                {/* <Link className="navbar-item" to="/bangers/new">New Playlist</Link> */}
                <a className="navbar-item" onClick={this.handleLogout}>Logout</a>
              </div>
              :
              <div>
                <Link className="navbar-item" to="/login">Login</Link>
                <Link className="navbar-item" to="/register">Register</Link>
              </div>
            }
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
