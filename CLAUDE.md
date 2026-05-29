# CLAUDE.md

Architecture and data flow: @docs/architecture/overview.md
Scenarios (sequence diagrams): @docs/architecture/scenarios.md
Tech stack: @docs/architecture/tech-stack.md

## Project structure

```text
zero/
├── .claude/
│   └── skills/                   # Workflow skills (commit, land, preflight, sync)
├── apps/
│   └── web/                      # Next.js app
├── packages/
│   └── core/                     # Shared LLM client (Gemini) and domain types
├── docs/
│   ├── architecture/
│   │   ├── overview.md           # System context: components + data flow diagram
│   │   ├── scenarios.md          # Sequence diagrams for sign-in, ingestion, watch renewal
│   │   └── tech-stack.md         # Tech choices and hosting
│   └── ops/
│       └── accounts.md           # Owner / test Google account setup
├── tasks/
│   ├── architecture/
│   │   └── open-questions.md     # Undecided architectural questions
│   ├── TODO.md                   # Implementation backlog
│   └── lessons.md                # Local, gitignored, main worktree only — Claude's per-contributor lessons file
├── CLAUDE.md
└── README.md                     # Developer setup
```

`docs/` is published reference material; `tasks/` is in-flight working state (open questions, local Claude lessons). Documentation is split by topic; extend the relevant file rather than creating new ones. Diagrams use Mermaid.

## Lessons

@tasks/lessons.md

The import above auto-loads the lessons every session, **from any worktree**. It resolves because child worktrees live under `.claude/worktrees/`, so Claude walks up the directory tree and also loads this root `CLAUDE.md`, and a relative `@import` resolves against the file that contains it (this one, in the main worktree) — not the cwd. Keep it a bare relative path for that reason; don't rewrite it to an absolute path. The file itself is **main worktree only** (gitignored, single shared copy); child worktrees have none of their own. Always read and update that one main-worktree copy at `<repo-root>/tasks/lessons.md`; from a child worktree, resolve the root with `dirname "$(git rev-parse --git-common-dir)"`. Create it there on the first correction if missing.

- After ANY correction from the user: update the main worktree's `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- **Whenever you apply a lesson, move its section up one slot** in `tasks/lessons.md` (swap it with the section directly above) so frequently used lessons float to the top
- Ruthlessly iterate on these lessons until mistake rate drops
