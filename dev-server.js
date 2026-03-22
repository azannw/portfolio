const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/plain',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];

  // SPA rewrite: /blog/<slug> → /blog/index.html
  if (urlPath.match(/^\/blog\/.+/) && !path.extname(urlPath)) {
    urlPath = '/blog/index.html';
  }

  // Serve index.html for directory paths
  if (urlPath.endsWith('/')) urlPath += 'index.html';

  // For extensionless routes, try .html first, then /index.html
  if (!path.extname(urlPath)) {
    const htmlPath = path.join(ROOT, urlPath + '.html');
    if (fs.existsSync(htmlPath)) {
      urlPath += '.html';
    } else {
      urlPath += '/index.html';
    }
  }

  const filePath = path.join(ROOT, urlPath);
  const ext = path.extname(filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});
