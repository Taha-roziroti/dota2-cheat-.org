# Dota 2 Cheats — Marketing Site

Static Astro 7 site for [dota2cheat.org](https://dota2cheat.org). Primary SEO keyword: **dota 2 cheats** (secondary: dota 2 esp, dota 2 aimbot, dota 2 wallhack).

## Stack

- Astro 7 + Tailwind CSS 4 + TypeScript
- 22-locale i18n (English at root, `/es/`, `/fr/`, …)
- Cloudflare Workers deployment with `src/worker.ts`

## Quick start

```bash
npm install
npm run localhost
# open http://localhost:5173
```

## Deploy

See [DEPLOY.md](./DEPLOY.md) for Cloudflare Workers Builds setup targeting **dota2cheat.org**.
