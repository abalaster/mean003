---
name: testing-mean003
description: Test the mean003 MEAN stack web app end-to-end. Use when verifying login, navigation, MongoDB connectivity, or page rendering changes.
---

# Testing mean003 Web App

## Prerequisites

- Node.js v22+ installed
- `MONGODB_URI` environment variable set to the MongoDB Atlas connection string

## Devin Secrets Needed

- `MONGODB_URI` — MongoDB Atlas connection string (e.g. `mongodb+srv://user:pass@cluster.mongodb.net/`)

## Running the App

```bash
cd /home/ubuntu/repos/mean003
npm install
MONGODB_URI="$MONGODB_URI" npm start
```

The app runs on `localhost:3000`. It will start even without MongoDB (with a warning), but login/API features require a live connection.

## Node.js Compatibility

Webpack 4 requires `--openssl-legacy-provider` on Node 17+. This is already configured in the `open:src` script via `cross-env`. If you see `ERR_OSSL_EVP_UNSUPPORTED`, verify the flag is present in `package.json`.

## Linting and Tests

```bash
npm run lint   # ESLint — should have 0 errors (warnings for console.log are OK)
npm test       # Mocha — 2 tests should pass
```

ESLint is configured for ecmaVersion 8 (ES2017) to support async/await.

## Testing Login Flow

The app authenticates against `sample_mflix.users` collection using bcrypt. The existing users have unknown plaintext passwords, so create a test user:

```bash
node -e "
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
async function main() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('sample_mflix');
  const hash = await bcrypt.hash('testpass123', 12);
  await db.collection('users').insertOne({ name: 'Test User', email: 'test@mean003.com', password: hash });
  console.log('Test user created');
  await client.close();
}
main();
"
```

Then test:
1. Navigate to `localhost:3000/profile` — should show "You are not logged in."
2. Go to `localhost:3000/login` — enter wrong credentials — should show red "Invalid email or password"
3. Enter `test@mean003.com` / `testpass123` — should redirect to `/profile` with name and email
4. Click Logout — should redirect to `/login`, profile should revert to "not logged in"

Clean up the test user after:

```bash
node -e "
const { MongoClient } = require('mongodb');
async function main() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  await client.db('sample_mflix').collection('users').deleteOne({ email: 'test@mean003.com' });
  console.log('Test user deleted');
  await client.close();
}
main();
"
```

## Pages and Routes

| Page | URL | Route File |
|------|-----|------------|
| Home | `/` | `buildScripts/srcServer.js` |
| About Us | `/about` | `buildScripts/srcServer.js` |
| Blog | `/blog` | `buildScripts/srcServer.js` |
| Products and Services | `/products` | `buildScripts/srcServer.js` |
| Account Profile | `/profile` | `buildScripts/srcServer.js` |
| Login | `/login` | `buildScripts/srcServer.js` |

## API Routes

- `POST /api/auth/login` — authenticate with email/password
- `POST /api/auth/logout` — destroy session
- `GET /api/auth/session` — check login status
- `GET /api/users` — list users (from `users` collection)
- `POST /api/users` — create user
- `GET /api/users/:id` — get user by ID
- `PUT /api/users/:id` — update user
- `DELETE /api/users/:id` — delete user

## Navigation

All pages share a dark header nav bar. The Account Profile link is positioned on the upper right with an SVG user silhouette icon. When testing navigation, verify all 5 nav links plus the profile icon link work from every page.
