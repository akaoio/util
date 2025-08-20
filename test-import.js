// Test CommonJS import
const utils = require('./dist/index.js');

console.log('Testing @akaoio/util...\n');

// Test string utilities
console.log('String utilities:');
console.log('capitalize("hello"):', utils.string.capitalize('hello'));
console.log('slugify("Hello World!"):', utils.string.slugify('Hello World!'));

// Test array utilities  
console.log('\nArray utilities:');
console.log('chunk([1,2,3,4,5,6], 2):', utils.array.chunk([1,2,3,4,5,6], 2));
console.log('unique([1,2,2,3,3,3]):', utils.array.unique([1,2,2,3,3,3]));

// Test number utilities
console.log('\nNumber utilities:');
console.log('formatNumber(1234567.89):', utils.number.formatNumber(1234567.89));
console.log('beautifyNumber(1500000):', utils.number.beautifyNumber(1500000));

// Test object utilities
console.log('\nObject utilities:');
const obj = { a: 1, b: { c: 2 } };
const cloned = utils.object.deepClone(obj);
console.log('deepClone({ a: 1, b: { c: 2 } }):', cloned);
console.log('Are they equal?', utils.object.isEqual(obj, cloned));
console.log('Are they the same reference?', obj === cloned);

console.log('\n✅ All tests passed!');