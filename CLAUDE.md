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
│   └── lessons.md                # Committed, team-wide staging space for Claude's lessons
├── CLAUDE.md
└── README.md                     # Developer setup
```

`docs/` is published reference material; `tasks/` is in-flight working state (open questions, staged Claude lessons). Documentation is split by topic; extend the relevant file rather than creating new ones. Diagrams use Mermaid.

## Lessons

@tasks/lessons.md

`tasks/lessons.md` is a committed, team-wide staging space for lessons. New ones start here; the user promotes proven lessons to their permanent home (`CLAUDE.md`, `.claude/skills/<skill>/SKILL.md`).

- After ANY correction from the user: add the pattern to `tasks/lessons.md` as a rule that prevents the same mistake
- Whenever a lesson is applied, move it up one section so frequently used lessons float to the top
- Ruthlessly iterate until mistake rate drops
