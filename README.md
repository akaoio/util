# @akaoio/util

<p align="center">
  <a href="https://www.npmjs.com/package/@akaoio/util"><img src="https://img.shields.io/npm/v/@akaoio/util.svg?style=flat-square" alt="NPM version"></a>
  <a href="https://www.npmjs.com/package/@akaoio/util"><img src="https://img.shields.io/npm/dm/@akaoio/util.svg?style=flat-square" alt="NPM downloads"></a>
  <a href="https://github.com/akaoio/util/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@akaoio/util.svg?style=flat-square" alt="License"></a>
  <a href="https://github.com/akaoio/util"><img src="https://img.shields.io/github/stars/akaoio/util?style=flat-square" alt="GitHub stars"></a>
</p>

> 🚀 Comprehensive TypeScript utility library for Node.js and browser environments

A collection of 200+ well-tested, tree-shakeable utility functions that you'll use in every project. Built with TypeScript for perfect type safety and IntelliSense support.

## ✨ Features

- 📦 **200+ Utility Functions** - Everything from string manipulation to cryptography
- 🌳 **Tree-shakeable** - Import only what you need, keep your bundle size small
- 🔷 **TypeScript First** - Written in TypeScript with complete type definitions
- 🌐 **Universal** - Works in Node.js, browsers, and Deno
- ⚡ **Zero Dependencies** - No external dependencies, lightweight and fast
- 🧪 **Well Tested** - Comprehensive test coverage
- 📚 **Great Documentation** - Clear examples for every function

## 📦 Installation

```bash
npm install @akaoio/util
```

```bash
yarn add @akaoio/util
```

```bash
pnpm add @akaoio/util
```

## 🚀 Quick Start

### Import everything (not recommended for production)

```typescript
import * as utils from '@akaoio/util';

utils.string.capitalize('hello');  // 'Hello'
utils.array.chunk([1,2,3,4], 2);  // [[1,2], [3,4]]
utils.number.formatNumber(1234567.89);  // '1,234,567.89'
```

### Import specific modules (recommended)

```typescript
import { string, array, number } from '@akaoio/util';

string.capitalize('hello');  // 'Hello'
array.unique([1, 2, 2, 3]);  // [1, 2, 3]
number.clamp(15, 0, 10);     // 10
```

### Import individual functions (best for tree-shaking)

```typescript
import { capitalize, chunk, clamp } from '@akaoio/util';

capitalize('hello');     // 'Hello'
chunk([1,2,3,4], 2);    // [[1,2], [3,4]]
clamp(15, 0, 10);       // 10
```

### Direct module imports

```typescript
import * as stringUtils from '@akaoio/util/string';
import * as arrayUtils from '@akaoio/util/array';
```

## 📚 Available Modules

### 🔤 String Utilities

Transform, validate, and manipulate strings with ease.

```typescript
import { string } from '@akaoio/util';

// Case conversion
string.toCamelCase('hello-world');   // 'helloWorld'
string.toSnakeCase('helloWorld');    // 'hello_world'
string.toKebabCase('hello world');   // 'hello-world'

// Text manipulation
string.capitalize('hello');          // 'Hello'
string.truncate('long text', 5);    // 'long...'
string.slugify('Hello World!');      // 'hello-world'

// Validation
string.isEmail('test@example.com');  // true
string.isUrl('https://example.com'); // true
```

**Full list:** `capitalize`, `toCamelCase`, `toSnakeCase`, `toKebabCase`, `truncate`, `slugify`, `shorten`, `removeAccents`, `escapeHtml`, `unescapeHtml`, `isEmail`, `isUrl`, `padStart`, `padEnd`, `repeat`, `reverse`, `countWords`, `countLines`, `spintax`

### 📊 Array Utilities

Powerful array manipulation and transformation functions.

```typescript
import { array } from '@akaoio/util';

// Transformation
array.chunk([1,2,3,4,5,6], 2);      // [[1,2], [3,4], [5,6]]
array.flatten([[1], [2, [3]]]);      // [1, 2, 3]
array.unique([1, 2, 2, 3]);          // [1, 2, 3]

// Operations
array.difference([1,2,3], [2,3,4]);  // [1]
array.intersection([1,2,3], [2,3,4]); // [2, 3]
array.shuffle([1, 2, 3, 4]);         // [3, 1, 4, 2] (random)

// Grouping & Sorting
array.groupBy([{age: 20}, {age: 30}], x => x.age);
array.sortBy(users, user => user.name);
```

**Full list:** `chunk`, `flatten`, `unique`, `uniqueBy`, `difference`, `intersection`, `union`, `shuffle`, `sample`, `sampleSize`, `groupBy`, `sortBy`, `partition`, `compact`, `range`, `zip`, `unzip`, `first`, `last`, `take`, `drop`, `sum`, `mean`, `median`, `min`, `max`

### 🎯 Object Utilities

Deep operations on objects with immutability in mind.

```typescript
import { object } from '@akaoio/util';

// Deep operations
const cloned = object.deepClone(original);
const merged = object.deepMerge(obj1, obj2);

// Property manipulation
object.pick(user, ['name', 'email']);
object.omit(user, ['password']);

// Path operations
object.get(user, 'address.city', 'default');
object.set(user, 'address.city', 'New York');
object.has(user, 'address.city');  // true

// Comparison
object.isEqual(obj1, obj2);  // deep equality
object.isEmpty({});           // true
object.diff(oldObj, newObj);  // returns changes
```

**Full list:** `deepClone`, `deepMerge`, `pick`, `omit`, `get`, `set`, `has`, `isEmpty`, `isEqual`, `mapKeys`, `mapValues`, `invert`, `entries`, `fromEntries`, `keys`, `values`, `diff`

### 🔢 Number Utilities

Format, convert, and manipulate numbers.

```typescript
import { number } from '@akaoio/util';

// Formatting
number.formatNumber(1234567.89);     // '1,234,567.89'
number.beautifyNumber(1500000);      // '1.5M'
number.percentage(75, 200);          // '37.50%'

// Math operations
number.clamp(15, 0, 10);             // 10
number.round(3.14159, 2);            // 3.14
number.randomInt(1, 10);             // 7 (random)

// Validation & Checks
number.isPrime(17);                  // true
number.isEven(4);                    // true
number.fibonacci(10);                // 55
```

**Full list:** `clamp`, `round`, `floor`, `ceil`, `formatNumber`, `beautifyNumber`, `percentage`, `isInteger`, `isFloat`, `isEven`, `isOdd`, `isPrime`, `factorial`, `fibonacci`, `gcd`, `lcm`, `toRadians`, `toDegrees`, `lerp`, `normalize`, `randomInt`, `randomFloat`, `average`, `variance`, `standardDeviation`

### 📅 Date Utilities

Comprehensive date manipulation and formatting.

```typescript
import { date } from '@akaoio/util';

// Formatting
date.formatDate(new Date(), 'YYYY-MM-DD');  // '2024-01-20'
date.formatDuration(3661000);               // '1h 1m 1s'

// Date arithmetic
date.addDays(new Date(), 7);
date.addMonths(new Date(), 2);
date.diffInDays(date1, date2);

// Comparisons
date.isAfter(date1, date2);
date.isBefore(date1, date2);
date.isSameDay(date1, date2);

// Utilities
date.getDaysInMonth(new Date());
date.isLeapYear(2024);  // true
```

**Full list:** `formatDate`, `parseDate`, `addDays`, `addMonths`, `addYears`, `addHours`, `addMinutes`, `addSeconds`, `diffInDays`, `diffInHours`, `diffInMinutes`, `diffInSeconds`, `isAfter`, `isBefore`, `isSameDay`, `isLeapYear`, `getDaysInMonth`, `getWeekday`, `getMonth`, `startOfDay`, `endOfDay`, `startOfMonth`, `endOfMonth`, `startOfYear`, `endOfYear`, `formatDuration`, `toISOString`, `fromUnixTime`, `toUnixTime`

### 🔐 Crypto Utilities

Hashing, encoding, and cryptographic functions.

```typescript
import { crypto } from '@akaoio/util';

// Hashing
await crypto.sha256('hello');        // '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c...'
await crypto.md5('hello');           // '5d41402abc4b2a76b9719d911017c592'

// Encoding
crypto.base64Encode('hello');        // 'aGVsbG8='
crypto.base64Decode('aGVsbG8=');     // 'hello'

// Generation
await crypto.generateUUID();         // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
await crypto.generateRandomHex(16);  // '4f3c2a1b8e9d7c6a5b4e3f2d1c0a9b8e'

// Key derivation
await crypto.pbkdf2('password', 'salt', 100000, 32);
```

**Full list:** `sha256`, `md5`, `base64Encode`, `base64Decode`, `base64UrlEncode`, `base64UrlDecode`, `hexToBase64`, `base64ToHex`, `hexToBytes`, `bytesToHex`, `generateRandomBytes`, `generateRandomHex`, `generateUUID`, `hashCode`, `pbkdf2`

### 🎲 Random Utilities

Generate random values for testing and simulations.

```typescript
import { random } from '@akaoio/util';

// Basic random
random.randomInt(1, 100);            // 42
random.randomFloat(0, 1);            // 0.7264
random.randomBoolean(0.7);           // true (70% chance)

// String generation
random.randomString(10);             // 'Ab3Xk9Qw2P'
random.randomPassword({ length: 16, symbols: true });
random.randomEmail();                // 'user123@example.com'

// Advanced
random.randomColor();                // '#3A7F9C'
random.randomIP();                   // '192.168.1.42'
random.randomMAC();                  // 'a1:b2:c3:d4:e5:f6'
random.randomGaussian(0, 1);        // Normal distribution
```

**Full list:** `randomInt`, `randomFloat`, `randomBoolean`, `randomChoice`, `randomChoices`, `randomSample`, `randomString`, `randomAlpha`, `randomNumeric`, `randomAlphanumeric`, `randomHex`, `randomPassword`, `randomEmail`, `randomIP`, `randomIPv6`, `randomMAC`, `randomColor`, `randomRGB`, `randomHSL`, `randomDate`, `randomKey`, `shuffle`, `randomWeighted`, `randomGaussian`, `randomExponential`, `randomPoisson`

### 🌐 URL Utilities

Parse, build, and manipulate URLs.

```typescript
import { url } from '@akaoio/util';

// Parsing
url.parseUrl('https://example.com/path?key=value#hash');
// { protocol: 'https:', host: 'example.com', pathname: '/path', ... }

// Building
url.buildUrl('https://api.example.com', '/users', { page: 1, limit: 10 });
// 'https://api.example.com/users?page=1&limit=10'

// Query parameters
url.getQueryParams('https://example.com?a=1&b=2');  // { a: '1', b: '2' }
url.addQueryParams(url, { c: 3 });
url.removeQueryParams(url, ['a']);

// Utilities
url.isValidUrl('https://example.com');  // true
url.extractDomain('https://sub.example.com/path');  // 'sub.example.com'
url.normalizeUrl('https://example.com//path/');  // 'https://example.com/path'
```

**Full list:** `parseUrl`, `buildUrl`, `getQueryParams`, `addQueryParams`, `removeQueryParams`, `extractDomain`, `extractPath`, `isAbsoluteUrl`, `isRelativeUrl`, `joinUrl`, `normalizeUrl`, `encodeQueryString`, `decodeQueryString`, `isValidUrl`, `cleanUrl`, `getBaseUrl`, `resolveUrl`, `encodeUrlForFilename`, `isSameOrigin`, `getUrlExtension`, `removeUrlProtocol`, `ensureUrlProtocol`, `extractUrlsFromText`

### ✅ Validation Utilities

Comprehensive validation for common data types.

```typescript
import { validation } from '@akaoio/util';

// Contact validation
validation.isEmail('user@example.com');     // true
validation.isPhone('+1234567890', 'US');    // true
validation.isPostalCode('12345', 'US');     // true

// Network validation
validation.isIPv4('192.168.1.1');           // true
validation.isIPv6('2001:db8::1');           // true
validation.isMAC('01:23:45:67:89:AB');      // true

// Financial validation
validation.isCreditCard('4111111111111111'); // true (Visa)
validation.isIBAN('DE89370400440532013000'); // true

// Security validation
validation.isStrongPassword('Pass123!@#', {
  minLength: 8,
  requireUppercase: true,
  requireNumbers: true,
  requireSymbols: true
});  // true

// Data format validation
validation.isJSON('{"valid": true}');       // true
validation.isBase64('SGVsbG8gV29ybGQ=');    // true
validation.isUUID('550e8400-e29b-41d4-a716-446655440000'); // true
```

**Full list:** `isEmail`, `isUrl`, `isIPv4`, `isIPv6`, `isIP`, `isMAC`, `isUUID`, `isHexColor`, `isRGBColor`, `isHSLColor`, `isAlpha`, `isAlphanumeric`, `isNumeric`, `isDecimal`, `isBase64`, `isJSON`, `isCreditCard`, `isPhone`, `isPostalCode`, `isStrongPassword`, `isDate`, `isISO8601`, `isEmpty`, `isInteger`, `isFloat`, `isPositive`, `isNegative`, `isInRange`, `hasMinLength`, `hasMaxLength`

### 📁 File Utilities (Node.js only)

File system operations with async/await support.

```typescript
import { file } from '@akaoio/util';

// File operations
await file.exists('/path/to/file');
await file.readJson('/config.json');
await file.writeJson('/data.json', data);

// Directory operations
await file.ensureDir('/path/to/dir');
await file.copy('/source', '/destination');
await file.remove('/path/to/delete');

// Path utilities
file.join('/path', 'to', 'file.txt');
file.getExtension('/file.txt');  // '.txt'
file.formatBytes(1024);           // '1 KB'

// Search
await file.find('/dir', (path, stats) => stats.isFile());
```

**Full list:** `exists`, `existsSync`, `ensureDir`, `ensureDirSync`, `readJson`, `readJsonSync`, `writeJson`, `writeJsonSync`, `readText`, `readTextSync`, `writeText`, `writeTextSync`, `appendText`, `appendTextSync`, `copy`, `copySync`, `remove`, `removeSync`, `move`, `moveSync`, `getSize`, `getSizeSync`, `formatBytes`, `getExtension`, `getBasename`, `getDirname`, `join`, `resolve`, `normalize`, `isAbsolute`, `relative`, `find`, `findSync`

## 🎯 Real-World Examples

### Building a URL with query parameters

```typescript
import { buildUrl, encodeQueryString } from '@akaoio/util/url';

const apiUrl = buildUrl(
  'https://api.example.com',
  '/search',
  {
    q: 'typescript utils',
    page: 1,
    limit: 20,
    filters: ['popular', 'recent']
  }
);
// https://api.example.com/search?q=typescript%20utils&page=1&limit=20&filters=popular&filters=recent
```

### Processing user input

```typescript
import { string, validation } from '@akaoio/util';

function processUserInput(input: string) {
  const trimmed = input.trim();
  
  if (validation.isEmail(trimmed)) {
    return {
      type: 'email',
      value: trimmed.toLowerCase(),
      domain: trimmed.split('@')[1]
    };
  }
  
  if (validation.isUrl(trimmed)) {
    return {
      type: 'url',
      value: string.normalizeUrl(trimmed),
      domain: url.extractDomain(trimmed)
    };
  }
  
  return {
    type: 'text',
    value: string.truncate(trimmed, 100),
    slug: string.slugify(trimmed)
  };
}
```

### Data transformation pipeline

```typescript
import { array, object, number } from '@akaoio/util';

const users = [
  { id: 1, name: 'Alice', age: 30, score: 85 },
  { id: 2, name: 'Bob', age: 25, score: 92 },
  { id: 3, name: 'Charlie', age: 35, score: 78 }
];

const result = users
  .filter(u => u.age >= 25)
  .map(u => object.pick(u, ['name', 'score']))
  .sort((a, b) => b.score - a.score);

const stats = {
  average: number.average(users.map(u => u.score)),
  median: number.median(users.map(u => u.score)),
  stdDev: number.standardDeviation(users.map(u => u.score))
};
```

## 🌍 Browser Support

Most utilities work in all modern browsers. Node.js specific features (like file operations) are only available in Node.js environments.

| Module | Node.js | Browser | Deno |
|--------|---------|---------|------|
| String | ✅ | ✅ | ✅ |
| Array | ✅ | ✅ | ✅ |
| Object | ✅ | ✅ | ✅ |
| Number | ✅ | ✅ | ✅ |
| Date | ✅ | ✅ | ✅ |
| Crypto | ✅ | ✅* | ✅ |
| Random | ✅ | ✅ | ✅ |
| URL | ✅ | ✅ | ✅ |
| Validation | ✅ | ✅ | ✅ |
| File | ✅ | ❌ | ✅ |

*Some crypto functions require Web Crypto API support

## 📦 Bundle Size

The library is designed to be tree-shakeable. Here are approximate sizes when importing specific modules:

| Import | Size (minified + gzipped) |
|--------|---------------------------|
| String utils only | ~2.5 KB |
| Array utils only | ~3.2 KB |
| Object utils only | ~2.8 KB |
| Number utils only | ~2.1 KB |
| Full library | ~35 KB |

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🔧 Development

```bash
# Clone the repository
git clone https://github.com/akaoio/util.git
cd util

# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## 📄 License

MIT © [akaoio](https://github.com/akaoio)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 💖 Support

If you find this package useful, please consider:

- ⭐ Starring the [GitHub repository](https://github.com/akaoio/util)
- 🐛 Reporting bugs and suggesting features in [GitHub Issues](https://github.com/akaoio/util/issues)
- 📖 Improving documentation
- 💻 Contributing code improvements

## 📮 Contact

- GitHub: [@akaoio](https://github.com/akaoio)
- Email: dev@akao.io

---

<p align="center">Made with ❤️ by <a href="https://github.com/akaoio">akaoio</a></p>