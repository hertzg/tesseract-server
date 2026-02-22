# Phase 1: Fix CI Pipeline

## Problem

The CI pipeline is completely broken. The `build` job fails immediately before any code compiles, causing all downstream Docker jobs to be skipped. All 10 open Renovate PRs have failing CI checks.

**Root cause:** GitHub fully deprecated `actions/upload-artifact@v3` and `actions/download-artifact@v3` on November 30, 2024. The workflow used both, plus third-party actions (`ishworkh/docker-image-artifact-*@v1`) that also depend on artifact v3 internally.

**Secondary issue:** Three conditions in the workflow reference `hertzg/rtl_433_docker` (a different project) instead of `hertzg/tesseract-server`, which is a copy-paste bug that breaks Docker registry login for same-repo PRs.

## Changes (`.github/workflows/cicd.yml`)

### 1. Upgrade artifact actions (primary fix)

`actions/upload-artifact@v3` -> `@v4` (lines 61, 66)
`actions/download-artifact@v3` -> `@v4` (line 167)

Artifact names (`dist.prod` and `dist`) are already unique per workflow run, so no additional changes needed for v4 compatibility.

### 2. Upgrade docker image artifact actions

The `ishworkh/docker-image-artifact-*@v1` actions are deprecated and use artifact v3 internally. Their maintained successors use artifact v4:

- `ishworkh/docker-image-artifact-upload@v1` -> `ishworkh/container-image-artifact-upload@v2.0.0`
- `ishworkh/docker-image-artifact-download@v1` -> `ishworkh/container-image-artifact-download@v2.1.0` (3 occurrences)

### 3. Fix wrong repository name (copy-paste bug)

Three conditions referenced `hertzg/rtl_433_docker` instead of `hertzg/tesseract-server`:

- `docker-build` job: DockerHub login condition
- `docker-build` job: GHCR login condition
- `docker-push` job: job-level `if` condition

### 4. Upgrade other outdated GitHub Actions

- `docker/build-push-action@v5` -> `@v6`
- `codecov/codecov-action@v4` -> `@v5`

## Expected Behavior After Fix

- **lint, build, test**: Should pass (no longer blocked by deprecated actions)
- **docker, docker-build, docker-test, docker-dive**: Should pass on PRs
- **docker-push, docker-multiarch**: Will skip on PRs from the same repo (expected - these only run on tag pushes or PRs from forks with secrets access)
