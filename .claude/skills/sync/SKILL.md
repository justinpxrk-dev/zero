---
name: sync
description: Rebase the current branch onto origin/main and force-push with lease. Use when the user wants to "sync", "rebase onto main", "update from main", or "catch up with main". Refuses to run on the main branch.
---

# Sync — rebase onto main

Bring the current branch up to date with `origin/main` via rebase, then force-push with lease.

## Steps

1. Refuse if the current branch is `main` — there's nothing to sync.
2. Run `git status --short` and `git rev-parse --abbrev-ref HEAD` in parallel. If the working tree is dirty, ask before stashing.
3. `git fetch origin main`.
4. If `git log --oneline origin/main..HEAD` is empty, the branch has no commits ahead — fast-forward with `git merge --ff-only origin/main` instead and stop.
5. Otherwise `git rebase origin/main`.
6. On conflict:
   - List the conflicted files (`git diff --name-only --diff-filter=U`).
   - Stop and ask the user how to proceed. Never run `git rebase --abort` without explicit confirmation — they may want to resolve and continue.
7. After a successful rebase:
   - If the branch has an upstream (`git rev-parse --abbrev-ref --symbolic-full-name @{u}` succeeds), run `git push --force-with-lease`. Confirm first.
   - If no upstream, skip the push.
8. If you stashed earlier, `git stash pop`. If pop conflicts, surface and stop.
9. Report: commits rebased, new HEAD sha, whether the remote was updated.

## Rules

- Never plain `--force` — always `--force-with-lease`.
- Never push to `main`.
- Never `--no-verify`.
- Do not run `git rebase --abort`, `git reset --hard`, or `git checkout -- .` without explicit confirmation.
