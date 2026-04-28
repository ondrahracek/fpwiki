#!/usr/bin/env node
/**
 * One-time per-clone git setup. Idempotent — safe to run on every install.
 *
 * Registers a `merge.ours.driver = true` git config so that the
 * `merge=ours` attribute on content-ref.txt (see .gitattributes) actually
 * does what it says. Without this, git would error out on merge:
 *   "Driver `ours` not registered" → falls back to a regular 3-way merge,
 *   which conflicts every time because each branch's content-ref.txt
 *   points at a different fpwiki-content SHA.
 *
 * No-op (silent) outside a git checkout (e.g., Firebase App Hosting builds
 * receive a flat tarball, no `.git/`). Always exits 0 to keep `pnpm install`
 * happy in any environment.
 */
import { execSync } from 'node:child_process'

try {
  // `true` is the Unix `true` command — does nothing, exits 0. As a merge
  // driver this means "leave the file at its current (ours) state on
  // conflict", which is exactly the intended behaviour for content-ref.txt.
  execSync('git config merge.ours.driver true', { stdio: 'ignore' })
} catch {
  // Not a git checkout, or git isn't on PATH. Both are acceptable; this
  // setup only matters in environments where humans run `git merge`.
}
