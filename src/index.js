import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as http from './http';

const tokenUrl = 'http://localhost:8001/api/tokens';

function foo(response) {
  console.log(response);
}
function authenticate(username, password) {
  http.exec({url: tokenUrl,
             method: 'POST',
             mode: 'cors',
             headers: {'Content-Type': 'application/json',
                       'Accept': 'text/plain'},
             body: JSON.stringify({'bottle/username': username,
                                   'bottle/password': password})})
    .then(foo);
}

authenticate('mike', 'rocket');
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
