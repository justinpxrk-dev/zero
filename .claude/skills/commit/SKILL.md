---
name: commit
description: Write a git commit following this project's conventions. Use when the user wants to "commit", "make a commit", or asks you to write a commit message. Always confirms the message before committing.
---

# Commit — write a commit in this project's style

Stage the intended changes and write a commit message that matches this repo's conventions.

## Steps

1. **Run `/preflight` first.** Invoke the `preflight` skill to format, lint, typecheck, build, and surface stale documentation for approval. If preflight fails or the user declines a proposed doc update, stop and resolve before continuing. This step is mandatory — never skip it.
2. Run `git status --short` and `git diff --staged` (and `git diff` for unstaged) in parallel to see what's changing (including any files preflight rewrote or doc updates the user approved).
3. If nothing is staged, ask the user which files to stage — never blanket `git add -A` / `git add .`.
4. Draft a message following the format below.
5. **Show the user the drafted message and confirm before committing.**
6. Commit via heredoc to preserve formatting:
   ```
   git commit -m "$(cat <<'EOF'
   <message>
   EOF
   )"
   ```
7. Run `git status` after to confirm.

## Format

### Subject line

`type(scope?): subject`

- **Types seen in this repo**: `chore`, `ci`, `chore(deps)`. Add `feat`, `fix`, `docs`, `refactor`, `test` as needed.
- Imperative mood, lowercase after the colon, no trailing period.
- Keep under ~70 chars.

### Body

- **Omit entirely** for trivial one-liners (e.g. `chore: ignore .claude/worktrees`).
- Otherwise: blank line after subject, then bullets (`- `) or short paragraphs wrapped at ~72 chars.
- Explain **why**, not what — design rationale, security context, links to upstream issues.
- Link external context (Dependabot alerts, GitHub issues) when it adds signal.

### Examples from this repo

```
ci: scope GITHUB_TOKEN and bump pinned actions

- Add top-level permissions block (contents: read)
- Bump actions/checkout v4 -> v6
- Bump jdx/mise-action v2 -> v4.0.1 (immutable release tag)
```

```
chore: ignore .claude/worktrees
```

## Rules

- **Never** add a `Co-Authored-By: Claude` trailer.
- **Never** add a "🤖 Generated with Claude Code" footer.
- **Never** use emojis in the subject or body.
- **Never** `--no-verify` — if a hook fails, fix the underlying issue and make a new commit.
- **Never** `--amend` unless the user explicitly asks. Make a new commit instead.
- **Never** stage with `git add -A` / `git add .` — name files explicitly to avoid sweeping in secrets or large binaries.
- Always confirm the drafted message before running `git commit`.
