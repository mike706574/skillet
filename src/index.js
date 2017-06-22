import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Client from './Client';

const host = 'localhost:8001';
const username = 'mike';
const password = 'rocket';

function init(client) {
  console.log(client);
  const eventSocket = client.eventSocket();
  eventSocket.onmessage = message => console.log(message);
  console.log("Connected!");
}

function fail(error) {
  console.log("ERROR: " + error);
}

Client.authenticate(host, username, password)
  .then(init, fail);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
