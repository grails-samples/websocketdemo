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
    const messageHandler = message =>  this.updateMessages(JSON.parse(message.body));
    client.connect({}, () => client.subscribe("/topic/message", messageHandler));
  }

  addMessage(event) {
    event.preventDefault();

    let message = this.state.newMessage;
    client.send("/app/message", {}, JSON.stringify(message));
  }

  updateNewMessage(event) {
    this.setState({newMessage: event.target.value});
  }

  updateMessages(message) {
    let state = this.state;
    state.messages.push(message);

    this.setState(state);
  }

  render() {
    const messages = this.state.messages.map((m, idx) => <li key={idx} className="message-content">{m}</li>);

    return <div className="message-container">

      <form onSubmit={this.addMessage}>
        <div className="form-group">
          <div className="input-group">

            <input type="text" onChange={this.updateNewMessage} placeholder="Enter Message Here"/>
          </div>
        </div>

        <input type="submit" className="btn btn-primary" value='Send Message' />

      </form>

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