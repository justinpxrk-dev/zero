# zero

LLM-powered Gmail triage. Sign in with Google and automatically organize your inbox: read summaries, create reminders, create events. Powered by Gemini.

See [Overview](./docs/architecture/overview.md) for the system overview and [Tech Stack](./docs/architecture/tech-stack.md) for the tech stack.

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

### Receiving Gmail push notifications locally

Gmail Pub/Sub can't push to `localhost` — expose your dev server with a tunnel (e.g. `cloudflared tunnel --url http://localhost:3000`) and point your dev Pub/Sub subscription at the tunnel URL.
