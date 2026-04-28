# Contributing to fpwiki

Thanks for your interest. This is a Czech-language read-only wiki for FP VUT
students; this repo is the **web app**, not the content. The content lives in
a separate public repo and is fetched into this one at build time.

## What you can change here

- The Vue/TypeScript code in `app/`
- Shared types and helpers in `shared/`
- Build modules in `modules/`
- Build scripts in `scripts/`
- Project config (`nuxt.config.ts`, `app.config.ts`, `package.json`, etc.)
- Tests in `test/`
- Documentation (`README.md`, `CLAUDE.md`, this file, etc.)

## What you cannot change here

- Anything inside `content/` or `public/wiki-assets/`. Those directories are
  populated by `scripts/fetch-content.ts` and `.gitignored` — git refuses to
  track them. To fix a typo or add a topic, open an issue describing what
  should change. Edits applied to these directories locally will be wiped on
  the next `pnpm install` / `pnpm dev` / `pnpm build` (the fetch script
  rewrites both directories from cache on every run).

## Quick start

```sh
pnpm install   # also runs scripts/fetch-content.ts → content/ and public/wiki-assets/ appear
pnpm dev       # opens dev server at http://localhost:3000
```

That's it. The first install pulls the content tarball from
[fpwiki-content](https://github.com/ondrahracek/fpwiki-content) at the SHA
recorded in `content-ref.txt`, extracts it into `.cache/content/<sha>/`, and
mirrors it into `content/` and `public/wiki-assets/`. Subsequent `pnpm dev`
starts hit the cache and finish in milliseconds.

## How content sync works

```
content-ref.txt  -- pinned SHA of the fpwiki-content commit to use
       │
       ▼
scripts/fetch-content.ts  -- on predev/prebuild/postinstall
       │
       ├── cache hit  → mirror .cache/content/<sha>/ → content/ + public/wiki-assets/
       └── cache miss → download tarball from codeload.github.com,
                         extract to .cache/content/<sha>/, then mirror as above
```

Because `content/` and `public/wiki-assets/` are gitignored, a fpwiki branch
diff is purely code — no merge conflicts on markdown ever, regardless of when
content is updated upstream. Reproducibility: any historical fpwiki commit
can be rebuilt with the exact content that was deployed at that time, just by
re-running `pnpm fetch-content` against its `content-ref.txt`.

The `content-ref.txt` file itself is updated by an automated bot whenever new
content is published upstream. Don't edit it by hand in PRs unless you are
intentionally pinning the build to a specific historical content version.

## Working offline

Once you've fetched any content version while online, the cache lives in
`.cache/content/<sha>/`. fpwiki's fetch script will fall back to the most
recent cached version if the network is unreachable — so after a single
online `pnpm install`, you can `pnpm dev` indefinitely on a plane.

## Power-user environment overrides

`scripts/fetch-content.ts` honors a few env vars for advanced workflows:

| Var                                     | Effect                                                                                                                                        |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `FPWIKI_CONTENT_REF=<sha-or-branch>`    | Ignore `content-ref.txt`; fetch this ref. Branches (e.g. `master`) skip the cache and always re-download.                                     |
| `FPWIKI_CONTENT_LOCAL=<dir>`            | Skip download entirely; mirror from this local directory. The directory must contain `content/` and `wiki-assets/` subdirs.                   |
| `FPWIKI_CONTENT_FORCE=1` (or `--force`) | Re-download even on cache hit.                                                                                                                |
| `FPWIKI_CONTENT_REPO=<owner/repo>`      | Override the source repo (default: `ondrahracek/fpwiki-content`).                                                                             |
| `FPWIKI_SKIP_FETCH=1`                   | Skip the script entirely; use whatever's already on disk. The empty-content guard in `nuxt.config.ts` will still fail if `content/` is empty. |

Examples:

```sh
# Preview whatever's at fpwiki-content's master tip right now (not the pinned SHA)
FPWIKI_CONTENT_REF=master pnpm dev

# Mirror from a sibling checkout of fpwiki-content (live editing)
FPWIKI_CONTENT_LOCAL=../fpwiki-content pnpm dev

# Wipe and re-download the pinned SHA (cache recovery)
pnpm content:refresh
```

## Commit conventions

Conventional Commits — `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`,
`test:`, `ci:`, `build:`, `perf:`. Enforced by commitlint at commit time.

## Pre-commit / pre-push

- **pre-commit**: `lint-staged` (eslint --fix + prettier --write on staged files)
- **pre-push**: `pnpm typecheck && pnpm test && pnpm content:validate`

If a hook fails, fix the underlying issue. **Do not use `--no-verify`.**

## Branch model

Work on `test`, merge to `master` once verified. `master` deploys to
[fpwiki.cz](https://fpwiki.cz) via Firebase App Hosting on every push.

Branch merges (test↔master) **never conflict on `content-ref.txt`** even
though the two branches always pin different SHAs. A `merge=ours` driver
in `.gitattributes` keeps the current branch's value automatically. The
driver is registered per-clone by `scripts/setup-git.mjs`, chained from
`postinstall` — so as long as you've run `pnpm install` once, you'll
never see a conflict on this file. (Rationale: content-ref.txt is owned
by the upstream content bot, which pushes directly to each branch; it
must never propagate via human merge. See CLAUDE.md Pitfall #20.)

## Where to ask questions

Open an issue. Czech or English both fine.
