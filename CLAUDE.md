# CLAUDE.md

Architecture and data flow: @docs/architecture/overview.md
Scenarios (sequence diagrams): @docs/architecture/scenarios.md
Tech stack: @docs/architecture/tech-stack.md
Lessons learned from past corrections: @tasks/lessons.md

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
│   └── lessons.md                # Local, gitignored — Claude's per-contributor lessons file
├── CLAUDE.md
└── README.md                     # Developer setup
```

`docs/` is published reference material; `tasks/` is in-flight working state (open questions, local Claude lessons). Documentation is split by topic; extend the relevant file rather than creating new ones. Diagrams use Mermaid (rendered natively by Obsidian).

## Lessons

- After ANY correction from the user: update tasks/lessons.md with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
