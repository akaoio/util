export function parseUrl(url: string): {
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  origin: string;
} | null {
  try {
    const parsed = new URL(url);
    return {
      protocol: parsed.protocol,
      host: parsed.host,
      hostname: parsed.hostname,
      port: parsed.port,
      pathname: parsed.pathname,
      search: parsed.search,
      hash: parsed.hash,
      origin: parsed.origin
    };
  } catch {
    return null;
  }
}

export function buildUrl(
  base: string,
  path?: string,
  params?: Record<string, string | number | boolean>
): string {
  let url = base;
  
  if (path) {
    url = url.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
  }
  
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      searchParams.append(key, String(value));
    }
    url += (url.includes('?') ? '&' : '?') + searchParams.toString();
  }
  
  return url;
}

export function getQueryParams(url: string): Record<string, string> {
  try {
    const parsed = new URL(url);
    const params: Record<string, string> = {};
    parsed.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  } catch {
    return {};
  }
}

export function addQueryParams(
  url: string,
  params: Record<string, string | number | boolean>
): string {
  try {
    const parsed = new URL(url);
    for (const [key, value] of Object.entries(params)) {
      parsed.searchParams.set(key, String(value));
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

export function removeQueryParams(url: string, params: string[]): string {
  try {
    const parsed = new URL(url);
    for (const param of params) {
      parsed.searchParams.delete(param);
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

export function extractDomain(url: string): string | null {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch {
    return null;
  }
}

export function extractPath(url: string): string | null {
  try {
    const parsed = new URL(url);
    return parsed.pathname;
  } catch {
    return null;
  }
}

export function isAbsoluteUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export function isRelativeUrl(url: string): boolean {
  return !isAbsoluteUrl(url);
}

export function joinUrl(...parts: string[]): string {
  return parts
    .map((part, index) => {
      if (index === 0) {
        return part.replace(/\/$/, '');
      }
      return part.replace(/^\/|\/$/g, '');
    })
    .filter(part => part.length > 0)
    .join('/');
}

export function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.hash = '';
    
    parsed.searchParams.sort();
    
    if (parsed.pathname === '/') {
      parsed.pathname = '';
    } else {
      parsed.pathname = parsed.pathname.replace(/\/$/, '');
    }
    
    if (parsed.port === '80' && parsed.protocol === 'http:') {
      parsed.port = '';
    } else if (parsed.port === '443' && parsed.protocol === 'https:') {
      parsed.port = '';
    }
    
    return parsed.toString().replace(/\/$/, '');
  } catch {
    return url;
  }
}

export function encodeQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, String(v)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  }
  
  return searchParams.toString();
}

export function decodeQueryString(queryString: string): Record<string, string | string[]> {
  const params: Record<string, string | string[]> = {};
  const searchParams = new URLSearchParams(queryString);
  
  searchParams.forEach((value, key) => {
    if (params[key]) {
      if (Array.isArray(params[key])) {
        (params[key] as string[]).push(value);
      } else {
        params[key] = [params[key] as string, value];
      }
    } else {
      params[key] = value;
    }
  });
  
  return params;
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function cleanUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.search = '';
    parsed.hash = '';
    return parsed.toString();
  } catch {
    return url;
  }
}

export function getBaseUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.origin;
  } catch {
    return '';
  }
}

export function resolveUrl(base: string, relative: string): string {
  try {
    return new URL(relative, base).toString();
  } catch {
    return relative;
  }
}

export function encodeUrlForFilename(url: string): string {
  return url
    .replace(/https?:\/\//gi, '')
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

export function isSameOrigin(url1: string, url2: string): boolean {
  try {
    const parsed1 = new URL(url1);
    const parsed2 = new URL(url2);
    return parsed1.origin === parsed2.origin;
  } catch {
    return false;
  }
}

export function getUrlExtension(url: string): string {
  try {
    const parsed = new URL(url);
    const pathname = parsed.pathname;
    const lastDot = pathname.lastIndexOf('.');
    if (lastDot === -1) return '';
    return pathname.slice(lastDot + 1);
  } catch {
    return '';
  }
}

export function removeUrlProtocol(url: string): string {
  return url.replace(/^https?:\/\//i, '');
}

export function ensureUrlProtocol(url: string, protocol: 'http' | 'https' = 'https'): string {
  if (!/^https?:\/\//i.test(url)) {
    return `${protocol}://${url}`;
  }
  return url;
}

export function extractUrlsFromText(text: string): string[] {
  const urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/gi;
  return text.match(urlRegex) || [];
}