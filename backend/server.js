const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..', 'frontend');
const assetRoots = [
  rootDir,
  path.join(__dirname, '..', 'src', 'images'),
  path.join(__dirname, '..', '..', 'images')
];
const port = process.env.PORT || 3000;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4'
};

function resolveFilePath(requestPath) {
  const decodedPath = decodeURIComponent(requestPath || '/');
  const normalized = decodedPath === '/' ? '/index.html' : decodedPath.replace(/^\/+/, '');
  const candidates = [];

  assetRoots.forEach((root) => {
    candidates.push(path.join(root, normalized));
    if (normalized.startsWith('images/')) {
      candidates.push(path.join(root, normalized.replace(/^images\//, '')));
    }
    if (!normalized.startsWith('images/')) {
      candidates.push(path.join(root, 'images', normalized));
    }
  });

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  return null;
}

const server = http.createServer((req, res) => {
  const requestPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = resolveFilePath(requestPath);

  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('File not found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Unable to read file');
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(port, () => {
  console.log(`HiddenGems server running at http://localhost:${port}`);
});
