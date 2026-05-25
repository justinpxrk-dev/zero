# TODO

## v0 implementation

The five flows to build.

- [ ] **Scaffold Project**
  - [x] Developer tooling (format/lint)
  - [ ] Language/framework dependencies
  - [x] Claude context
  - [ ] Claude skills
- [ ] **Sign-up flow** — Auth.js Google OAuth → store refresh token in `accounts` → call `users.watch` first-time, store returned `historyId`.
- [ ] **New mail** — Pub/Sub push at `/api/gmail/push` → validate auth → `users.history.list` since stored `historyId` → `users.messages.get` per new message → Gemini extraction → write email + extraction to DB → update stored `historyId`. Same path in dev, exposed via a tunnel (see README).
- [ ] **User views inbox** — `/app` Server Component reads emails + extractions from Postgres for signed-in user → renders triaged list.
- [ ] **Watch renewal** — daily Vercel cron at `/api/cron/renew-watches` re-issues `users.watch` per active user, updates expiry in DB. Gmail watches expire after ~7 days.
