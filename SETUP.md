# Setup Instructions for @akaoio/util

## GitHub Repository Setup

1. **Create GitHub repository:**
   ```bash
   # Go to https://github.com/new
   # Repository name: util
   # Owner: akaoio
   # Description: A comprehensive TypeScript utility library for Node.js and browser environments
   # Public repository
   # Don't initialize with README (we already have one)
   ```

2. **Connect local repository to GitHub:**
   ```bash
   git remote add origin https://github.com/akaoio/util.git
   git push -u origin main
   ```

## NPM Publishing Setup

1. **Create npm account (if you don't have one):**
   - Go to https://www.npmjs.com/signup
   - Create account with username: akaoio

2. **Login to npm:**
   ```bash
   npm login
   # Enter your username, password, and email
   ```

3. **Create organization (if needed):**
   ```bash
   # Go to https://www.npmjs.com/org/create
   # Organization name: akaoio
   ```

4. **Install dependencies and build:**
   ```bash
   npm install
   npm run build
   ```

5. **Test the package locally:**
   ```bash
   npm run test
   npm run lint
   npm run typecheck
   ```

6. **Publish to npm:**
   ```bash
   # First time publish
   npm publish --access public
   
   # Future updates (after incrementing version)
   npm version patch  # or minor/major
   npm publish
   ```

## Continuous Integration (Optional)

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]
    
    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: npm run build
    - run: npm run test
    - run: npm run lint
    - run: npm run typecheck
```

## Auto-publish to npm (Optional)

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18.x'
        registry-url: 'https://registry.npmjs.org'
    - run: npm ci
    - run: npm run build
    - run: npm run test
    - run: npm publish --access public
      env:
        NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

To use this:
1. Get your npm token from https://www.npmjs.com/settings/[username]/tokens
2. Add it to GitHub repository secrets as `NPM_TOKEN`

## Version Management

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major

# Then push tags
git push --tags
```

## Usage After Publishing

Once published, users can install the package:

```bash
npm install @akaoio/util
```

Or with yarn:

```bash
yarn add @akaoio/util
```

## Updating the Package

1. Make your changes
2. Update version: `npm version patch/minor/major`
3. Build: `npm run build`
4. Test: `npm run test`
5. Publish: `npm publish`
6. Push to GitHub: `git push && git push --tags`