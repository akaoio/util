export function shorten(str: string, length: number = 10): string {
  if (!str || str.length <= length * 2) return str;
  const half = Math.floor(length / 2);
  return `${str.slice(0, half)}...${str.slice(-half)}`;
}

export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toCamelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (_, c) => c.toLowerCase());
}

export function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '')
    .replace(/[-\s]+/g, '_');
}

export function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
    .replace(/[_\s]+/g, '-');
}

export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function isEmail(str: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
}

export function isUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function spintax(text: string): string {
  const process = (str: string): string => {
    const regex = /{([^{}]+)}/;
    let match;
    
    while ((match = regex.exec(str)) !== null) {
      const options = match[1].split('|');
      const selected = options[Math.floor(Math.random() * options.length)];
      str = str.substring(0, match.index) + selected + str.substring(match.index + match[0].length);
    }
    
    return str;
  };
  
  let result = text;
  let previousResult;
  
  do {
    previousResult = result;
    result = process(result);
  } while (result !== previousResult);
  
  return result;
}

export function escapeHtml(str: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  
  return str.replace(/[&<>"']/g, char => htmlEscapes[char]);
}

export function unescapeHtml(str: string): string {
  const htmlUnescapes: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };
  
  return str.replace(/&(?:amp|lt|gt|quot|#39);/g, entity => htmlUnescapes[entity]);
}

export function padStart(str: string, targetLength: number, padString: string = ' '): string {
  return str.padStart(targetLength, padString);
}

export function padEnd(str: string, targetLength: number, padString: string = ' '): string {
  return str.padEnd(targetLength, padString);
}

export function repeat(str: string, count: number): string {
  return str.repeat(Math.max(0, count));
}

export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

export function countWords(str: string): number {
  return str.trim().split(/\s+/).filter(word => word.length > 0).length;
}

export function countLines(str: string): number {
  return str.split('\n').length;
}