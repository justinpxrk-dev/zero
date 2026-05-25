# CLAUDE.md

Architecture and data flow: @docs/architecture/overview.md
Scenarios (sequence diagrams): @docs/architecture/scenarios.md
Tech stack: @docs/architecture/tech-stack.md

## Project structure

```
zero/
├── apps/
│   └── web/                      # Next.js app
├── packages/
│   └── core/                     # Shared LLM client (Gemini) and domain types
├── docs/
│   ├── architecture/
│   │   ├── overview.md           # System context: components + data flow diagram
│   │   ├── scenarios.md          # Sequence diagrams for sign-in, ingestion, watch renewal
│   │   ├── tech-stack.md         # Tech choices and hosting
│   │   └── open-questions.md     # Undecided architectural questions
│   ├── ops/
│   │   └── accounts.md           # Owner / test Google account setup
│   └── TODO.md                   # Implementation backlog
├── CLAUDE.md
└── README.md                     # Developer setup
```

Documentation is split by topic; extend the relevant file rather than creating new ones. Diagrams use Mermaid (rendered natively by Obsidian).
