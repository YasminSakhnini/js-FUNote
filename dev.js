// ##### SET UP PORTS HERE #####
const ports = {
  frontend: process.env.FRONTENDPORT || 3000,
  backend: process.env.BACKENDPORT || 3001
}

const Bundler = require('parcel-bundler');
const express = require('express');
const proxy = require('http-proxy-middleware');


const app = express();

// Proxying all /api/ routes to api running on another port
app.use('/api/', proxy({
  target: `http://localhost:${ports.backend}/`
}));

// Programmatic bundling instead of CLI usage with parcel
const bundler = new Bundler('src/index.html');
app.use(bundler.middleware());


app.listen(ports.frontend, function () {
  console.log(`Frontend HMR running on ${ports.frontend} and API proxied to ${ports.backend}`)
});