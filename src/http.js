function parseBody(response) {
  return new Promise((resolve) => {
    let contentType = response.headers.get('Content-Type'),
        jsonContentType = contentType === 'application/json',
        bodyPromise = jsonContentType ? response.json() : response.text();
    bodyPromise.then(body => {
      resolve({url: response.url,
               ok: response.ok,
               status: response.status,
               body: body});
    });
  });
}

export function exec(request) {
  const url = request.url;
  delete request.url;

  if(request.headers) {
    request.headers = new Headers(request.headers);
  }

  return fetch(url, request)
    .then(parseBody);
}
