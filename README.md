# mean003

A JavaScript development environment starter kit built on the MEAN stack toolchain (Express, Webpack, Babel, Mocha). This project provides a preconfigured setup for building web applications with ES6+ support, hot-reloading, linting, automated testing, and production bundling.

## What It Does

- Serves a simple web application using **Express** on port 3000
- Bundles JavaScript and CSS with **Webpack** (dev and production configs)
- Transpiles modern ES6+ syntax with **Babel**
- Lints code with **ESLint** (with watch mode)
- Runs unit tests with **Mocha** and **Chai** (with watch mode)
- Supports sharing your local dev server via **localtunnel**
- Supports deployment to **Surge.sh** for static hosting

## Prerequisites

- [Node.js](https://nodejs.org/) (v10 or higher recommended)
- npm (comes with Node.js)

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm start
   ```

   This runs the following in parallel:
   - Opens the app at [http://localhost:3000](http://localhost:3000)
   - Starts ESLint in watch mode
   - Starts Mocha tests in watch mode

3. **Run linting manually:**

   ```bash
   npm run lint
   ```

4. **Run tests manually:**

   ```bash
   npm test
   ```

## Available Scripts

| Script | Description |
|---|---|
| `npm start` | Start dev server, linter, and test watcher in parallel |
| `npm run open:src` | Start only the Express dev server with Webpack |
| `npm run lint` | Run ESLint on source and build scripts |
| `npm run lint:watch` | Run ESLint in watch mode |
| `npm test` | Run Mocha tests |
| `npm run test:watch` | Run Mocha tests in watch mode |
| `npm run share` | Start dev server and expose it via localtunnel |
| `npm run surge` | Deploy the `src` directory to Surge.sh |
| `npm run deploy` | Start dev server and deploy to Surge.sh in parallel |

## Project Structure

```
mean003/
  buildScripts/       # Build and dev server scripts
    srcServer.js      # Express dev server with Webpack middleware
    distServer.js     # Express production server
    build.js          # Production build script
    startMessage.js   # Startup console message
    testSetup.js      # Mocha/Babel test configuration
    generateMockData.js
    mockDataSchema.js
  src/                # Application source code
    index.html        # Main HTML page
    index.js          # Application entry point
    index.css         # Global styles
    index.test.js     # Unit tests
    api/              # API-related modules
      db.json         # Mock database
  webpack.config.dev.js   # Webpack development configuration
  webpack.config.prod.js  # Webpack production configuration
  package.json
```

## License

MIT License - Copyright (c) 2020 Aaron Balaster
