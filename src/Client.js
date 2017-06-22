import * as http from './http';

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

  eventSocket() {
    const url = 'ws://' + this.host + '/api/websocket?token=' + this.token;
    return new WebSocket(url);
  }

  categorySocket(category) {
    const url = 'ws://' + this.host + '/api/websocket/' + category + '?token=' + this.token;
    return new WebSocket(url);
  }
}

export default Client;
