---
name: testing-mean003
description: Test the mean003 MEAN stack app end-to-end. Covers login flow, profile page, movie catalog, and password seeding verification.
---

# Testing mean003

## Prerequisites

- Node.js installed
- MongoDB connection string available via `MONGODB_URI` env var
- The app uses the `sample_mflix` database on MongoDB Atlas

## Devin Secrets Needed

- `MONGODB_URI`: MongoDB Atlas connection string for the sample_mflix database

## Starting the Dev Server

```bash
cd /home/ubuntu/repos/mean003
fuser -k 3000/tcp 2>/dev/null; sleep 1
MONGODB_URI="$MONGODB_URI" npm start &
```

Wait ~15 seconds for Webpack compilation. Verify with `curl -s http://localhost:3000/ | head -5`.

The `--openssl-legacy-provider` flag is already configured in package.json for Node 17+ compatibility.

## Password Seeding

The `sample_mflix.users` collection (186 users) ships with pre-hashed passwords whose plaintext values are unknown. To enable login testing, run the seed script:

```bash
cd /home/ubuntu/repos/mean003
MONGODB_URI="$MONGODB_URI" npx babel-node buildScripts/seedPasswords.js > /home/ubuntu/credentials.csv
```

This generates unique random 16-char passwords per user (bcrypt, 12 rounds) and outputs a CSV with columns: `email,name,password`.

**Important**: Running the seed script again generates NEW passwords — previous credentials become invalid.

## Testing Login Flow

1. Pick a user from `credentials.csv` (e.g., first data row after header)
2. Navigate to `localhost:3000/login`
3. Enter the email and password from the CSV
4. Verify redirect to `/profile` with correct user name displayed
5. Test that wrong passwords show red "Invalid email or password" error and stay on `/login`

## Testing Profile Page

- After login, `/profile` shows: Name, Primary Email, Secondary Email, Phone Number, Mailing Address fields
- Fields are editable; "Save Changes" persists to MongoDB
- "Logout" button clears session and redirects to `/login`

## Testing Unauthenticated Redirect

- Visiting `/profile` while logged out auto-redirects to `/login?redirect=/profile`
- After successful login, browser returns to `/profile`

## Testing Movie Catalog (Products Page)

- Navigate to `/products` — movies load in alphabetical order with infinite scroll
- Alphabetical sidebar on right (# A-Z) jumps to movies starting with that letter
- Scrolling down loads more movies automatically

## Common Issues

- If `npm start` fails with `ERR_OSSL_EVP_UNSUPPORTED`, ensure the `--openssl-legacy-provider` flag is in the `open:src` script in package.json
- If login always fails, the seed script may not have been run, or it may have been re-run (invalidating previous credentials). Re-run it and use the new CSV.
- MongoDB Atlas IP whitelist might block connections. Ensure the current machine's IP is whitelisted in Atlas Network Access settings.
