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

- [Node.js](https://nodejs.org/) (v10 or higher)
- npm (comes with Node.js)

> **Note:** On Node.js 17+, the `--openssl-legacy-provider` flag is required for Webpack 4. This is already configured in the npm scripts.

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set the MongoDB connection string:**

   ```bash
   export MONGODB_URI="mongodb+srv://<user>:<password>@<cluster>/?appName=Cluster0"
   ```

3. **Seed user passwords** (generates a unique random password per user and stores the bcrypt hash):

   ```bash
   npx babel-node buildScripts/seedPasswords.js > credentials.csv
   ```

   The plaintext credentials are printed to stdout in CSV format (`email,name,password`). Redirect to a file to save them. Only the bcrypt hashes are stored in the database.

4. **Start the development server:**

   ```bash
   npm start
   ```

   This runs the following in parallel:
   - Opens the app at [http://localhost:3000](http://localhost:3000)
   - Starts ESLint in watch mode
   - Starts Mocha tests in watch mode

5. **Run linting manually:**

   ```bash
   npm run lint
   ```

6. **Run tests manually:**

   ```bash
   npm test
   ```

## Login Credentials

After running the seed script, each of the 186 users in `sample_mflix.users` has a unique random password. Check your `credentials.csv` output file for the full list. Example entries:

| Email | Name |
|---|---|
| `sean_bean@gameofthron.es` | Ned Stark |
| `lena_headey@gameofthron.es` | Cersei Lannister |
| `emilia_clarke@gameofthron.es` | Daenerys Targaryen |
| `kit_harington@gameofthron.es` | Jon Snow |

> **Note:** Run the seed script again at any time to regenerate all passwords. The previous passwords will be overwritten.

## Password Hashing Methodology

This application uses **bcrypt** for password hashing, implemented via the `bcryptjs` library.

| Property | Value |
|---|---|
| **Algorithm** | bcrypt (`$2b$` prefix) |
| **Cost factor** | 12 rounds (2^12 = 4,096 iterations) |
| **Salt** | Unique 128-bit salt auto-generated per hash |
| **Hash output** | 60 characters: `$2b$12$<22-char salt><31-char hash>` |
| **Password generation** | `crypto.randomBytes(12)` → base64 → 16-character string |
| **CSPRNG** | Node.js `crypto` module (cryptographically secure) |

### Why bcrypt?

- **Purpose-built for passwords** — unlike SHA-256 or MD5, bcrypt is intentionally slow to resist brute-force attacks
- **Built-in salt** — each hash includes a unique random salt, preventing rainbow table attacks
- **Tunable cost factor** — the work factor can be increased as hardware improves (currently set to 12 rounds)
- **Constant-time comparison** — `bcrypt.compare()` mitigates timing attacks

### How it works

1. The seed script generates a 16-character random password per user using `crypto.randomBytes()` (CSPRNG)
2. Each password is hashed with `bcrypt.hash(password, 12)` — bcrypt auto-generates a unique salt
3. Only the 60-character hash string is stored in the `password` field of `sample_mflix.users`
4. At login, `bcrypt.compare(inputPassword, storedHash)` verifies the password without ever decrypting the hash

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
