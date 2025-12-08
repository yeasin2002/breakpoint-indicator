# Version Management

ResponsiveKit uses **Changesets** for automated version management and changelog generation.

## Quick Start

```bash
# 1. Make changes to your code

# 2. Add a changeset describing your changes
pnpm changeset:add

# 3. When ready to release
pnpm release

# 4. Commit and tag
git add .
git commit -m "chore: release v0.1.0-beta.2"
git tag v0.1.0-beta.2
git push && git push --tags
```

## Documentation

- **[CHANGESETS.md](./CHANGESETS.md)** - Complete guide to using Changesets
- **[VERSIONING.md](./VERSIONING.md)** - Semantic versioning explained (if exists)

## Current Version

**v0.1.0-beta.1** - Beta release

## Version Format

We follow [Semantic Versioning](https://semver.org/):

```
MAJOR.MINOR.PATCH-PRERELEASE
```

- **MAJOR**: Breaking changes (1.0.0 → 2.0.0)
- **MINOR**: New features, backward-compatible (0.1.0 → 0.2.0)
- **PATCH**: Bug fixes, backward-compatible (0.1.0 → 0.1.1)
- **PRERELEASE**: Beta, alpha, rc versions (0.1.0-beta.1)

## Common Commands

| Command | Description |
|---------|-------------|
| `pnpm changeset:add` | Add a new changeset |
| `pnpm release` | Update version, generate changelog, build |
| `pnpm changeset:version` | Update version only |
| `pnpm changeset status` | Check pending changesets |

## Change Types

### Patch (Bug Fixes)
```bash
pnpm changeset:add
# Select: patch
# Example: "Fix breakpoint detection on mobile"
```

### Minor (New Features)
```bash
pnpm changeset:add
# Select: minor
# Example: "Add keyboard shortcut support"
```

### Major (Breaking Changes)
```bash
pnpm changeset:add
# Select: major
# Example: "Restructure component API"
```

## Release Workflow

1. **Develop** - Make your changes
2. **Changeset** - Run `pnpm changeset:add` for each change
3. **Commit** - Commit your code + changeset files
4. **Release** - Run `pnpm release` when ready
5. **Tag** - Create git tag and push

## Pre-release Mode

For beta versions:

```bash
# Enter pre-release mode
pnpm changeset pre enter beta

# Add changes and version as normal
pnpm changeset:add
pnpm changeset:version

# Exit when ready for stable
pnpm changeset pre exit
```

## What Gets Generated

- ✅ Updated `package.json` version
- ✅ Generated/updated `CHANGELOG.md`
- ✅ Consumed changeset files (deleted)
- ✅ Built extension files

## Best Practices

- ✅ Add changeset for every user-facing change
- ✅ Write clear, descriptive summaries
- ✅ Use `pnpm release` before creating releases
- ✅ Review generated changelog
- ❌ Don't manually edit `package.json` version
- ❌ Don't skip changesets for bug fixes

## Resources

- [Changesets Documentation](https://github.com/changesets/changesets)
- [Semantic Versioning](https://semver.org/)
- [Project CHANGESETS.md](./CHANGESETS.md)
