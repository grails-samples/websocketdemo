import React from 'react';
import ReactDOM from 'react-dom';

/* global SockJS, Stomp */

const socket = new SockJS('/stomp');
const client = Stomp.over(socket);

class App extends React.Component {

  constructor() {
    super();

    this.updateNewMessage = this.updateNewMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);

    this.state = {
      messages: [],
      newMessage: ''
    };

    this.socketSetup();
  }

  socketSetup() {
    console.log('socketSetup...');

    const messageHandler = message => {
      console.log('got message!');
      console.log(message.body);
      this.updateMessages(JSON.parse(message.body));
    };

    client.connect({}, function () {
      client.subscribe("/topic/message", messageHandler);
    });
  }

  addMessage() {
    console.log('addMessage: ' + this.state.newMessage);
    let message = this.state.newMessage;
    client.send("/app/message", {}, JSON.stringify(message));
  }

  updateNewMessage(event) {
    console.log('updateNewMessage: ' + event.target.value);
    let state = this.state;
    state.newMessage = event.target.value;
    this.setState(state);
  }

  updateMessages(message) {
    console.log('updateMessages: ' + message);

    let state = this.state;
    state.messages.push(message);

    this.setState(state);
  }

  render() {
    const messages = this.state.messages.map((m, idx) => <li key={idx} className="message-content">{m}</li>);

    return <div className="message-container">
      <div className="form-group">
        <div className="input-group">

          <input type="text" onChange={this.updateNewMessage} placeholder="Enter Message Here"/>
        </div>
      </div>

      <button id="messageButton" className="btn btn-primary" onClick={this.addMessage}>Send Message</button>

      <div id="messageList">
        <h2>Message:</h2>
        <ul className="messages">
          {messages}
        </ul>
      </div>
    </div>;
  }

}

ReactDOM.render(<App/>, document.getElementById('app'));