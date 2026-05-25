# Accounts

`zero` uses two dedicated Google accounts, kept separate from any personal Google identity.

## Owner account

Owns the GCP project. Holds OAuth client credentials and is the developer contact on the OAuth consent screen. Receives billing, quota, and security alerts from Google.

Treated like infrastructure: 2FA required, rarely logged into, credentials in a password manager.

## Test account

The dev inbox. Used to walk through the app's OAuth flow, receive Pub/Sub push notifications, and send test emails to during development.

Must be added as a **test user** on the OAuth consent screen while the app is in "Testing" mode, otherwise Google will refuse to authorize it.

## Where values live

Specific addresses, the GCP project ID, OAuth client ID/secret, etc. are not recorded here. They live in:

- `.env` (gitignored) for anything the app reads at runtime
- A password manager for credentials and recovery info
