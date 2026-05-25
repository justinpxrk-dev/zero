---
name: land
description: Merge the current branch's PR into main via rebase-merge, delete the branch, and return to a clean main. Use when the user wants to "land", "merge", or "ship" a PR. Waits for required checks and always confirms before merging.
---

# Land — merge PR via rebase-merge

Merge the current branch's PR into `main`, delete the branch, and return to a clean `main`. This project uses **rebase-and-merge**.

## Steps

1. Refuse if the current branch is `main`.
2. `git status --short` — if the working tree is dirty, bail and ask the user to commit or stash first.
3. Fetch PR state:
   ```
   gh pr view --json number,state,mergeable,mergeStateStatus,statusCheckRollup,reviewDecision,headRefName,baseRefName,url
   ```
4. If `state` is not `OPEN`, report and stop.
5. If `baseRefName` is not `main`, surface and ask before continuing (could be a stacked PR).
6. Check readiness:
   - **Checks running** (`statusCheckRollup` has `IN_PROGRESS`/`PENDING`): list them, ask whether to wait. If waiting, poll every ~30s via the same `gh pr view` query.
   - **Checks failed** (any `FAILURE`/`ERROR`): list the failing check names and URLs, stop. Do not merge.
   - **`reviewDecision` is `CHANGES_REQUESTED`**: stop.
   - **`mergeable` is `CONFLICTING`**: tell the user to `/sync` first, stop.
7. When everything is green, **confirm with the user before merging**. Never merge automatically.
8. Merge:
   ```
   gh pr merge --rebase --delete-branch
   ```
9. Return to main:
   ```
   git checkout main && git pull --ff-only origin main
   ```
10. Report: PR number + URL, new commit(s) on `main`, branch deleted.

## Rules

- Always `--rebase`. Never `--squash` or `--merge`.
- Always confirm before merging — even when everything is green.
- Never bypass branch protection or required checks. If `gh pr merge` fails, surface the error verbatim and stop.
- Do not delete the local branch with `-D`; `gh pr merge --delete-branch` handles remote + local cleanup.
