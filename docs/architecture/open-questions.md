# Open Questions

Architectural decisions still to make. Entries get deleted as they're resolved into the rest of the docs.

## Extraction

- **Prompt versioning.** When the prompt changes, how do we know which version produced which extraction? Probably a `prompt_version` column on the extraction row.
- **Per-user "second brain."** Augment extraction with per-user context — past emails, recurring people, stated preferences — via RAG. Would raise extraction quality and enable personalized actions, but adds embeddings storage and a heavier processing path (likely a separate Python service alongside Next.js).

## Identity

- **Multi-account support.** Can one user connect multiple Gmail accounts? Auth.js's Drizzle adapter supports it natively; needs an explicit decision.

## Ingestion & sync

- **Initial backfill on signup.** Process only emails arriving after sign-up, or backfill the last N days via history sync? Affects whether the sign-in scenario has a backfill phase.
- **Pub/Sub idempotency.** Pub/Sub is at-least-once — the same push can fire repeatedly. Dedup on Gmail `historyId` / `messageId`?
- **Watch renewal iteration.** Iterate users sequentially or in parallel inside the daily cron? Bounded by Gmail per-user rate limits and Vercel function timeout (10s on Hobby). At scale, chunk via Pub/Sub self-triggering across multiple invocations.

## Product behavior

- **Surfacing in UI.** How does the user see extractions — a unified action queue across all messages, a per-thread overlay in an inbox view, or grouped by type (info / task / event)? Drives the main UI layout.
- **Write-back to Gmail.** Does triage mutate the Gmail mailbox (apply labels, archive, mark read) or stay read-only? Affects required OAuth scopes (`gmail.modify` vs `gmail.readonly`) and changes the consent screen story.
- **"Done" semantics for an action.** What marks an extraction as resolved — user dismisses it, the underlying email is archived, the linked Calendar event / Task is created, or all of the above? Determines the action record's state machine.
