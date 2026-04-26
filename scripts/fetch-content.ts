#!/usr/bin/env tsx
/**
 * Build-time content fetcher.
 *
 * Downloads a tarball of `fpwiki-content` at the SHA recorded in
 * `content-ref.txt`, extracts it into a SHA-keyed cache, and mirrors the
 * extracted tree into this repo's `content/` and `public/wiki-assets/`.
 *
 * The mirrored directories are .gitignored — fpwiki never tracks content in
 * git. Cache hits are network-free (just a copy from .cache); misses fetch
 * from GitHub's codeload CDN.
 *
 * Lifecycle:
 *   - postinstall: runs once on `pnpm install` so a fresh clone has content.
 *   - predev / prebuild / pregenerate / prepreview: re-checks the SHA on
 *     every `pnpm dev`, `pnpm build`, etc. Cache hit = instant.
 *
 * Env overrides (advanced — see CONTRIBUTING.md):
 *   FPWIKI_CONTENT_REF=<sha-or-branch>  ignore content-ref.txt; fetch this ref
 *   FPWIKI_CONTENT_LOCAL=<dir>          mirror from <dir> instead of fetching
 *   FPWIKI_CONTENT_FORCE=1              re-download even on cache hit
 *   FPWIKI_CONTENT_REPO=<owner/repo>    override source repo (default: ondrahracek/fpwiki-content)
 *   FPWIKI_SKIP_FETCH=1                 skip entirely (rely on existing files)
 */
import { mkdir, readFile, rm, cp, readdir, writeFile, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import process from 'node:process'
import * as tar from 'tar'

const ROOT = process.cwd()
const REF_FILE = join(ROOT, 'content-ref.txt')
const CACHE_ROOT = join(ROOT, '.cache', 'content')
const CONTENT_DIR = join(ROOT, 'content')
const ASSETS_DIR = join(ROOT, 'public', 'wiki-assets')
const DEFAULT_REPO = 'ondrahracek/fpwiki-content'
const SHA_RE = /^[0-9a-f]{40}$/
const SENTINEL = '.complete'
const KEEP_RECENT = 5
const RETRIES = 3
const BACKOFF_MS = [0, 1500, 4000] // before attempt 1, 2, 3

type Mode =
  | { kind: 'sha'; sha: string; source: string }
  | { kind: 'branch'; name: string; source: string }
  | { kind: 'local'; dir: string }

function log(msg: string) {
  console.log(`[fetch-content] ${msg}`)
}
function warn(msg: string) {
  console.warn(`[fetch-content] WARN: ${msg}`)
}
function die(msg: string): never {
  console.error(`[fetch-content] ERROR: ${msg}`)
  process.exit(1)
}

function repo(): string {
  return process.env.FPWIKI_CONTENT_REPO || DEFAULT_REPO
}

async function readRef(): Promise<string> {
  let raw: string
  try {
    raw = await readFile(REF_FILE, 'utf8')
  } catch {
    die(
      `content-ref.txt not found at ${REF_FILE}. Run \`pnpm install\` to bootstrap, or create it manually with a 40-char SHA from https://github.com/${repo()}/commits.`,
    )
  }
  // Trim BOM (U+FEFF), all whitespace, all newlines.
  const trimmed = raw.replace(/^\uFEFF/, '').trim()
  if (!SHA_RE.test(trimmed)) {
    const hex = Buffer.from(raw.slice(0, 80)).toString('hex')
    die(
      `content-ref.txt malformed. Expected 40-char hex SHA. Got ${trimmed.length} chars; first 80 raw bytes (hex): ${hex}`,
    )
  }
  return trimmed
}

async function pickMode(): Promise<Mode> {
  if (process.env.FPWIKI_CONTENT_LOCAL) {
    const dir = resolve(process.env.FPWIKI_CONTENT_LOCAL)
    if (!existsSync(dir)) die(`FPWIKI_CONTENT_LOCAL=${dir} does not exist.`)
    return { kind: 'local', dir }
  }
  const refOverride = process.env.FPWIKI_CONTENT_REF
  if (refOverride) {
    if (SHA_RE.test(refOverride)) {
      return { kind: 'sha', sha: refOverride, source: 'env FPWIKI_CONTENT_REF' }
    }
    return { kind: 'branch', name: refOverride, source: 'env FPWIKI_CONTENT_REF' }
  }
  const sha = await readRef()
  return { kind: 'sha', sha, source: 'content-ref.txt' }
}

function cacheDir(sha: string): string {
  return join(CACHE_ROOT, sha)
}

function forceFromArgsOrEnv(): boolean {
  return process.env.FPWIKI_CONTENT_FORCE === '1' || process.argv.includes('--force')
}

async function isCacheComplete(dir: string): Promise<boolean> {
  if (forceFromArgsOrEnv()) return false
  return existsSync(join(dir, SENTINEL))
}

function tarballUrl(ref: string): string {
  return `https://codeload.github.com/${repo()}/tar.gz/${ref}`
}

async function downloadAndExtract(ref: string, destDir: string): Promise<void> {
  const url = tarballUrl(ref)
  const tmpDir = `${destDir}.tmp.${process.pid}`
  // Clean any prior tmp from a crashed run.
  await rm(tmpDir, { recursive: true, force: true })
  await mkdir(tmpDir, { recursive: true })
  log(`Fetching ${url}`)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText} for ${url}`)
  }
  if (!response.body) {
    throw new Error(`Empty response body from ${url}`)
  }
  // tar.x with a Readable input stream + strip:1 removes the wrapping
  // `<repo>-<ref>/` directory that GitHub's codeload tarballs add.
  await pipeline(Readable.fromWeb(response.body as never), tar.x({ cwd: tmpDir, strip: 1 }))
  // Validate layout BEFORE atomic rename, so we never publish a broken cache.
  const entries = await readdir(tmpDir)
  const hasContent = entries.includes('content')
  const hasAssets = entries.includes('wiki-assets')
  if (!hasContent || !hasAssets) {
    await rm(tmpDir, { recursive: true, force: true })
    throw new Error(
      `Extracted tarball is missing required dirs. Expected content/ and wiki-assets/. Got: ${entries.join(', ')}`,
    )
  }
  // Atomic-ish rename. On Windows, rename across same volume is atomic.
  await rm(destDir, { recursive: true, force: true })
  // Use cp+rm rather than rename, because rename across nested mkdir paths
  // can fail on Windows when the destination's parent doesn't exist yet.
  await mkdir(CACHE_ROOT, { recursive: true })
  await cp(tmpDir, destDir, { recursive: true })
  await rm(tmpDir, { recursive: true, force: true })
  // Sentinel written LAST = the marker that this cache entry is complete.
  await writeFile(join(destDir, SENTINEL), `${ref}\n${new Date().toISOString()}\n`, 'utf8')
}

async function downloadWithRetry(ref: string, destDir: string): Promise<void> {
  let lastErr: unknown
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    if (BACKOFF_MS[attempt - 1] > 0) {
      await new Promise((r) => setTimeout(r, BACKOFF_MS[attempt - 1]))
    }
    try {
      await downloadAndExtract(ref, destDir)
      return
    } catch (err) {
      lastErr = err
      const msg = err instanceof Error ? err.message : String(err)
      warn(`Attempt ${attempt}/${RETRIES} failed: ${msg}`)
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr))
}

async function findFallbackCache(): Promise<string | null> {
  if (!existsSync(CACHE_ROOT)) return null
  const dirs = await readdir(CACHE_ROOT, { withFileTypes: true })
  const candidates: { name: string; mtime: number }[] = []
  for (const d of dirs) {
    if (!d.isDirectory()) continue
    if (!SHA_RE.test(d.name)) continue
    const dir = join(CACHE_ROOT, d.name)
    if (!(await isCacheComplete(dir))) continue
    const s = await stat(dir)
    candidates.push({ name: d.name, mtime: s.mtimeMs })
  }
  if (candidates.length === 0) return null
  candidates.sort((a, b) => b.mtime - a.mtime)
  return join(CACHE_ROOT, candidates[0]!.name)
}

async function mirror(srcDir: string): Promise<void> {
  const srcContent = join(srcDir, 'content')
  const srcAssets = join(srcDir, 'wiki-assets')
  if (!existsSync(srcContent) || !existsSync(srcAssets)) {
    die(
      `Source ${srcDir} is missing content/ or wiki-assets/. Run with FPWIKI_CONTENT_FORCE=1 to re-fetch.`,
    )
  }
  // Wipe + copy. Plain copy (not symlink) on every platform — eliminates
  // write-through-symlink pollution of the cache.
  await rm(CONTENT_DIR, { recursive: true, force: true })
  await rm(ASSETS_DIR, { recursive: true, force: true })
  await mkdir(CONTENT_DIR, { recursive: true })
  await mkdir(ASSETS_DIR, { recursive: true })
  await cp(srcContent, CONTENT_DIR, { recursive: true })
  await cp(srcAssets, ASSETS_DIR, { recursive: true })
}

async function gcOldCache(keepSha: string | null): Promise<void> {
  if (!existsSync(CACHE_ROOT)) return
  const dirs = await readdir(CACHE_ROOT, { withFileTypes: true })
  const entries: { name: string; path: string; mtime: number }[] = []
  for (const d of dirs) {
    if (!d.isDirectory() || !SHA_RE.test(d.name)) continue
    const path = join(CACHE_ROOT, d.name)
    const s = await stat(path)
    entries.push({ name: d.name, path, mtime: s.mtimeMs })
  }
  entries.sort((a, b) => b.mtime - a.mtime)
  // Always keep the active SHA's cache, even if it's the oldest by mtime.
  const keep = new Set<string>(entries.slice(0, KEEP_RECENT).map((e) => e.name))
  if (keepSha) keep.add(keepSha)
  for (const e of entries) {
    if (!keep.has(e.name)) {
      await rm(e.path, { recursive: true, force: true })
      log(`gc: removed stale cache ${e.name.slice(0, 12)}`)
    }
  }
}

async function main(): Promise<void> {
  if (process.env.FPWIKI_SKIP_FETCH) {
    log('FPWIKI_SKIP_FETCH=1 — skipping. Existing content/ will be used as-is.')
    return
  }

  const mode = await pickMode()

  // Local-source fast path.
  if (mode.kind === 'local') {
    log(`Mirroring from local: ${mode.dir}`)
    await mirror(mode.dir)
    log(`Done. content/ and public/wiki-assets/ now reflect ${mode.dir}.`)
    return
  }

  // Branch ref: never cache by name; always re-fetch. We resolve to the
  // tarball directly; the cache key is the URL, so use a name-based slot.
  if (mode.kind === 'branch') {
    const slot = join(CACHE_ROOT, `branch-${mode.name}`)
    log(`Branch override: fetching ${repo()}@${mode.name} (no cache reuse)`)
    try {
      await downloadWithRetry(mode.name, slot)
      await mirror(slot)
      log(`Done. content/ now reflects ${repo()}@${mode.name}.`)
    } catch (err) {
      die(
        `Failed to fetch branch ${mode.name}: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
    return
  }

  // SHA mode (the steady state).
  const dir = cacheDir(mode.sha)
  const short = mode.sha.slice(0, 12)

  if (await isCacheComplete(dir)) {
    log(`Cache hit ${short} (from ${mode.source})`)
    await mirror(dir)
    log(`Done. content/ and public/wiki-assets/ now reflect ${repo()}@${short}.`)
    return
  }

  log(`Cache miss ${short} (from ${mode.source}); will fetch.`)
  try {
    await downloadWithRetry(mode.sha, dir)
    await mirror(dir)
    log(`Done. content/ and public/wiki-assets/ now reflect ${repo()}@${short}.`)
    await gcOldCache(mode.sha)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    warn(`Fetch failed: ${msg}`)
    const fallback = await findFallbackCache()
    if (fallback) {
      const fallbackSha = fallback.split(/[\\/]/).pop()!.slice(0, 12)
      warn(
        `Using stale cache ${fallbackSha} as fallback. Run \`pnpm fetch-content\` while online to refresh.`,
      )
      await mirror(fallback)
      // Soft success — exit 0 so postinstall doesn't break offline clones.
      return
    }
    die(
      `Cannot fetch ${short} and no fallback cache exists. Check network and try again. URL: ${tarballUrl(mode.sha)}`,
    )
  }
}

main().catch((err) => {
  const msg = err instanceof Error ? err.stack || err.message : String(err)
  die(`Unhandled: ${msg}`)
})
