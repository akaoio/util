# @akaoio/util

A comprehensive TypeScript utility library for Node.js and browser environments.

## Installation

```bash
npm install @akaoio/util
```

or

```bash
yarn add @akaoio/util
```

## Features

- **TypeScript Support**: Fully typed with TypeScript
- **Tree-shakeable**: Import only what you need
- **Cross-platform**: Works in both Node.js and browser environments
- **Comprehensive**: Wide range of utility functions
- **Well-tested**: Extensive test coverage

## Usage

### Import everything

```typescript
import * as utils from '@akaoio/util';

// Use utilities
utils.string.capitalize('hello'); // 'Hello'
utils.array.chunk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
```

### Import specific modules

```typescript
import { string, array, object } from '@akaoio/util';

string.slugify('Hello World'); // 'hello-world'
array.unique([1, 2, 2, 3]); // [1, 2, 3]
object.deepClone({ a: 1 }); // { a: 1 }
```

### Import specific functions

```typescript
import { capitalize, chunk, deepClone } from '@akaoio/util';

capitalize('hello'); // 'Hello'
chunk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
deepClone({ a: 1 }); // { a: 1 }
```

### Import submodules directly

```typescript
import * as stringUtils from '@akaoio/util/string';
import * as arrayUtils from '@akaoio/util/array';

stringUtils.capitalize('hello'); // 'Hello'
arrayUtils.chunk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
```

## Available Modules

### String Utilities (`@akaoio/util/string`)

- `shorten(str, length)` - Shorten string with ellipsis
- `capitalize(str)` - Capitalize first letter
- `toCamelCase(str)` - Convert to camelCase
- `toSnakeCase(str)` - Convert to snake_case
- `toKebabCase(str)` - Convert to kebab-case
- `truncate(str, maxLength, suffix)` - Truncate string
- `slugify(str)` - Create URL-friendly slug
- `isEmail(str)` - Validate email address
- `isUrl(str)` - Validate URL
- And more...

### Array Utilities (`@akaoio/util/array`)

- `chunk(array, size)` - Split array into chunks
- `flatten(array)` - Flatten nested arrays
- `unique(array)` - Remove duplicates
- `uniqueBy(array, key)` - Remove duplicates by key
- `shuffle(array)` - Randomly shuffle array
- `groupBy(array, key)` - Group array items by key
- `sortBy(array, key)` - Sort array by key
- And more...

### Object Utilities (`@akaoio/util/object`)

- `deepClone(obj)` - Deep clone object
- `deepMerge(...objects)` - Deep merge objects
- `pick(obj, keys)` - Pick specific keys
- `omit(obj, keys)` - Omit specific keys
- `get(obj, path, defaultValue)` - Get nested value
- `set(obj, path, value)` - Set nested value
- `isEqual(a, b)` - Deep equality check
- And more...

### Number Utilities (`@akaoio/util/number`)

- `clamp(value, min, max)` - Clamp number between min and max
- `round(value, precision)` - Round to precision
- `formatNumber(value, options)` - Format number with separators
- `beautifyNumber(value)` - Convert to K/M/B format
- `randomInt(min, max)` - Generate random integer
- `isPrime(n)` - Check if number is prime
- And more...

### Date Utilities (`@akaoio/util/date`)

- `formatDate(date, format)` - Format date string
- `parseDate(dateString, format)` - Parse date string
- `addDays(date, days)` - Add days to date
- `diffInDays(date1, date2)` - Calculate difference in days
- `isAfter(date1, date2)` - Check if date is after
- `formatDuration(milliseconds)` - Format duration
- And more...

### Crypto Utilities (`@akaoio/util/crypto`)

- `sha256(message)` - Generate SHA-256 hash
- `base64Encode(str)` - Encode to base64
- `base64Decode(str)` - Decode from base64
- `generateUUID()` - Generate UUID v4
- `generateRandomBytes(length)` - Generate random bytes
- And more...

### Random Utilities (`@akaoio/util/random`)

- `randomInt(min, max)` - Random integer in range
- `randomFloat(min, max)` - Random float in range
- `randomString(length, chars)` - Random string
- `randomPassword(options)` - Generate password
- `randomEmail(options)` - Generate random email
- `shuffle(array)` - Shuffle array randomly
- And more...

### URL Utilities (`@akaoio/util/url`)

- `parseUrl(url)` - Parse URL components
- `buildUrl(base, path, params)` - Build URL
- `getQueryParams(url)` - Extract query parameters
- `normalizeUrl(url)` - Normalize URL
- `isValidUrl(url)` - Validate URL
- And more...

### Validation Utilities (`@akaoio/util/validation`)

- `isEmail(email)` - Validate email
- `isUrl(url)` - Validate URL
- `isIPv4(ip)` - Validate IPv4 address
- `isIPv6(ip)` - Validate IPv6 address
- `isCreditCard(number)` - Validate credit card
- `isStrongPassword(password, options)` - Check password strength
- And more...

### File Utilities (`@akaoio/util/file`) - Node.js only

- `exists(path)` - Check if file exists
- `ensureDir(path)` - Ensure directory exists
- `readJson(path)` - Read JSON file
- `writeJson(path, data)` - Write JSON file
- `copy(src, dest)` - Copy file or directory
- `remove(path)` - Remove file or directory
- And more...

## Browser Support

Most utilities work in both Node.js and browser environments. File utilities are Node.js-only. The library includes a browser-optimized build that excludes Node.js-specific dependencies.

## TypeScript

This library is written in TypeScript and includes type definitions. You get full IntelliSense support in modern IDEs.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Author

akaoio

## Repository

[https://github.com/akaoio/util](https://github.com/akaoio/util)