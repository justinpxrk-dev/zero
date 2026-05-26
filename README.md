# zero

LLM-powered Gmail triage. Sign in with Google and automatically organize your inbox: read summaries, create reminders, create events. Powered by Gemini.

See [Overview](./docs/architecture/overview.md) for the system overview and [Tech Stack](./docs/architecture/tech-stack.md) for the tech stack.

## Dashboard

[![CI](https://github.com/justinpxrk-dev/zero/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/justinpxrk-dev/zero/actions/workflows/ci.yml)

## Developer setup

This repo uses [mise](https://mise.jdx.dev/) to manage developer tools.

```sh
mise trust
mise install
```

Install `node` dependencies.

```sh
pnpm install
```

Start the dev server.

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Receiving Gmail push notifications locally

Gmail Pub/Sub can't push to `localhost` — expose your dev server with a tunnel (e.g. `cloudflared tunnel --url http://localhost:3000`) and point your dev Pub/Sub subscription at the tunnel URL.

## Working with Claude

This repo is set up to work well with [Claude Code](https://docs.claude.com/en/docs/claude-code):

- [`CLAUDE.md`](./CLAUDE.md) — project context loaded into every Claude session.
- [`.claude/skills/`](./.claude/skills/) — workflow skills (`commit`, `land`, `preflight`, `sync`).
- `tasks/lessons.md` — **local, gitignored.** Claude logs corrections here as you give them so the same mistake isn't repeated across sessions. Each contributor maintains their own; create it as an empty markdown file on first use.
