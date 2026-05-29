---
name: audit-lessons
description: Summarize tasks/lessons-hits.tsv — hit counts, recency, and applied-vs-corrected ratio per lesson — and propose which lessons to promote or prune. Use when the user wants to "audit lessons", review lesson usage, or decide what to promote or prune from tasks/lessons.md.
---

# Audit lessons — measure which lessons earn their keep

Aggregate the append-only hit log against the lessons file and propose promotions / rewords / prunes. Read-only analysis; the user decides.

## Steps

1. Read `tasks/lessons.md` and `tasks/lessons-hits.tsv` (both committed at the repo root).
2. Parse lesson ids from `tasks/lessons.md` — the `id:` line under each `##` heading.
3. Parse `tasks/lessons-hits.tsv` (tab-separated `date  id  kind  ref`; skip the header row and blank lines). `kind` is `applied` or `corrected`.
4. Per lesson id, compute: total hits, last-hit date, applied count, corrected count.
5. Classify each:
   - **Orphan** — an id in the log with no matching lesson (heading/id renamed) → flag for cleanup.
   - **Cold** — zero hits, or none in ~60 days → prune candidate.
   - **Not working** — high `corrected` share (the mistake recurs despite the lesson) → reword, don't prune.
   - **Proven** — high total, mostly `applied`, hit recently → promote candidate (to `CLAUDE.md` or a skill).
6. Print a table sorted by total hits desc: `id | hits | last | applied | corrected | signal`.
7. List concrete promote / reword / prune proposals. Apply nothing without explicit approval.

## Rules

- Read-only: never edit `tasks/lessons.md`, the log, or docs without the user approving a specific change.
- Trust `corrected` rows (user-observed) and any hook-emitted rows over self-reported `applied` rows — weight the signal toward them.
- Promotion and pruning are user decisions; this skill only proposes.
