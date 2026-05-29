# Lessons

## Commit type for Claude-context changes

Use `claude:` (not `chore:`/`docs:`) for any commit touching `CLAUDE.md`, `.claude/**`, `tasks/lessons.md`, `tasks/architecture/open-questions.md`, the README's "Working with Claude" section, or files moving between `docs/` and `tasks/` for Claude context — even when the edited file is `README.md` or under `docs/`. Reserve `chore:` for non-Claude housekeeping, `docs:` for `docs/architecture/` and `docs/ops/`. Precedent: `claude: document tasks/lessons.md workflow` (a README edit).

## PR test-plan format

Checkbox list (`- [x]` verified locally, `- [ ]` outstanding), CI line always last (`- [ ] CI passes (format, lint, typecheck, build)`). Name the commands/assertions run — no vague "test by running it". Precedents: PRs #7, #10, #11, #13.

## Trust `mise.toml` in a fresh worktree

mise won't load an untrusted `mise.toml`, so every `lefthook.yml` pre-commit hook (wrapped in `mise exec`) exits non-zero before its check runs — looks like a check failure but is environmental. First action in a new `.claude/worktrees/` worktree: `mise trust mise.toml`. Per-machine, not fixable in-repo.

## Use bulleted commit bodies

Non-trivial bodies use `- ` bullets wrapped ~72 chars, backticks for paths/scripts/flags — not prose. Re-read `.claude/skills/commit/SKILL.md` before drafting. Trivial one-liners omit the body. Precedents: `0af8298`, `6a1c1c8`, `35178f0`, `65d6f99`.

## Per-worktree files belong in the main checkout

Worktrees have independent working trees, so gitignored files (e.g. `.env`) written from a worktree are invisible in main and other worktrees. Write shared local state (scratch notes) to the main checkout — from a worktree, `dirname "$(git rev-parse --git-common-dir)"` resolves its root.

## Fetch and rebase before opening or pushing a PR

Before `git push -u` for a new PR branch (or any force-push), run `git fetch origin && git rebase origin/main`. Local `main` lags in worktrees, and a PR off stale `main` conflicts the moment another lands first. Not in `/preflight` or `/commit` — manual habit. Precedent: PR #15 conflicted with merged PR #14 in `package.json` scripts; needed rebase + force-push-with-lease.

## Worktree permission grants: mirror to main, revoke at teardown

Path-scoped grants made in a worktree (`mise trust`, tool-permission approvals, anything path-keyed under `~/.local/` or `~/.config/`):

- **Mirror to main** — grant the equivalent in the main checkout; it's the canonical environment.
- **Revoke at teardown** — undo on branch merge / worktree removal (e.g. `mise trust --untrust /path/to/worktree/mise.toml`).

## Search before contradicting recent facts past the cutoff

Knowledge cutoff is Jan 2026 but `currentDate` is the real today. When a user asserts something recent (new model, launched feature) near/after the cutoff, search before pushing back — absence from memory isn't evidence of absence. Precedent: denied Opus 4.8 existed; `WebSearch` confirmed it launched 2026-05-28.
