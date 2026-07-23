# Commit 1: Project scaffold

## What this commit does
Creates the base project using Vite's official `vue-ts` template and initializes
a git repository. This is the foundation every later commit builds on.

## Command run
```
npm create vite@latest taskflow -- --template vue-ts
```
- `npm create vite@latest` downloads and runs the `create-vite` package without
  installing it globally, always pulling the latest version.
- `taskflow` is the target folder name (equal to `-ProjectName`).
- Everything after the standalone `--` is passed through to `create-vite` itself,
  not interpreted by `npm`. `--template vue-ts` skips create-vite's interactive
  prompt and picks the Vue + TypeScript starter directly, which gives us:
  - `index.html` - the single HTML entry point Vite serves.
  - `src/main.ts` - the app's TypeScript entry point.
  - `src/App.vue` - the root single-file component.
  - `vite.config.ts` - Vite's own configuration file.
  - `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` - TypeScript
    project references, one for app code and one for Node-only config files
    (like `vite.config.ts` itself).
  - `package.json` with `dev`, `build`, and `preview` npm scripts already wired
    to Vite.

## Git initialization
```
git init
git config user.name  "TaskFlow Bot"
git config user.email "bot@example.local"
```
- `git init` creates the `.git` directory, turning this folder into a git
  repository with no commits yet.
- The two `git config` calls set a local (repository-scoped, not global)
  author identity, so `git commit` has something to attribute commits to even
  on a machine where git has never been configured before. Replace these with
  your own name/email later with `git config user.name "..."` if you want the
  commit history to reflect you instead.

## Why this matters for a "professional" app
Starting from the official scaffold (rather than hand-rolling `package.json`
and Vite config from scratch) guarantees the TypeScript, Vite, and Vue
versions are all mutually compatible, and gives us a known-good baseline to
diff against as we layer on Pinia, Sass, routing, and tests in later commits.