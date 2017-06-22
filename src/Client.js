import * as http from './http';

const tokenUrl = 'http://localhost:8001/api/tokens';

class Client {
  constructor(host, credentials) {
    this.host = host;
    this.username = credentials.username;
    this.token = credentials.token;
  }

  static authenticate(host, username, password) {
    return new Promise((resolve, reject) => {
      const url = 'http://' + host + '/api/tokens';
      http.exec({url: url,
                 method: 'POST',
                 mode: 'cors',
                 headers: {'Content-Type': 'application/json',
                           'Accept': 'text/plain'},
                 body: JSON.stringify({'bottle/username': username,
                                       'bottle/password': password})})
        .then(response => {
          if(response.ok) {
            const client = new Client(host,
                                      {username: username,
                                       token: response.body});
            resolve(client);
          }
          reject(response.body);
        });
    });
  }

  websocket() {
    const url = 'ws://' + host + '/api/websocket';
    new WebSocket()
  }
}
export default Client;
