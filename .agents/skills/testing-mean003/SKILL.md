---
name: testing-mean003
description: Test the mean003 JavaScript dev environment app end-to-end. Use when verifying that the Express/Webpack/Babel dev server starts and serves content correctly.
---

# Testing mean003

## Overview
mean003 is a JavaScript development environment starter kit using Express, Webpack 4, Babel, ESLint, and Mocha. The app serves a simple "Hello World!" page at localhost:3000.

## Prerequisites
- Node.js (v10+)
- npm

## Setup
```bash
cd /home/ubuntu/repos/mean003
npm install
```

## Running the App
```bash
npm start
```
This runs three processes in parallel:
- Express dev server with Webpack on port 3000
- ESLint in watch mode
- Mocha tests in watch mode

## Node.js 17+ Compatibility
Webpack 4 requires `--openssl-legacy-provider` on Node.js 17+. This is already configured in the `open:src` script via `cross-env`. If Webpack throws `ERR_OSSL_EVP_UNSUPPORTED`, verify that the `open:src` script in package.json includes `cross-env NODE_OPTIONS=--openssl-legacy-provider`.

## Key Test Assertions
1. **No startup errors**: `npm start` should output "Starting app in dev mode...", "Compiled successfully", "2 passing", and "Clean" (ESLint)
2. **Page renders**: http://localhost:3000 should show an h1 with "Hello World!"
3. **Bundle executes**: Browser console should log "I would pay $1,000.00 for this awesome course!"
4. **Tests pass**: `npm test` should report 2 passing with exit code 0

## Available Commands
| Command | Description |
|---|---|
| `npm start` | Dev server + linter + test watcher |
| `npm run open:src` | Dev server only |
| `npm run lint` | ESLint |
| `npm test` | Mocha tests |

## Devin Secrets Needed
None — this app has no external service dependencies.
