---
name: preflight
description: Run format, lint, build, typecheck, and scan docs for staleness — the full pre-commit check. Use when the user wants to "preflight", "verify", or confirm the working tree is ready to commit. Automatically invoked by /commit.
---

# Preflight — pre-commit verification

Run formatting / linting / build / typecheck, then scan documentation for staleness so a commit goes out clean.

## Steps

Run in order. Stop on the first failure and surface the error verbatim.

1. **Format** — `pnpm format` (Prettier auto-writes).
2. **Lint** — `pnpm lint`. If it fails with auto-fixable issues, suggest `pnpm lint:fix` and ask before running it.
3. **Build** — `pnpm build`. Must run **before** typecheck: `next build` regenerates `apps/web/next-env.d.ts` and the `.next/types/*` files that `apps/web`'s `tsc` depends on. Both are gitignored, so on a fresh clone typecheck will fail until build has run once.
4. **Typecheck** — `pnpm typecheck` (runs recursively across packages).
5. **Tests** — _(none configured yet; add here once a test runner is in place)_.
6. **Documentation scan.** Compare `git status --short` and `git diff` against docs that could now be out of date:
   - `CLAUDE.md` — project structure, conventions
   - `docs/architecture/*.md` — overview, scenarios, tech-stack, open-questions
   - `docs/ops/*.md`, `docs/TODO.md`
   - `README.md` — developer setup
   - `.claude/skills/**/SKILL.md` — if a workflow described there has changed

   For each candidate doc, propose specific edits (show the new wording or a diff) and **ask the user to approve before applying**. Apply only what's approved.

7. **Report**: which checks passed, any files the formatter / linter rewrote (so the user knows their working tree changed), which docs were updated.

## Rules

- Don't push past a failed step. Stop, surface, let the user decide.
- Don't silently bypass — never `--no-verify`, never skip steps to "save time."
- The doc scan is a proposal step: never edit docs without explicit approval.
- Safe to run standalone (e.g. before pushing or opening a PR), not just from `/commit`.
