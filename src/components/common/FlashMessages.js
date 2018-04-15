import React from 'react';
import Flash from '../../lib/Flash';

class FlashMessage extends React.Component {

  state = {
    messages: ''
  }

  componentWillUpdate() {
    const messages = Flash.getMessages();

    if(!messages) return false;

    this.setState({ messages });
    Flash.clearMessages();

    setTimeout(() => this.setState({ messages: '' }), 5000);
  }

  render() {
    return (
      <div>
        {this.state.messages && Object.keys(this.state.messages).map(type =>
          <div key={type} className="centered neon">{this.state.messages[type]}</div>
        )}
      </div>
    );
  }
}

export default FlashMessage;
