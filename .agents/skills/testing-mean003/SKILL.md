---
name: testing-mean003
description: Test the mean003 MEAN stack web app end-to-end. Use when verifying login, profile, navigation, or MongoDB-related changes.
---

# Testing mean003

## Prerequisites

- Node.js (tested with v22.12.0)
- Access to the MongoDB Atlas cluster via `MONGODB_URI` secret

## Devin Secrets Needed

- `MONGODB_URI` — MongoDB Atlas connection string for the sample_mflix database

## Running the App

```bash
cd /home/ubuntu/repos/mean003
npm install
MONGODB_URI="$MONGODB_URI" npm start
```

The dev server runs on `localhost:3000`. Webpack 4 requires the `--openssl-legacy-provider` flag on Node 17+ (already configured in package.json).

## Test User Setup

Create a test user in the `sample_mflix.users` collection with bcrypt-hashed password:

```javascript
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
async function createTestUser() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('sample_mflix');
  const hash = await bcrypt.hash('testpass123', 12);
  await db.collection('users').insertOne({
    name: 'Test User',
    email: 'test@mean003.com',
    password: hash,
    secondaryEmail: 'test.backup@mean003.com',
    phone: '(555) 123-4567',
    mailingAddress: { street: '123 Main Street', city: 'Springfield', state: 'IL', zip: '62701' }
  });
  await client.close();
}
```

Credentials: `test@mean003.com` / `testpass123`

**Important:** Clean up the test user after testing by deleting it from the collection.

## Key Testing Flows

### 1. Navigation
- Visit each page: `/`, `/about`, `/blog`, `/products`, `/profile`
- Verify nav header appears on all pages with correct links
- Account Profile link should be positioned upper-right with a user silhouette icon

### 2. Login Redirect
- Visit `/profile` while logged out → should auto-redirect to `/login?redirect=/profile`
- Log in with test credentials → should redirect back to `/profile` with user data displayed
- The old behavior showed a static "not logged in" message; the new behavior auto-redirects

### 3. Profile Form
- Log in, navigate to `/profile`
- Form should display: Primary Email, Secondary Email, Phone Number, Mailing Address (Street, City, State, Zip)
- Edit a field, click "Save Changes" → green "Profile updated successfully" message
- Refresh page → edited value should persist (data saved to MongoDB)

### 4. Logout
- Click Logout on profile page → redirects to `/login`
- Visit `/profile` again → should redirect to login (session cleared)

## Lint & Tests

```bash
npm run lint   # ESLint — expect 0 errors, 2 warnings (console statements in connection.js)
npm test       # Mocha — expect 2 passing tests
```

## Common Issues

- **ERR_OSSL_EVP_UNSUPPORTED**: Already fixed via `cross-env NODE_OPTIONS=--openssl-legacy-provider` in package.json. If it recurs, ensure `cross-env` is installed.
- **ESLint async/await errors**: `.eslintrc.json` ecmaVersion must be 8+ (ES2017).
- **Empty profile fields**: If a user has no secondaryEmail/phone/mailingAddress fields in MongoDB, the form shows empty inputs — this is expected behavior.
