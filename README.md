# Parcel + Express + Babel + Proxy + API backend in one swoop!
Simple HMR devserver that proxies /api/ calls to backend. Ports 3000 + 3001 are used by default. SASS compilation, ES6 classes and async included via Babel runtime (see .babelrc for loaded plugin).

# First run
Parcel will fetch necessary babel runtimes for async functions (this is not built into Parcel from the start)

# Not for production!
This is only for fast prototyping. It runs parcel-bundler programmatically and the backend is just ran with nodemon for quick reload upon changes. When deploying one needs to take care of proxying since the Parcel dev server is executed in dev.js (which is only needed locally)

# This is just a boilerplate..
To get going quickly, clone this repo and get crackin'!
Some example code is already present and two fetch calls are being made. Their responses are logged to the console.

# How to use:
- npm install
- npm run dev (boots up devserver and backend api on 3000/3001)
Change ports in ./dev.js if needed