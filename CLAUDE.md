# CLAUDE.md

Architecture and data flow: @docs/architecture/overview.md
Scenarios (sequence diagrams): @docs/architecture/scenarios.md
Tech stack: @docs/architecture/tech-stack.md

## Project structure

```
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

`docs/` is published reference material; `tasks/` is in-flight working state (open questions, local Claude lessons). Documentation is split by topic; extend the relevant file rather than creating new ones. Diagrams use Mermaid (rendered natively by Obsidian).

## Lessons

`tasks/lessons.md` lives in the **main worktree only** (gitignored, single shared copy). Child worktrees under `.claude/worktrees/` do NOT have their own — always read and update the main worktree's copy at `<repo-root>/tasks/lessons.md`. If running in a child worktree, resolve that absolute path via `git worktree list` (first entry is the main worktree). If the file doesn't exist yet, create it there on the first correction.

- After ANY correction from the user: update the main worktree's `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Whenever a lesson is applied, move it up one section in `tasks/lessons.md` so frequently used lessons float to the top
- Ruthlessly iterate on these lessons until mistake rate drops
