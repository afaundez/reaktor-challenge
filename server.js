const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const port = 9000;
http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  const parsedUrl = url.parse(req.url);
  let pathname = `.${parsedUrl.pathname}`;
  const ext = path.parse(pathname).ext;
  const map = {
    '.css': 'text/css',
    '.jsx': 'text/jsx',
    '.html': 'text/html',
    '.js': 'text/javascript'
  };
  fs.exists(pathname, exist => {
    if (!exist) {
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }
    fs.readFile(pathname, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.setHeader('Content-type', map[ext]);
        res.end(data);
      }
    });
  });
}).listen(parseInt(port));
console.log(`Serving at port ${port}`);
