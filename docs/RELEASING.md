# Releasing ResponsiveKit

This guide walks you through releasing a new version of ResponsiveKit.

## How Releases Work

When you push to `main` with a new version in `package.json`, GitHub Actions automatically:

1. Runs code quality checks
2. Builds the extension for Chrome and Firefox
3. Creates ZIP files ready for distribution
4. Tags the commit with the version
5. Creates a GitHub Release with the ZIPs attached

You just need to update the version and push — the rest is automated!

## Step-by-Step Release

### 1. Make Your Changes

Work on your feature or fix as usual.

### 2. Test Locally

```bash
# Run quality checks
pnpm check

# Type check
pnpm compile

# Test in browser
pnpm dev
```

### 3. Update the Version

Edit `package.json` and bump the version:

```json
{
  "version": "0.1.0-beta.3"
}
```

**Version format:** `MAJOR.MINOR.PATCH` or `MAJOR.MINOR.PATCH-PRERELEASE`

| Change Type | Example | When to Use |
|-------------|---------|-------------|
| Patch | `0.1.1` | Bug fixes, small improvements |
| Minor | `0.2.0` | New features (backward compatible) |
| Major | `1.0.0` | Breaking changes |
| Beta | `0.1.0-beta.2` | Pre-release testing |
| Alpha | `0.1.0-alpha.1` | Early development |

### 4. Update the Changelog

Add your changes to `CHANGELOG.md`:

```markdown
## 0.1.0-beta.3

### Changes

- Add keyboard shortcut support
- Fix breakpoint detection on mobile
- Update dependencies
```

### 5. Commit and Push

```bash
git add .
git commit -m "chore: release v0.1.0-beta.3"
git push
```

That's it! GitHub Actions takes over from here.

### 6. Verify the Release

1. Go to your repository on GitHub
2. Click **Actions** tab to watch the workflow
3. Once complete, check **Releases** for your new release
4. Download and test the ZIPs to make sure everything works

## Release Artifacts

Each release creates two ZIP files in `.output/`:

| File | Browser |
|------|---------|
| `responsive-kit-{version}-chrome.zip` | Chrome, Edge, Brave, Opera |
| `responsive-kit-{version}-firefox.zip` | Firefox |

## CI/CD Details

**Workflow file:** `.github/workflows/release.yml`

**Triggers:**
- Automatic: Push to `main` branch
- Manual: GitHub Actions → Release → Run workflow

**What it does:**
1. Checks out code
2. Installs dependencies with pnpm
3. Runs `pnpm check` (Biome lint + format)
4. Runs `pnpm compile` (TypeScript check)
5. Runs `pnpm zip` (builds + zips Chrome extension)
6. Runs `pnpm zip:firefox` (builds + zips Firefox extension)
7. Creates git tag `v{version}`
8. Creates GitHub Release with both ZIPs

**Pre-release detection:** Versions containing `beta` or `alpha` are automatically marked as pre-releases on GitHub.

## Manual Release

If you need to release without CI (e.g., CI is down):

```bash
# 1. Build and zip
pnpm zip
pnpm zip:firefox

# 2. Create and push tag
VERSION=$(node -p "require('./package.json').version")
git tag "v$VERSION"
git push origin "v$VERSION"

# 3. Go to GitHub → Releases → Draft a new release
# 4. Select your tag
# 5. Upload the ZIPs from .output/
# 6. Publish
```

## Troubleshooting

### Release didn't trigger

- Make sure you pushed to `main` branch
- Check if the version in `package.json` actually changed
- Look at Actions tab for any errors

### Tag already exists

The workflow skips release if the tag already exists. Either:
- Bump to a new version, or
- Delete the existing tag: `git push origin :refs/tags/v0.1.0-beta.2`

### Build failed

- Run `pnpm check` and `pnpm compile` locally to see errors
- Fix issues and push again

### ZIPs not attached to release

- Check the workflow logs for errors in the zip step
- Verify `.output/` contains the ZIP files locally with `pnpm zip`

## Quick Reference

```bash
# Development
pnpm dev              # Start dev server (Chrome)
pnpm dev:firefox      # Start dev server (Firefox)

# Quality checks
pnpm check            # Lint + format check
pnpm check:fix        # Auto-fix issues
pnpm compile          # TypeScript check

# Build
pnpm build            # Build Chrome extension
pnpm build:firefox    # Build Firefox extension
pnpm zip              # Build + zip Chrome
pnpm zip:firefox      # Build + zip Firefox

# Clean
pnpm clean            # Remove build artifacts
```

## Release Checklist

Before pushing:

- [ ] Code changes are complete and tested
- [ ] `pnpm check` passes
- [ ] `pnpm compile` passes
- [ ] Version bumped in `package.json`
- [ ] `CHANGELOG.md` updated
- [ ] Tested in Chrome (`pnpm dev`)
- [ ] Tested in Firefox (`pnpm dev:firefox`)

After pushing:

- [ ] GitHub Actions workflow completed successfully
- [ ] Release appears in GitHub Releases
- [ ] Downloaded ZIPs work correctly
