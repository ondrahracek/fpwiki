# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**fpwiki** is a Czech-language, read-only wiki for students of Fakulta podnikatelská VUT v Brně. It renders course summaries, topic explainers, and cross-referenced notes from a curated content corpus.

This repo is the **web app only** — data, rendering, server, and client all live here. There is no database, no headless CMS, no companion service.

## Source of truth: the content pipeline

Content lives in `content/` and `public/wiki-assets/`. **Both are .gitignored and populated at build time by [`scripts/fetch-content.ts`](scripts/fetch-content.ts) from the public [fpwiki-content](https://github.com/ondrahracek/fpwiki-content) repo, at the SHA pinned in [`content-ref.txt`](content-ref.txt).** Never edit them by hand — they're rewritten on every `pnpm install` / `pnpm dev` / `pnpm build`. To change content, open an issue against fpwiki.

- `content/overview.md` — singleton root page
- `content/courses/*.md` — one page per course (currently: imek, imork, ipmrk)
- `content/topics/*.md` — cross-cutting concept pages
- `content/summaries/*.md` — per-source summaries (one per ingested PDF/markdown)
- `content/outputs/*.md` — saved query outputs
- `public/wiki-assets/*` — images referenced from content via `![[]]` embeds

The fetch script:

- Reads the 40-char SHA from `content-ref.txt`.
- Downloads `https://codeload.github.com/ondrahracek/fpwiki-content/tar.gz/<sha>` (cached by SHA in `.cache/content/<sha>/`).
- Mirrors the extracted tree into `content/` and `public/wiki-assets/`.
- Wired into `predev`, `prebuild`, `pregenerate`, `prepreview`, and `postinstall` lifecycle hooks. Cache hit = milliseconds.

`content-ref.txt` is updated by an automated bot whenever new content is published upstream. **Never edit `content-ref.txt` by hand in PRs** unless you are intentionally pinning the build to a specific historical content version.

For local-dev power-user overrides (`FPWIKI_CONTENT_REF`, `FPWIKI_CONTENT_LOCAL`, `FPWIKI_CONTENT_FORCE`, `FPWIKI_CONTENT_REPO`, `FPWIKI_SKIP_FETCH`), see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Routing

Four user-facing routes, all prerendered by default:

| Path          | Purpose                                                          |
| ------------- | ---------------------------------------------------------------- |
| `/`           | Home (hero + recent + popular + tag cloud, derived from content) |
| `/courses`    | Derived index of all `courses/` pages                            |
| `/wiki/:slug` | Any single content page, regardless of folder                    |
| `/tag/:slug`  | Pages filtered by tag                                            |

**Slug uniqueness is global across all content collections.** Wikilinks in source markdown use the "shortest path" form (`[[anfis]]`, no folder prefix), so two content files cannot share a filename even across different folders. `pnpm content:validate` enforces this.

Internal links resolve `[[slug]]` → `/wiki/<slug>` regardless of which collection the target lives in. Page-type variation (course vs. topic vs. summary vs. output) is handled by `app/components/WikiPage.vue` switching on `frontmatter.type`, **not by adding new routes**.

**ALL URL construction goes through [`shared/wiki-routes.ts`](shared/wiki-routes.ts).** That module exposes:

- `wikiUrl.home() / .courses() / .page(slug) / .tag(tag) / .asset(filename)` — build URLs from primitives.
- `slugFromPath(path)` — extract a canonical slug from a `@nuxt/content` path, a filesystem path, a search-section id with `#fragment`, or a bare slug.
- `pathFor({ path, filePath, stem, collection, heading, isEmbed })` — convert any content-page-like object to its URL.

A drift-prevention test in `test/shared/wiki-routes.lint.test.ts` greps the codebase and fails CI if a `/wiki/${...}`, `/tag/${...}`, or `/wiki-assets/...` template literal appears outside `shared/wiki-routes.ts`. **Never reinvent these URL formats inline.** The wikilink remark plugin's `urlResolver`, the slug-index `entries.path`, the `useWikiSlugIndex` composable, and every component template all route through the same helper.

### How to add a new internal link

Pick the helper that matches your input shape; never write the URL by hand.

```vue
<script setup lang="ts">
import { wikiUrl, pathFor } from '#shared/wiki-routes'
</script>

<template>
  <!-- Static destinations -->
  <NuxtLink :to="wikiUrl.home()">Domů</NuxtLink>
  <NuxtLink :to="wikiUrl.courses()">Předměty</NuxtLink>

  <!-- I have a slug -->
  <NuxtLink :to="wikiUrl.page(slug)">{{ title }}</NuxtLink>
  <NuxtLink :to="wikiUrl.tag(tag)">#{{ tag }}</NuxtLink>

  <!-- I have a content-page object from queryCollection() -->
  <NuxtLink :to="pathFor({ path: page.path, collection: 'topics' })">{{ page.title }}</NuxtLink>

  <!-- I have a search-section id (may include #fragment) -->
  <NuxtLink :to="pathFor({ path: hit.section.id, collection: hit.section.collection })">…</NuxtLink>
</template>
```

If you find yourself wanting to write `` `/wiki/${...}` `` or `` `/tag/${...}` `` somewhere — **stop**, the lint test will reject it. If a use case isn't covered, extend `shared/wiki-routes.ts` (with a test) and route through there.

## Frontmatter contract

Every content file has YAML frontmatter:

```yaml
---
title: '...' # required
course: 'imek' # OR courses: ["imek", "imork"] — both forms accepted
type: course | topic | summary | output | overview
tags: [...]
sources: [...] # raw/* paths — STRIPPED ON RENDER
created: 2026-04-10
updated: 2026-04-10
---
```

Rules:

- **`course` (string) and `courses` (array) are both valid input.** Normalize via `app/utils/frontmatter.ts::resolveCourses()` — single source of truth, do not inline this logic.
- **`sources:` is never rendered.** It points at `raw/...` paths the web app cannot reach. Stripped before templates.
- **`type` is a redundant hint.** The collection (folder) is authoritative; schema treats `type` as optional.
- **Course pages have additional optional fields** (`courseName`, `garant`, `featured`, `examInfo`) — these are **TODO** for a future content authoring session. Until they exist, listings derive display names from `title`. Look for `// TODO(course-meta):` markers in components that should switch to the richer fields when they land.

## Markdown processing

`@nuxt/content` v3 with these remark/rehype plugins (configured in `nuxt.config.ts`):

- **Wikilinks + image embeds** via `@flowershow/remark-wiki-link` (≥3.x). Plugin handles BOTH `[[]]` and `![[]]` natively. The slug-index Nuxt module injects `files` and `urlResolver` into the plugin's `options` at module setup. `urlResolver` signature is `({ filePath, isEmbed, heading }) => string` per the `.d.ts` — **the upstream README documents the wrong signature, do not trust it**. All resolution routes through `shared/wiki-routes.ts`.
  - `[[slug]]` → `/wiki/<slug>` (resolved against build-time slug index)
  - `[[slug|display]]` → same href, custom anchor text
  - Unknown slug → `wikilink-broken` class (red dotted underline)
  - `![[file.jpeg|caption]]` → `<img src="/wiki-assets/<file>" alt="<caption>">`
- **GFM** (default in `@nuxt/content`).
- **Math** via `remark-math` + `rehype-katex` (KaTeX CSS imported in `app/assets/css/main.css`) — content uses inline `$...$` (e.g. `Cobb-Douglasova $U$`).

**Plugin config shape (critical):** each entry under `content.build.markdown.{remarkPlugins,rehypePlugins}` MUST be `{ instance?, options? }`. Flat options at the top level (e.g. `{ format: 'shortestPossible' }`) are **silently ignored** by `@nuxt/content`'s `importPlugins` — the plugin runs with all defaults and you'll see broken wikilinks with no error. See `nuxt.config.ts` for the correct shape and the "Pitfalls" section below.

The slug index is generated by `modules/wiki-slug-index/` at module setup (not a Nitro virtual module — a Nuxt `addTemplate` that writes `#build/wiki-slug-index.json`). It's regenerated on `builder:watch` for `content/**/*.md` changes during dev. Consumed by the wikilink resolver, the runtime `useWikiSlugIndex()` composable, and search. **Never re-implement slug-to-path resolution elsewhere.**

## Search

Custom command-palette UI in `app/components/AppSearch.vue`, fed by `useAllSearchSections()` (which fans out `queryCollectionSearchSections` across the four page collections in parallel). Triggered by `meta_k` — Nuxt UI's `defineShortcuts` automatically maps `meta` to ⌘ on macOS and Ctrl on Windows/Linux, so a single binding covers both.

**Two engines coexist** (`useFuseSearch` and `useMinisearchSearch`) during the evaluation window. Selection is via `useSearchEngine()` — flip with `?engine=fuse|minisearch` (URL query, persisted to localStorage) or default in code. **TODO(search-engine):** after picking a winner, delete the loser composable and the switch. See refined plan §4.3.

**Czech-aware tokenization is required.** `app/composables/useCzechSearch.ts` exports `processTerm` that NFD-strips diacritics. Apply identically to indexed text and queries — do not let indexer and query path drift, or `pribytek` will fail to match `přebytek`. Both engines wire through this helper.

## Theming

Two layers, no others:

1. **CSS tokens in `app/assets/css/main.css`** under `@theme static { ... }`: FP red ramp (`--color-fp-red-*`), FP purple ramp (`--color-fp-purple-*`), warm paper neutrals (`--color-paper-*`, `--color-ink-*`), and the three font stacks (Inter, Source Serif 4, JetBrains Mono).
2. **Semantic role mapping in `app/app.config.ts`**: `ui.colors.primary = 'fp-purple'`, `secondary = 'fp-red'`, `neutral = 'paper'`. Global component variant overrides go here under `ui.<component>.slots`, not on instances.

Tag colors are computed deterministically from a hue map in `app/plugins/tag-colors.ts`. **Never hardcode tag colors in components.**

When customizing a Nuxt UI component globally, override via `app.config.ts`. For one-offs, use the `:ui` prop. Do not write per-instance Tailwind class soup.

## Stack

- Node 22 LTS, pnpm
- Nuxt 4 (default `app/` srcDir, `noUncheckedIndexedAccess: true`)
- Nuxt UI v4 + Tailwind v4 (auto-pulls `@nuxt/icon`, `@nuxt/fonts`, `@nuxtjs/color-mode`). All v4 components are free — no Pro tier exists in v4.
- `@nuxt/content` v3 with default SQLite (`better-sqlite3`, pinned in deps; bundled at build for serverless).
- Hybrid rendering: `routeRules: { '/**': { prerender: true } }` baseline + `nitro.prerender.crawlLinks: true`. Narrow only when a route genuinely needs SSR. See "Pitfalls" #7 for crawler reachability gotchas.

## Deploy

**Firebase App Hosting** via the Nitro `firebase_app_hosting` preset (auto-detected; no `firebase.json` needed). Region `europe-west4` (Eemshaven). Backend config in `apphosting.yaml`. Public origin: `https://fpwiki.cz` (set as `NUXT_PUBLIC_SITE_URL` in `apphosting.yaml`; the App Hosting default URL `https://fpwiki--fpwiki-cz.europe-west4.hosted.app` is also reachable but every page's `<link rel="canonical">` points at fpwiki.cz).

Deploy is git-push triggered: a push to the configured branch builds via Cloud Build, serves on Cloud Run, with the CDN in front of prerendered output.

Do not add `firebase-tools` CLI deploy scripts. Do not switch to plain Firebase Hosting + Cloud Functions — App Hosting is the chosen path.

## Commands

```sh
pnpm dev                  # Nuxt dev server with HMR
pnpm build                # production build
pnpm preview              # serve built output locally (smoke test before push)

pnpm lint                 # ESLint
pnpm lint:fix             # ESLint with autofix
pnpm format               # Prettier write
pnpm typecheck            # nuxt prepare && vue-tsc --noEmit

pnpm test                 # Vitest run (CI mode)
pnpm test:watch           # Vitest watch
pnpm vitest <pattern>     # single test file by name pattern

pnpm content:validate     # slug uniqueness, broken wikilinks, missing assets
```

CI runs: install → lint → typecheck → test → content:validate → build.

## Pre-commit / pre-push / commit-msg

- **pre-commit**: `lint-staged` — `eslint --fix` + `prettier --write` on staged files.
- **commit-msg**: commitlint with `@commitlint/config-conventional`. Conventional Commits required (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `ci:`, `build:`, `perf:`).
- **pre-push**: `pnpm typecheck && pnpm test && pnpm content:validate`. Heavier; accepts ~30s push delay to keep `master` green.

If a hook slows you down, fix the underlying issue or split your changes. **Do not use `--no-verify`.**

## Build-time content validation

`scripts/validate-content.ts` runs in CI and via `pnpm content:validate`:

1. **Slug uniqueness** across all collections — hard fail on collision.
2. **Wikilink resolution** — every `[[slug]]` and `![[file]]` resolves. Broken wikilinks warn; missing image assets fail (override with `--allow-missing-assets` for transient migrations only).
3. **Frontmatter sanity** — required fields, ISO date format, unknown keys warn.

Treat warnings as debt to clear, not noise.

## What lives where (only the non-obvious)

- `shared/wiki-routes.ts` — **single source of truth for every URL the app builds**. `wikiUrl`, `slugFromPath`, `pathFor`. CI-guarded against drift.
- `shared/types/wiki.ts` — types shared between client and server (Nuxt 4 `shared/`).
- `app/utils/frontmatter.ts` — `resolveCourses()`, `stripSources()`, `toISODate()`. **The only place this logic exists.**
- `app/utils/slug.ts` — `stripDiacritics()`, `toSlug()`. (For URLs use `shared/wiki-routes.ts` instead.)
- `app/composables/useWikiSlugIndex.ts` — single runtime accessor for the slug → page map. Internally calls `wikiUrl.page`.
- `app/composables/useCzechSearch.ts` — diacritics-stripping tokenizer; used by both search engines.
- `app/composables/useAllSearchSections.ts` — fans out `queryCollectionSearchSections` across the four page collections in parallel. The single point that knows about cross-collection search. (`queryCollectionSearchSections` is single-collection per call by @nuxt/content design.)
- `app/composables/useSearchEngine.ts` — runtime engine selector (Fuse vs MiniSearch). **TODO(search-engine):** delete after evaluation.
- `app/composables/useFuseSearch.ts` / `useMinisearchSearch.ts` — the two engines under evaluation. Both consume `useCzechSearch` for tokenization.
- `app/components/AppSearch.vue` — the command palette UI; reads `useSearchEngine()` and dispatches to one engine.
- `app/components/WikiPage.vue` — type-switch render component. **New page-types are added here, not as new routes.**
- `app/plugins/tag-colors.ts` — deterministic oklch hue map for tag pills.
- `modules/wiki-slug-index/` — Nuxt module. **Must be FIRST in `nuxt.config.ts modules`** — mutates `@nuxt/content` remark plugin options before that module's setup snapshots them. Pure walker logic in `build.ts` (no `@nuxt/kit`) so it's unit-testable.
- `scripts/validate-content.ts` — the content lint (slug uniqueness, broken wikilinks, missing assets).

## SSR-safe state rules

- **No `localStorage` for first-paint state.** Use `useCookie()` so SSR sees the value before render. Currently applies to: dark mode (handled by `@nuxtjs/color-mode`), disclaimer-banner dismissal.
- **`<ReadingProgress>` is wrapped in `<ClientOnly>`** with a 4px placeholder to avoid CLS.
- **Dark mode flash** is prevented by color-mode's cookie + injected script — don't replace it with a custom `<script>` block.
- **`@nuxtjs/color-mode` defaults are correct.** Do not override `storage`/`storageKey` — a previous attempt added duplicate cookies (`fp-color-mode=system; fp-color-mode=dark`) which made the resolved theme non-deterministic on navigation. Leave `nuxt.config.ts colorMode` minimal.
- **OS-aware values that differ between SSR and client must go through `<ClientOnly>` with a fallback.** Examples in `AppHeader.vue`: `<UKbd value="meta">` (renders ⌘ on macOS, Ctrl on Windows/Linux) and the dark-mode toggle icon both crash SSR with a hydration mismatch unless wrapped.

### Nuxt UI v4 specifics worth remembering

- **Use semantic color tokens, not neutral-N scales.** `--ui-text` / `--ui-text-muted` / `--ui-text-toned` / `--ui-text-highlighted` / `--ui-text-dimmed` for text; `--ui-bg` / `--ui-bg-muted` / `--ui-bg-elevated` for backgrounds; `--ui-border` for borders. Hardcoded `--ui-color-neutral-500` etc. **does not flip in dark mode** — the page footer, nav, and disclaimer banner used to show a permanently light cream color on dark theme until we migrated.
- **`useShortcuts` does not exist in v4.** It was a v2/v3 composable. Use `useKbd()` (returns `{ macOS, getKbdKey }`) for platform-aware key labels, or render `<UKbd value="meta" />` which adapts automatically. Do not import `useShortcuts` — it'll throw at runtime, and TypeScript won't catch it because it shows up as auto-import.
- **`defineShortcuts({ meta_k: ... })` covers both platforms in one binding.** Nuxt UI maps `meta` to ⌘ on macOS and Ctrl on Windows/Linux automatically. Do not bind `ctrl_k` separately.
- **All v4 components are free.** Pro tier was unified into v4 — `<UContentSearch>`, `<UContentToc>`, `<UDashboardLayout>` etc. are all available without licensing.

## Pitfalls (things that break silently)

These have all caused real bugs in this repo. Each one was hard to spot because it produced "wrong but not crashing" behavior. Adding a new feature in the same area? Re-read this list first.

1. **`@nuxt/content` v3 plugin config shape.** Entries under `remarkPlugins` / `rehypePlugins` MUST be `{ instance?, options? }`. Flat-options-at-key-level (`{ format: 'shortestPossible' }`) is silently ignored — the plugin runs with defaults. Symptom: wikilinks rendered with class `internal new` and bare hrefs like `/imek` instead of `/wiki/imek`. Fix lives in `nuxt.config.ts`.
2. **Module ordering.** `wiki-slug-index` MUST come first in `nuxt.config.ts modules: []`. If `@nuxt/content` is set up first, it snapshots the remark plugin options before our module mutates them; injection of `files` and `urlResolver` becomes a no-op. Symptom: same as above.
3. **`@flowershow/remark-wiki-link` `urlResolver` signature.** v3 calls `({ filePath, isEmbed, heading }) => string`. The README still documents the legacy `(name) => string`. Trust the `.d.ts`, not the README.
4. **`queryCollection().path('/foo')` and `entry.path` confusion.** `path` from `@nuxt/content` is a route-shaped string like `/courses/imek`, NOT a slug. Always extract the slug via `slugFromPath()` before constructing a URL. Pre-fix code did `<NuxtLink :to="p.path">` which produced `/topics/derivace`-shaped hrefs that match no route in this app.
5. **Build cache + locked SQLite.** A leftover `node .output/server/index.mjs` process holds `.output/server/contents.sqlite` open. Subsequent `pnpm build` fails with `EBUSY: resource busy or locked`. Mitigation: kill all `node` processes (`pkill -f node`) and `rm -rf .output` before rebuilding. NOTE: if `rm -rf .nuxt && pnpm dev` doesn't help and the failure mentions a `.nuxt//dist` (note double slash) path on Windows, see Pitfall #19 — different bug, different fix.
6. **README files written from a Windows shell can land as UTF-16.** Happened once with the project README — `file README.md` showed `data` instead of `UTF-8 text`, and Markdown rendered as character-spaced gibberish. Use the `Write` tool (writes UTF-8) and verify with `file <path>`.
7. **Prerender requires reachable links.** `routeRules: { '/**': { prerender: true } }` only prerenders pages the crawler can reach. With `nitro.prerender.crawlLinks: true` the home page must link to every collection page (or the page must be in `nitro.prerender.routes`), otherwise it won't be in `.output/public/`. Currently the home tag-cloud only iterates the `courses` collection — `/tag/<topic-tag>` pages won't appear in the crawl unless tags from topics/summaries/outputs surface somewhere on `/` or `/courses`.
8. **`vue-router/volar` plugin warnings during typecheck are noise.** With `experimental.typedPages: false` (current setting), `vue-tsc` still tries to load the typed-router volar plugin and prints `ERR_PACKAGE_PATH_NOT_EXPORTED` stderr noise — exit code is still 0. Don't chase it.
9. **`nuxt.options.content` mutations only persist if you mutate, not replace.** Replacing the whole `content.build.markdown.remarkPlugins` object can break, since other modules may have already mutated it. Always merge into the existing object (see `modules/wiki-slug-index/index.ts`).
10. **Don't trust `path?.split('/').pop()` improvisations.** They were the original cause of the URL-divergence bug. Use `slugFromPath` (handles `/-prefix`, `.md`/`.mdx` extension, `#fragment`, trailing slashes, null/undefined uniformly).
11. **`useAsyncData` traps `null` results across SPA navigation in dev.** Dynamic-slug routes (`/wiki/:slug`, `/tag/:slug`) opt out of payload memoization with `import.meta.dev ? { getCachedData: () => undefined } : undefined`. When the dev server briefly fails (e.g. stale `.nuxt` rebuild — see Pitfall #5), the asyncData function can resolve to `null`; Nuxt's payload memoizes that under the route's key, and every subsequent soft-nav back to the same slug renders 404 until a hard refresh. Production prerender is structurally immune — each route gets its own `_payload.json` — so the gate is dev-only and zero-cost-in-production. New dynamic-slug pages should follow the same pattern.
12. **`content/` is gitignored — it does not exist on a fresh clone until something runs the fetch.** `pnpm install` runs `scripts/fetch-content.ts` via `postinstall`, so the normal flow populates it. But if you ever bypass install (e.g., copy `node_modules/` from elsewhere) or wipe it manually (`rm -rf content/`), `pnpm dev` / `pnpm build` will fail with the empty-content guard in `nuxt.config.ts`. Fix: `pnpm fetch-content`. The guard is intentional — without it, an empty `content/` would silently deploy a blank site to production. Bypass only via `NUXT_CONTENT_ALLOW_EMPTY=1` for genuine bootstrap edge cases.
13. **`content-ref.txt` is the version pin; do not hand-edit it in PRs.** It's owned by the upstream content bot. A contributor accidentally bumping it changes which content version production deploys. Code review on PRs touching `content-ref.txt` should require explicit confirmation that the bump is intentional. The diff shows up as `chore(content): bump to <sha>` commits from `fpwiki-content-bot` — those are the trusted ones.
14. **Implicit grid tracks expand to content min-width — `min-w-0` on the leaf doesn't help.** Writing `<section class="grid gap-8 md:grid-cols-3">` with no `grid-cols-1` for mobile leaves the implicit single track at `grid-auto-columns: auto`, which sizes to the **max of children's min-content widths**. A long unbreakable child (e.g. a `truncate` span without all the right ancestors set up) then stretches the track past the viewport, and every layer between (the row, the `<ul>`, the column `<div>`, and the section header with `justify-between`) inherits that width — pushing "Vše →" links off the right edge on iPhone-class widths and producing a page-wide horizontal scrollbar. Two cooperating fixes are required and BOTH matter: (a) make the track explicit with `grid-cols-1 md:grid-cols-3` so mobile gets `repeat(1, minmax(0, 1fr))` instead of auto sizing; (b) on every flex chain inside, pair `truncate` with `min-w-0 flex-1` on the shrinking child and `shrink-0` on the static sibling — Tailwind's `truncate` is just `overflow:hidden; text-overflow:ellipsis; white-space:nowrap` and does **not** add `min-width: 0`, while flex items default to `min-width: auto`. Canonical pattern: `RecentRow.vue`. For `inline-flex` chips like `TagPill`, also add `max-w-full` plus inner `[overflow-wrap:anywhere]` since the pill can't break its own contents otherwise.
15. **Single-line `$$content$$` is never block math.** `micromark-extension-math` `math-flow.js` `meta()` rejects `$` (code 36) before a newline — and the closing `$$` delimiter always contains `$`. So any `$$content$$` on one line fails as block math and falls through to `math-text` (`displayMode: false`). `\tag{}` then throws `ParseError: KaTeX parse error: \tag works only in display equations` and renders as a red `<span class="katex-error">`. Equations without `\tag` silently render at inline size. Fix: `modules/math-display-fix/` registers a `content:file:beforeParse` hook that expands single-line `$$…$$` to a three-line fence before remark parses the file. The bug also affects `$content$` (single-dollar) for the same reason.
16. **`> [!type]` GitHub Alerts are not in `remark-gfm@4`.** `micromark-extension-gfm@3.0.0` includes autolink-literal, footnote, strikethrough, table, and task-list — not Alerts. `> [!warning] text` renders as a plain italic blockquote with visible `[!warning]` text. Fix: `modules/remark-callouts/` injects a custom remark plugin via the `instance` field that transforms matching blockquotes into `<aside class="callout callout-{type}">` elements. The plugin runs first in the remark pipeline so it sees the raw `[!type]` markers before `remark-mdc`/`remark-wiki-link`/`remark-math` consume them.
17. **`nuxt.hook('content:file:beforeParse', ...)` doesn't typecheck under our tsconfig.** `@nuxt/content` adds the hook to `NuxtHooks` via `declare module '@nuxt/schema'` in `dist/module.d.mts`. In principle, `import type { FileBeforeParseHook } from '@nuxt/content'` should pull the augmentation into the program. In practice — under our tsconfig (`verbatimModuleSyntax: true` + `isolatedModules: true` + a hardcoded `@nuxt/schema` paths entry pointing into `.pnpm/`) the augmentation does not reliably merge when typechecking standalone module files, and `pnpm typecheck` errors with `TS2345: Argument of type '"content:file:beforeParse"' is not assignable to parameter of type 'HookKeys<NuxtHooks>'`. Re-declaring the augmentation locally in the same file does NOT help either. The pragmatic fix is `// @ts-expect-error` on the `nuxt.hook(...)` call with a comment pointing here, plus `(ctx: FileBeforeParseHook) => {...}` to keep the callback typed. Runtime is unaffected — the hook fires correctly at build/dev time. The bug only fires under `pnpm typecheck` / pre-push — `pnpm test` and `pnpm dev` succeed because vitest and Nuxt's runtime don't run vue-tsc. Same pattern applies to `content:file:afterParse`. See `modules/math-display-fix/index.ts` for the canonical workaround.
18. **After adding a devDep to `package.json`, run `pnpm install` before pushing.** A devDep that's locked in `pnpm-lock.yaml` but not present in `node_modules/.pnpm/` (because `pnpm install` wasn't re-run after the package.json edit) makes `nuxt prepare` print red `[error]` lines from any module that dynamic-imports it (e.g. `modules/remark-callouts/index.ts` calling `await import('@iconify-json/lucide/icons.json')`). The build appears to "succeed" with `0 icons generated`, callout icons silently disappear from prerendered HTML, and CI logs are clean because CI does run `pnpm install --frozen-lockfile`. Local pre-push (`pnpm typecheck && pnpm test && pnpm content:validate`) is the only place this surfaces. Fix: always `pnpm install` after pulling or after editing `package.json`.
19. **`nuxt dev` on Windows 500s with `Cannot find module '...\.nuxt\\dist\server\server.mjs'`.** `@nuxt/schema` sets `alias['#build'] = withTrailingSlash(buildDir)` by design, and `@nuxt/nitro-server`'s renderer template (`dist/runtime/utils/renderer/build-files.mjs`) imports `"#build/dist/server/server.mjs"`. On Windows the alias substitution produces a path with `//` between `.nuxt` and `dist`, which Node 20+'s Windows ESM resolver rejects. POSIX silently normalises it; CI passes; only Windows local dev breaks. Symptom: every dev request 500s with the message above. Deleting `.nuxt/` does NOT help — the regenerated `.nuxt/dev/index.mjs:2804` still emits `import('file://.../.nuxt//dist/server/server.mjs')` literal, sourced from the upstream alias every time. Fix: in `nuxt.config.ts alias`, add **dev-only** overrides for the three specific runtime entries — `#build/dist/server/server.mjs`, `#build/dist/server/client.manifest.mjs`, `#build/dist/server/client.precomputed.mjs` — pointing to forward-slash absolute paths. THREE constraints: (a) gate on `process.argv[2] === 'dev'` because in production `nuxt build` Rollup tries to read those files at compile-time and fails with ENOENT (they're emitted later); (b) do NOT override `#build` itself — `@nuxt/test-utils` and Vite's virtual-id matcher rely on the trailing-slash form to resolve `#build/nuxt.config.mjs` and `#build/root-component.mjs` to virtual entries, and dropping the trailing slash breaks 19 of 32 test files; (c) use forward slashes (`fileURLToPath(...).replaceAll('\\', '/')`) — Vite keeps separators verbatim and mixed paths break downstream consumers. Same class of bug may affect `#shared`/`#server` if a future dependency emits a similar `file://` import via Rollup externals; document analogous overrides if so. See the `alias: (() => { ... })()` IIFE in `nuxt.config.ts` for the canonical implementation.

## Deferred / non-goals

- **Auth.** Not in MVP. Plan tolerates a lightweight session for personalization (favorites, history) later. Until explicitly scoped, do not introduce auth dependencies.
- **i18n.** Czech-only forever. Do not add `@nuxtjs/i18n`.
- **Playwright e2e.** Not in MVP. Revisit when interactive features grow.
- **Course-metadata fields** (`courseName`, `garant`, `featured`, `examInfo`). Schema accepts them; UI placeholders carry `// TODO(course-meta):` markers; populated in a future content session.
- **Content editing in-app.** Read-only by design. Edits happen upstream in the content corpus.
- **Content sync workflow.** Owned by the upstream content publisher; fpwiki only consumes via `scripts/fetch-content.ts`.

## Working philosophy

- **Single-helper rule for shared logic.** URL construction (`shared/wiki-routes.ts`), course-frontmatter normalization, slug resolution, tag colors, Czech tokenization — each lives in exactly one module. Reuse it; do not parallel-implement. The wiki-routes module is **CI-guarded** against drift; the others rely on convention plus tests.
- **SRP at the route boundary.** Each route has one job. Page-type variation belongs inside `<WikiPage>`. The four routes (`/`, `/courses`, `/wiki/:slug`, `/tag/:slug`) are the entire URL surface; new content shapes do not get new routes.
- **No abstractions for hypothetical needs.** Extend an existing helper/component before creating a new one.
- **Czech in content, English in code.** Frontmatter values, page bodies, and user-facing UI copy are Czech. Variable names, comments, commit messages are English.
- **Branch model.** Work on `test`, merge to `master` once verified. `master` deploys.
- **When you find a silent failure mode, document it.** The "Pitfalls" section is a logbook — add an entry after fixing a bug whose symptom was "wrong but not crashing".
