import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Client from './Client';

function init(client) {

  console.log(client);
}

function fail(error) {
  console.log("ERROR: " + error);
}

Client.authenticate('mike', 'rocket')
  .then(init, fail);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
