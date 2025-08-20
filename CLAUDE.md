# @akaoio/util - AI Assistant Context

This document provides context for AI assistants working with the @akaoio/util library.

## Project Overview

@akaoio/util is a comprehensive TypeScript utility library providing 200+ well-tested, tree-shakeable utility functions for Node.js and browser environments. The library is designed to be a one-stop solution for common programming tasks, reducing code duplication across projects.

## Project Structure

```
akaoio-util/
├── src/                    # Source TypeScript files
│   ├── string/            # String manipulation utilities
│   ├── array/             # Array operations
│   ├── object/            # Object manipulation
│   ├── number/            # Number formatting and math
│   ├── date/              # Date/time utilities
│   ├── crypto/            # Cryptographic functions
│   ├── random/            # Random value generation
│   ├── url/               # URL parsing and building
│   ├── validation/        # Data validation
│   ├── file/              # File system operations (Node.js only)
│   └── index.ts           # Main export file
├── dist/                   # Built JavaScript files
│   ├── index.js           # CommonJS build
│   ├── esm/               # ES modules build
│   └── browser/           # Browser bundle
├── tests/                  # Test files
├── package.json           # Package configuration
├── tsconfig.json          # TypeScript config
├── tsconfig.esm.json      # ESM TypeScript config
├── webpack.config.js      # Browser bundle config
├── jest.config.js         # Test configuration
└── README.md              # Documentation
```

## Key Design Principles

1. **Tree-shakeable**: Each function is individually exportable to minimize bundle size
2. **TypeScript First**: Written in TypeScript with complete type definitions
3. **Zero Dependencies**: No external runtime dependencies
4. **Universal Compatibility**: Works in Node.js, browsers, and Deno
5. **Immutable Operations**: Functions don't mutate inputs (especially for objects/arrays)
6. **Consistent Naming**: Clear, predictable function names across all modules
7. **Error Handling**: Graceful error handling with meaningful messages

## Development Guidelines

### Adding New Functions

When adding new utility functions:

1. **Location**: Place in the appropriate module directory (`src/[module]/index.ts`)
2. **Naming**: Use clear, descriptive names (e.g., `formatNumber`, not `fmt`)
3. **Types**: Include complete TypeScript type definitions
4. **Documentation**: Add JSDoc comments with examples
5. **Tests**: Write comprehensive tests in `tests/[module].test.ts`
6. **Export**: Export from both the module and main index

Example:
```typescript
/**
 * Converts a string to title case
 * @param str - The string to convert
 * @returns The title-cased string
 * @example
 * titleCase('hello world') // 'Hello World'
 */
export function titleCase(str: string): string {
  return str.replace(/\w\S*/g, txt => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}
```

### Code Style

- Use 2 spaces for indentation
- No semicolons (configured in Prettier)
- Single quotes for strings
- Explicit return types for functions
- Prefer `const` over `let`
- Use early returns to reduce nesting
- Avoid mutations - return new values

### Testing

All functions must have tests covering:
- Normal use cases
- Edge cases (empty inputs, null/undefined)
- Error conditions
- Type correctness

Run tests:
```bash
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # With coverage report
```

### Building

The library builds to three formats:
1. **CommonJS** (`dist/`) - For Node.js require()
2. **ES Modules** (`dist/esm/`) - For modern import
3. **Browser Bundle** (`dist/browser/`) - UMD bundle

```bash
npm run build              # Build all formats
npm run build:cjs         # CommonJS only
npm run build:esm         # ES modules only
npm run build:browser     # Browser bundle only
```

## Common Tasks

### Add a new utility function

1. Add function to appropriate module in `src/[module]/index.ts`
2. Export from module
3. Add tests in `tests/[module].test.ts`
4. Run `npm test` to verify
5. Update README.md if it's a significant addition

### Fix a bug

1. Write a failing test that reproduces the bug
2. Fix the implementation
3. Verify all tests pass
4. Update version in package.json (patch version)

### Add a new module

1. Create `src/[module]/index.ts`
2. Add exports to `src/index.ts`
3. Update package.json exports field
4. Create `tests/[module].test.ts`
5. Update README.md with module documentation

### Release new version

```bash
npm version patch|minor|major  # Update version
npm run build                   # Build all formats
npm test                        # Run tests
npm publish                     # Publish to npm
git push --follow-tags          # Push to GitHub
```

## Module Specifics

### String Module
- Focus on common text transformations
- Include both validation (isEmail) and transformation (toSnakeCase)
- Handle Unicode properly (removeAccents)

### Array Module
- Immutable operations - never mutate input arrays
- Include both simple (first, last) and complex (groupBy) operations
- Statistical functions (mean, median, stdDev)

### Object Module
- Deep operations handle circular references
- Path-based access (get, set, has) using dot notation
- Type-safe pick/omit operations

### Number Module
- Formatting for display (formatNumber, beautifyNumber)
- Math utilities (gcd, lcm, isPrime)
- Random number generation with ranges

### Date Module
- Format strings follow common patterns (YYYY-MM-DD)
- Timezone-aware operations where needed
- Both arithmetic (addDays) and comparison (isAfter)

### Crypto Module
- Use native crypto APIs when available
- Fallback implementations for older environments
- Both encoding (base64) and hashing (sha256)

### Random Module
- Seedable random for testing
- Various distributions (uniform, gaussian, exponential)
- Domain-specific generators (email, IP, MAC)

### URL Module
- Handle both absolute and relative URLs
- Query string manipulation preserves order
- Special characters properly encoded/decoded

### Validation Module
- Return boolean for all validators
- Support international formats (phone, postal codes)
- Composable validators (isStrongPassword with options)

### File Module (Node.js only)
- Async by default with sync alternatives
- Recursive operations (copy, remove directories)
- Path utilities work cross-platform

## Performance Considerations

- Functions are optimized for common case performance
- Avoid unnecessary iterations and allocations
- Use native methods when available (Array methods, etc.)
- Cache regex compilations outside functions
- Consider memory usage for large datasets

## Browser Compatibility

Target: Modern browsers (ES2020+)
- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

For older browser support, users should transpile and polyfill.

## Publishing Checklist

Before publishing a new version:

- [ ] All tests pass (`npm test`)
- [ ] TypeScript compiles without errors (`npm run typecheck`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build completes successfully (`npm run build`)
- [ ] Version bumped appropriately
- [ ] README.md updated if needed
- [ ] CHANGELOG updated (if maintaining one)
- [ ] Git tag created for version

## Maintenance

### Dependencies
- Review and update dev dependencies monthly
- No runtime dependencies to maintain
- Keep TypeScript and testing tools current

### Security
- Run `npm audit` regularly
- Never include secrets or credentials
- Validate inputs in sensitive functions
- Use crypto APIs properly (don't roll your own)

### Performance
- Profile bundle size impact of changes
- Benchmark critical functions
- Consider lazy loading for heavy modules

## Contact

- Repository: https://github.com/akaoio/util
- NPM: https://www.npmjs.com/package/@akaoio/util
- Issues: https://github.com/akaoio/util/issues
- Author: akaoio (dev@akao.io)

## Version History

- **1.0.0** (2024-01-20): Initial release with 200+ utilities
- **1.0.1** (2024-01-20): Fixed repository URLs

## License

MIT - See LICENSE file for details