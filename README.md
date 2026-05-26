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

### Database (local)

Postgres runs locally via Docker:

```sh
docker compose up -d db
```

Copy the env example and set `DATABASE_URL` to the container:

```sh
cp apps/web/.env.example apps/web/.env
# apps/web/.env -> DATABASE_URL=postgres://zero:zero@localhost:5432/zero
```

Apply migrations (and optionally open the Drizzle Studio GUI):

```sh
pnpm db:migrate
pnpm db:studio
```

### Receiving Gmail push notifications locally

Gmail Pub/Sub can't push to `localhost` — expose your dev server with a tunnel (e.g. `cloudflared tunnel --url http://localhost:3000`) and point your dev Pub/Sub subscription at the tunnel URL.

## Working with Claude

This repo is set up to work well with [Claude Code](https://docs.claude.com/en/docs/claude-code):

- [`CLAUDE.md`](./CLAUDE.md) — project context loaded into every Claude session.
- [`.claude/skills/`](./.claude/skills/) — workflow skills (`commit`, `land`, `preflight`, `sync`).
- `tasks/lessons.md` — **local, gitignored.** Claude logs corrections here as you give them so the same mistake isn't repeated across sessions. Each contributor maintains their own; create it as an empty markdown file on first use.

Workflow: new lessons start here and stay local while you test whether they actually change Claude's behavior. Once a lesson has proven itself, promote it to the appropriate committed location so the whole team benefits — `CLAUDE.md` for project-wide conventions, `.claude/skills/<skill>/SKILL.md` for workflow-specific rules.
