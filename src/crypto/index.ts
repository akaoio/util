export async function sha256(message: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } else if (typeof global !== 'undefined' && global.crypto) {
    const crypto = await import('crypto');
    return crypto.createHash('sha256').update(message).digest('hex');
  } else {
    return sha256Fallback(message);
  }
}

function sha256Fallback(message: string): string {
  const h = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];
  
  const k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];
  
  const preprocessMessage = (msg: string): number[] => {
    const msgBytes = new TextEncoder().encode(msg);
    const msgLength = msgBytes.length;
    const bitLength = msgLength * 8;
    const numBlocks = Math.ceil((msgLength + 9) / 64);
    const paddedLength = numBlocks * 64;
    const padded = new Uint8Array(paddedLength);
    
    padded.set(msgBytes);
    padded[msgLength] = 0x80;
    
    const dataView = new DataView(padded.buffer);
    dataView.setUint32(paddedLength - 8, Math.floor(bitLength / 0x100000000), false);
    dataView.setUint32(paddedLength - 4, bitLength >>> 0, false);
    
    const blocks: number[] = [];
    for (let i = 0; i < paddedLength; i += 4) {
      blocks.push(dataView.getUint32(i, false));
    }
    
    return blocks;
  };
  
  const rightRotate = (n: number, x: number): number => {
    return (x >>> n) | (x << (32 - n));
  };
  
  const blocks = preprocessMessage(message);
  const numBlocks = blocks.length / 16;
  
  for (let i = 0; i < numBlocks; i++) {
    const w = new Array(64);
    for (let j = 0; j < 16; j++) {
      w[j] = blocks[i * 16 + j];
    }
    
    for (let j = 16; j < 64; j++) {
      const s0 = rightRotate(7, w[j - 15]) ^ rightRotate(18, w[j - 15]) ^ (w[j - 15] >>> 3);
      const s1 = rightRotate(17, w[j - 2]) ^ rightRotate(19, w[j - 2]) ^ (w[j - 2] >>> 10);
      w[j] = (w[j - 16] + s0 + w[j - 7] + s1) >>> 0;
    }
    
    let [a, b, c, d, e, f, g, hh] = h;
    
    for (let j = 0; j < 64; j++) {
      const s1 = rightRotate(6, e) ^ rightRotate(11, e) ^ rightRotate(25, e);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (hh + s1 + ch + k[j] + w[j]) >>> 0;
      const s0 = rightRotate(2, a) ^ rightRotate(13, a) ^ rightRotate(22, a);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (s0 + maj) >>> 0;
      
      hh = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }
    
    h[0] = (h[0] + a) >>> 0;
    h[1] = (h[1] + b) >>> 0;
    h[2] = (h[2] + c) >>> 0;
    h[3] = (h[3] + d) >>> 0;
    h[4] = (h[4] + e) >>> 0;
    h[5] = (h[5] + f) >>> 0;
    h[6] = (h[6] + g) >>> 0;
    h[7] = (h[7] + hh) >>> 0;
  }
  
  return h.map(val => val.toString(16).padStart(8, '0')).join('');
}

export async function md5(message: string): Promise<string> {
  if (typeof global !== 'undefined' && global.crypto) {
    const crypto = await import('crypto');
    return crypto.createHash('md5').update(message).digest('hex');
  }
  throw new Error('MD5 not available in browser environment');
}

export function base64Encode(str: string): string {
  if (typeof window !== 'undefined' && window.btoa) {
    return window.btoa(unescape(encodeURIComponent(str)));
  } else if (typeof global !== 'undefined' && global.Buffer) {
    return Buffer.from(str).toString('base64');
  }
  throw new Error('Base64 encoding not available');
}

export function base64Decode(str: string): string {
  if (typeof window !== 'undefined' && window.atob) {
    return decodeURIComponent(escape(window.atob(str)));
  } else if (typeof global !== 'undefined' && global.Buffer) {
    return Buffer.from(str, 'base64').toString('utf-8');
  }
  throw new Error('Base64 decoding not available');
}

export function base64UrlEncode(str: string): string {
  return base64Encode(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

export function base64UrlDecode(str: string): string {
  str = (str + '===').slice(0, str.length + (str.length % 4));
  return base64Decode(str.replace(/-/g, '+').replace(/_/g, '/'));
}

export function hexToBase64(hex: string): string {
  const bytes = hex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || [];
  if (typeof global !== 'undefined' && global.Buffer) {
    return Buffer.from(bytes).toString('base64');
  }
  const binary = String.fromCharCode(...bytes);
  return base64Encode(binary);
}

export function base64ToHex(base64: string): string {
  if (typeof global !== 'undefined' && global.Buffer) {
    return Buffer.from(base64, 'base64').toString('hex');
  }
  const binary = base64Decode(base64);
  return Array.from(binary)
    .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
}

export function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function generateRandomBytes(length: number): Promise<Uint8Array> {
  if (typeof window !== 'undefined' && window.crypto) {
    const bytes = new Uint8Array(length);
    window.crypto.getRandomValues(bytes);
    return bytes;
  } else if (typeof global !== 'undefined' && global.crypto) {
    const crypto = await import('crypto');
    return new Uint8Array(crypto.randomBytes(length));
  }
  throw new Error('Crypto not available');
}

export async function generateRandomHex(length: number): Promise<string> {
  const bytes = await generateRandomBytes(length);
  return bytesToHex(bytes);
}

export async function generateUUID(): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  } else if (typeof global !== 'undefined' && global.crypto) {
    const crypto = await import('crypto');
    if (crypto.randomUUID) {
      return crypto.randomUUID();
    }
  }
  
  const bytes = await generateRandomBytes(16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  
  const hex = bytesToHex(bytes);
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32)
  ].join('-');
}

export function hashCode(str: string): number {
  let hash = 0;
  if (str.length === 0) return hash;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  return hash;
}

export async function pbkdf2(
  password: string,
  salt: string,
  iterations: number = 100000,
  keyLength: number = 32,
  digest: string = 'SHA-256'
): Promise<string> {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const saltBuffer = encoder.encode(salt);
  
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const importedKey = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      'PBKDF2',
      false,
      ['deriveBits']
    );
    
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: saltBuffer,
        iterations,
        hash: digest
      },
      importedKey,
      keyLength * 8
    );
    
    return bytesToHex(new Uint8Array(derivedBits));
  } else if (typeof global !== 'undefined' && global.crypto) {
    const crypto = await import('crypto');
    const key = crypto.pbkdf2Sync(password, salt, iterations, keyLength, digest.toLowerCase().replace('-', ''));
    return key.toString('hex');
  }
  
  throw new Error('PBKDF2 not available');
}