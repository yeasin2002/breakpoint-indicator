# CI/CD Pipeline

This document explains the automated release workflow for ResponsiveKit.

## Overview

The project uses GitHub Actions to automatically build and release the extension when version changes are detected via Changesets.

## Workflow File

Location: `.github/workflows/release.yml`

## How It Works

### Automatic Releases (via Changesets)

1. **Developer adds changeset**
   ```bash
   pnpm changeset:add
   git add .
   git commit -m "feat: new feature"
   git push
   ```

2. **GitHub Action triggers** on push to `main` branch

3. **Changesets Action**
   - Detects pending changesets
   - Creates a "Version Packages" PR automatically
   - PR includes version bump and changelog updates

4. **Merge Version PR**
   - Review and merge the "Version Packages" PR
   - This triggers the release workflow

5. **Build & Release**
   - Runs code quality checks
   - Builds Chrome extension
   - Builds Firefox extension
   - Creates ZIP files with version naming
   - Creates GitHub Release with both ZIPs attached

### Manual Releases

You can also trigger the workflow manually:

1. Go to GitHub Actions tab
2. Select "Release" workflow
3. Click "Run workflow"
4. Select branch (usually `main`)
5. Click "Run workflow" button

## Release Artifacts

Each release creates two ZIP files:

- `responsive-kit-{version}-chrome.zip` - For Chrome/Edge
- `responsive-kit-{version}-firefox.zip` - For Firefox

**Example:**
- `responsive-kit-0.1.0-beta.1-chrome.zip`
- `responsive-kit-0.1.0-beta.1-firefox.zip`

## Workflow Steps

### 1. Setup
- Checkout code
- Setup pnpm and Node.js
- Install dependencies

### 2. Quality Checks
- Run Biome linter/formatter (`pnpm check:fix`)
- Run TypeScript type checking (`pnpm compile`)

### 3. Version Management
- Changesets Action checks for pending changesets
- If found, creates/updates "Version Packages" PR
- If PR is merged, proceeds to build

### 4. Build
- Build Chrome extension (`pnpm build`)
- Build Firefox extension (`pnpm build:firefox`)
- Create Chrome ZIP (`pnpm zip`)
- Create Firefox ZIP (`pnpm zip:firefox`)

### 5. Release
- Rename ZIPs with version number
- Create GitHub Release
- Attach both ZIP files
- Mark as pre-release if version contains `beta`, `alpha`, or `rc`

## Release Types

### Pre-release (Beta/Alpha/RC)

Versions containing `beta`, `alpha`, or `rc` are marked as pre-releases:
- `0.1.0-beta.1` → Pre-release ✅
- `0.1.0-alpha.1` → Pre-release ✅
- `1.0.0-rc.1` → Pre-release ✅

### Stable Release

Versions without pre-release tags are marked as stable:
- `1.0.0` → Stable release ✅
- `1.2.3` → Stable release ✅

## Complete Release Workflow

### Step-by-Step Guide

**1. Make changes and add changeset:**
```bash
# Make your code changes
git checkout -b feat/new-feature

# Add changeset
pnpm changeset:add
# Select: patch/minor/major
# Write: "Add new feature description"

# Commit
git add .
git commit -m "feat: add new feature"
git push origin feat/new-feature
```

**2. Create and merge PR:**
```bash
# Create PR on GitHub
# Get it reviewed and approved
# Merge to main
```

**3. Wait for Version PR:**
- GitHub Action automatically creates "Version Packages" PR
- PR contains:
  - Updated `package.json` version
  - Updated `CHANGELOG.md`
  - Consumed changeset files (deleted)

**4. Review and merge Version PR:**
- Review the version bump and changelog
- Merge the "Version Packages" PR

**5. Automatic release:**
- GitHub Action automatically:
  - Builds both extensions
  - Creates ZIPs
  - Creates GitHub Release
  - Attaches ZIPs to release

**6. Download and test:**
- Go to GitHub Releases
- Download the ZIP files
- Test in Chrome and Firefox

## Troubleshooting

### Workflow not triggering

**Problem:** Pushed to main but workflow didn't run

**Solution:**
- Check if `.github/workflows/release.yml` exists
- Verify you pushed to `main` branch
- Check GitHub Actions tab for errors

### No release created

**Problem:** Workflow ran but no release was created

**Solution:**
- Check if there were pending changesets
- Verify the "Version Packages" PR was merged
- Check workflow logs for errors

### ZIP files not found

**Problem:** Release created but ZIP files missing

**Solution:**
- Check build logs for errors
- Verify `pnpm build` and `pnpm zip` commands work locally
- Check if `.output/` directory contains ZIPs

### Wrong version number

**Problem:** Release has wrong version number

**Solution:**
- Check `package.json` version
- Verify changesets were properly consumed
- Manually update version if needed

## Manual Release (Without CI)

If you need to create a release manually:

```bash
# 1. Update version
pnpm changeset:version

# 2. Build
pnpm build
pnpm build:firefox

# 3. Create ZIPs
pnpm zip
pnpm zip:firefox

# 4. Rename ZIPs
VERSION=$(node -p "require('./package.json').version")
mv .output/responsive-kit-*.zip .output/responsive-kit-$VERSION-chrome.zip
mv .output/responsive-kit-*-firefox.zip .output/responsive-kit-$VERSION-firefox.zip

# 5. Commit and tag
git add .
git commit -m "chore: release v$VERSION"
git tag v$VERSION
git push && git push --tags

# 6. Create GitHub Release manually
# Go to GitHub → Releases → Draft a new release
# Upload the ZIP files
```

## Environment Variables

The workflow uses these GitHub secrets:

- `GITHUB_TOKEN` - Automatically provided by GitHub Actions

No additional secrets needed for GitHub Releases.

## Permissions

The workflow requires these permissions:
- `contents: write` - To create releases and tags
- `pull-requests: write` - To create Version Packages PR

These are configured in the workflow file.

## Best Practices

### DO ✅

- Always add changesets for user-facing changes
- Review Version Packages PR before merging
- Test releases in both Chrome and Firefox
- Keep changelog up to date
- Use semantic versioning correctly

### DON'T ❌

- Don't manually edit version in `package.json`
- Don't skip changesets
- Don't merge Version PR without review
- Don't create releases without testing
- Don't forget to test downloaded ZIPs

## Monitoring

### Check Workflow Status

1. Go to GitHub repository
2. Click "Actions" tab
3. View recent workflow runs
4. Click on a run to see detailed logs

### Check Releases

1. Go to GitHub repository
2. Click "Releases" section
3. View all published releases
4. Download and test ZIPs

## Future Enhancements

Potential improvements to the CI/CD pipeline:

- Add automated testing before release
- Add browser compatibility checks
- Add bundle size reporting
- Add performance benchmarks
- Add automated screenshots
- Add release notes generation from commits
- Add Slack/Discord notifications
- Add automatic Chrome Web Store publishing
- Add automatic Firefox Addon Store publishing

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Changesets Action](https://github.com/changesets/action)
- [WXT Publishing Guide](https://wxt.dev/guide/essentials/publishing.html)
- [Project CHANGESETS.md](./CHANGESETS.md)
