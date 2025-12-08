# Changesets Guide

This project uses [Changesets](https://github.com/changesets/changesets) for version management and changelog generation.

## What is Changesets?

Changesets is a tool that helps manage versions and changelogs with a focus on multi-package repositories. It makes versioning simple by:

1. Recording changes as you make them
2. Automatically updating versions based on changes
3. Generating changelogs automatically
4. Supporting semantic versioning

## Quick Start

### 1. Making Changes

When you make a change that should be released:

```bash
pnpm changeset:add
```

This will:
1. Ask what type of change you made (major, minor, patch)
2. Ask for a summary of the change
3. Create a changeset file in `.changeset/`

### 2. Releasing Changes

When ready to release:

```bash
pnpm release
```

This will:
1. Run code quality checks (`check:fix`)
2. Run TypeScript compilation (`compile`)
3. Build the extension (`build`)
4. Update version in `package.json`
5. Generate/update `CHANGELOG.md`
6. Delete consumed changeset files

### 3. Commit and Tag

```bash
git add .
git commit -m "chore: release v0.1.0-beta.2"
git tag v0.1.0-beta.2
git push && git push --tags
```

## Available Commands

| Command | Description |
|---------|-------------|
| `pnpm changeset` | Interactive CLI (same as `changeset:add`) |
| `pnpm changeset:add` | Add a new changeset |
| `pnpm changeset:version` | Update versions and generate changelog |
| `pnpm changeset:publish` | Publish to npm (not used for extensions) |
| `pnpm release` | Full release workflow (recommended) |

## Change Types

### Patch (0.1.0 → 0.1.1)

Bug fixes and minor changes that don't affect the API.

**Examples:**
- Fix: DevTool not showing on some websites
- Fix: Incorrect breakpoint detection
- Chore: Update dependencies
- Docs: Fix typo in README

**Command:**
```bash
pnpm changeset:add
# Select: patch
```

### Minor (0.1.0 → 0.2.0)

New features that are backward-compatible.

**Examples:**
- Feature: Add keyboard shortcut support
- Feature: Customizable position
- Feature: Export screen info as JSON
- Enhancement: Improve animation performance

**Command:**
```bash
pnpm changeset:add
# Select: minor
```

### Major (0.1.0 → 1.0.0)

Breaking changes that affect existing functionality.

**Examples:**
- Breaking: Change message format between background and content script
- Breaking: Remove deprecated API
- Breaking: Restructure component props
- Breaking: Change storage format

**Command:**
```bash
pnpm changeset:add
# Select: major
```

## Workflow Examples

### Example 1: Bug Fix

```bash
# 1. Fix the bug in your code
# 2. Add a changeset
pnpm changeset:add
# Select: patch
# Summary: "Fix breakpoint detection on mobile devices"

# 3. Commit the changeset
git add .
git commit -m "fix: breakpoint detection on mobile"

# 4. When ready to release
pnpm release
git add .
git commit -m "chore: release v0.1.1-beta.1"
git tag v0.1.1-beta.1
git push && git push --tags
```

### Example 2: New Feature

```bash
# 1. Implement the feature
# 2. Add a changeset
pnpm changeset:add
# Select: minor
# Summary: "Add keyboard shortcut to toggle DevTool"

# 3. Commit the changeset
git add .
git commit -m "feat: add keyboard shortcut support"

# 4. When ready to release
pnpm release
git add .
git commit -m "chore: release v0.2.0-beta.1"
git tag v0.2.0-beta.1
git push && git push --tags
```

### Example 3: Multiple Changes

```bash
# 1. Make first change
pnpm changeset:add
# Select: patch
# Summary: "Fix animation glitch"

# 2. Make second change
pnpm changeset:add
# Select: minor
# Summary: "Add export to JSON feature"

# 3. Make third change
pnpm changeset:add
# Select: patch
# Summary: "Update dependencies"

# 4. Commit all changesets
git add .
git commit -m "feat: multiple improvements"

# 5. Release (will bump to 0.2.0 because of minor change)
pnpm release
git add .
git commit -m "chore: release v0.2.0-beta.1"
git tag v0.2.0-beta.1
git push && git push --tags
```

## Pre-release Versions

### Creating Pre-releases

For beta versions:

```bash
# Enter pre-release mode
pnpm changeset pre enter beta

# Add changes
pnpm changeset:add

# Version (will create 0.1.0-beta.2, 0.1.0-beta.3, etc.)
pnpm changeset:version

# Exit pre-release mode when ready for stable
pnpm changeset pre exit
```

### Current Pre-release Strategy

Since we're already at `0.1.0-beta.1`, continue with:

```bash
# Add changes normally
pnpm changeset:add

# When versioning, manually adjust to beta format
pnpm changeset:version
# Then manually edit package.json if needed: 0.1.1 → 0.1.1-beta.1
```

Or use pre-release mode:

```bash
pnpm changeset pre enter beta
pnpm changeset:add
pnpm changeset:version  # Will create 0.1.0-beta.2
```

## Changeset File Format

Changeset files are stored in `.changeset/` and look like:

```markdown
---
"responsive-kit": patch
---

Fix breakpoint detection on mobile devices
```

**Structure:**
- **Frontmatter**: Package name and change type
- **Body**: Description of the change (used in changelog)

## Generated CHANGELOG.md

After running `pnpm changeset:version`, a `CHANGELOG.md` is generated:

```markdown
# responsive-kit

## 0.1.1-beta.1

### Patch Changes

- Fix breakpoint detection on mobile devices
- Update dependencies

## 0.1.0-beta.1

### Minor Changes

- Initial beta release
```

## Best Practices

### DO ✅

- Add a changeset for every user-facing change
- Write clear, descriptive summaries
- Use conventional commit messages
- Run `pnpm release` before creating releases
- Review generated changelog before committing
- Keep changesets small and focused
- Add changesets in the same PR as the change

### DON'T ❌

- Skip changesets for bug fixes or features
- Use vague summaries like "fix bug" or "update"
- Manually edit `package.json` version
- Forget to commit changeset files
- Mix multiple unrelated changes in one changeset
- Edit consumed changeset files (they're deleted after versioning)

## Integration with Git

### Recommended Git Workflow

```bash
# 1. Create feature branch
git checkout -b feat/keyboard-shortcuts

# 2. Make changes
# ... code changes ...

# 3. Add changeset
pnpm changeset:add

# 4. Commit everything
git add .
git commit -m "feat: add keyboard shortcuts"

# 5. Push and create PR
git push origin feat/keyboard-shortcuts

# 6. After PR merge, on main branch
git checkout main
git pull

# 7. Release
pnpm release
git add .
git commit -m "chore: release v0.2.0-beta.1"
git tag v0.2.0-beta.1
git push && git push --tags
```

## Troubleshooting

### No changesets found

**Problem:** Running `pnpm changeset:version` says "No changesets found"

**Solution:** Add a changeset first with `pnpm changeset:add`

### Version didn't change

**Problem:** Version stayed the same after running `pnpm changeset:version`

**Solution:** Make sure you have uncommitted changeset files in `.changeset/`

### Wrong version bump

**Problem:** Version bumped to 0.2.0 but you wanted 0.1.1

**Solution:** 
- Check changeset files - one might be marked as "minor" instead of "patch"
- Delete the changeset file and recreate it with correct type
- Or manually edit the changeset file's frontmatter

### Pre-release version issues

**Problem:** Version went from 0.1.0-beta.1 to 0.1.1 instead of 0.1.0-beta.2

**Solution:** Use pre-release mode:
```bash
pnpm changeset pre enter beta
pnpm changeset:version
```

## Configuration

Configuration is in `.changeset/config.json`:

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.1.2/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

**Key settings:**
- `changelog`: Changelog generator (default is fine)
- `commit`: Auto-commit changes (set to `false` for manual control)
- `access`: Package access level (not used for extensions)
- `baseBranch`: Main branch name

## Resources

- [Changesets Documentation](https://github.com/changesets/changesets)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Quick Reference

```bash
# Add a changeset
pnpm changeset:add

# Release (recommended)
pnpm release

# Manual version update
pnpm changeset:version

# Enter pre-release mode
pnpm changeset pre enter beta

# Exit pre-release mode
pnpm changeset pre exit

# Check status
pnpm changeset status
```
