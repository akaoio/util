import * as stringUtils from '../src/string';

describe('String Utilities', () => {
  describe('shorten', () => {
    it('should shorten long strings', () => {
      expect(stringUtils.shorten('abcdefghijklmnopqrstuvwxyz', 6)).toBe('abc...xyz');
    });

    it('should return original string if short enough', () => {
      expect(stringUtils.shorten('short', 10)).toBe('short');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(stringUtils.capitalize('hello')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(stringUtils.capitalize('')).toBe('');
    });
  });

  describe('toCamelCase', () => {
    it('should convert to camel case', () => {
      expect(stringUtils.toCamelCase('hello-world')).toBe('helloWorld');
      expect(stringUtils.toCamelCase('hello_world')).toBe('helloWorld');
      expect(stringUtils.toCamelCase('hello world')).toBe('helloWorld');
    });
  });

  describe('toSnakeCase', () => {
    it('should convert to snake case', () => {
      expect(stringUtils.toSnakeCase('helloWorld')).toBe('hello_world');
      expect(stringUtils.toSnakeCase('hello-world')).toBe('hello_world');
      expect(stringUtils.toSnakeCase('hello world')).toBe('hello_world');
    });
  });

  describe('toKebabCase', () => {
    it('should convert to kebab case', () => {
      expect(stringUtils.toKebabCase('helloWorld')).toBe('hello-world');
      expect(stringUtils.toKebabCase('hello_world')).toBe('hello-world');
      expect(stringUtils.toKebabCase('hello world')).toBe('hello-world');
    });
  });

  describe('isEmail', () => {
    it('should validate email addresses', () => {
      expect(stringUtils.isEmail('test@example.com')).toBe(true);
      expect(stringUtils.isEmail('invalid')).toBe(false);
      expect(stringUtils.isEmail('no@domain')).toBe(false);
    });
  });

  describe('isUrl', () => {
    it('should validate URLs', () => {
      expect(stringUtils.isUrl('https://example.com')).toBe(true);
      expect(stringUtils.isUrl('http://example.com')).toBe(true);
      expect(stringUtils.isUrl('not a url')).toBe(false);
    });
  });

  describe('slugify', () => {
    it('should create URL-friendly slugs', () => {
      expect(stringUtils.slugify('Hello World!')).toBe('hello-world');
      expect(stringUtils.slugify('  Test  Slug  ')).toBe('test-slug');
      expect(stringUtils.slugify('Special@#$Characters')).toBe('specialcharacters');
    });
  });
});