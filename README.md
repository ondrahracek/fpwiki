# fpwiki

Czech-language read-only wiki for students of Fakulta podnikatelská VUT v Brně.

Built with Nuxt 4 + Nuxt UI v4 + `@nuxt/content` v3. Deploys to Firebase App Hosting.

> Operational guidance and conventions: **[CLAUDE.md](./CLAUDE.md)**.

## Quick start

```sh
pnpm install
pnpm dev          # http://localhost:3000
```

Content lives under `content/` and `public/wiki-assets/` and is **fetched at
build time from the [fpwiki-content](https://github.com/ondrahracek/fpwiki-content)
repo** at the SHA pinned in [`content-ref.txt`](./content-ref.txt). Both
directories are .gitignored — do not edit them by hand. See
[CONTRIBUTING.md](./CONTRIBUTING.md) for the full sync model.

## Common commands

```sh
pnpm dev               # Nuxt dev server
pnpm build             # production build
pnpm preview           # serve built output
pnpm lint              # ESLint
pnpm format            # Prettier
pnpm typecheck         # nuxt prepare && vue-tsc --noEmit
pnpm test              # Vitest
pnpm content:validate  # slug uniqueness, broken wikilinks, missing assets
```

## Deploy

Firebase App Hosting via the Nitro `firebase_app_hosting` preset (auto-detected).
Region is `europe-west3` (set on the App Hosting backend in the Firebase Console).

`apphosting.yaml` controls `runConfig` and runtime env. No `firebase.json` is
needed.

## License

Internal student project. Not affiliated with FP VUT.
