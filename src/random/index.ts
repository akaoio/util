export function randomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomBoolean(probability: number = 0.5): boolean {
  return Math.random() < probability;
}

export function randomChoice<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
}

export function randomChoices<T>(array: T[], count: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    const choice = randomChoice(array);
    if (choice !== undefined) {
      result.push(choice);
    }
  }
  return result;
}

export function randomSample<T>(array: T[], count: number): T[] {
  if (count >= array.length) {
    return [...array];
  }
  
  const result: T[] = [];
  const indices = new Set<number>();
  
  while (result.length < count) {
    const index = Math.floor(Math.random() * array.length);
    if (!indices.has(index)) {
      indices.add(index);
      result.push(array[index]);
    }
  }
  
  return result;
}

export function randomString(
  length: number,
  characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function randomAlpha(length: number): string {
  return randomString(length, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
}

export function randomNumeric(length: number): string {
  return randomString(length, '0123456789');
}

export function randomAlphanumeric(length: number): string {
  return randomString(length, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
}

export function randomHex(length: number): string {
  return randomString(length, '0123456789abcdef');
}

export function randomPassword(options?: {
  length?: number;
  uppercase?: boolean;
  lowercase?: boolean;
  numbers?: boolean;
  symbols?: boolean;
}): string {
  const {
    length = 16,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true
  } = options || {};
  
  let characters = '';
  if (uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers) characters += '0123456789';
  if (symbols) characters += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  if (characters.length === 0) {
    throw new Error('At least one character type must be enabled');
  }
  
  return randomString(length, characters);
}

export function randomEmail(options?: {
  domain?: string;
  usernameLength?: number;
}): string {
  const { domain = 'example.com', usernameLength = 10 } = options || {};
  const username = randomAlphanumeric(usernameLength).toLowerCase();
  return `${username}@${domain}`;
}

export function randomIP(): string {
  return `${randomInt(1, 255)}.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(0, 255)}`;
}

export function randomIPv6(): string {
  const segments = [];
  for (let i = 0; i < 8; i++) {
    segments.push(randomHex(4));
  }
  return segments.join(':');
}

export function randomMAC(): string {
  const segments = [];
  for (let i = 0; i < 6; i++) {
    segments.push(randomHex(2));
  }
  return segments.join(':');
}

export function randomColor(): string {
  return '#' + randomHex(6);
}

export function randomRGB(): { r: number; g: number; b: number } {
  return {
    r: randomInt(0, 255),
    g: randomInt(0, 255),
    b: randomInt(0, 255)
  };
}

export function randomHSL(): { h: number; s: number; l: number } {
  return {
    h: randomInt(0, 360),
    s: randomInt(0, 100),
    l: randomInt(0, 100)
  };
}

export function randomDate(start?: Date, end?: Date): Date {
  const startTime = start ? start.getTime() : new Date(2000, 0, 1).getTime();
  const endTime = end ? end.getTime() : new Date().getTime();
  return new Date(randomInt(startTime, endTime));
}

export function randomKey(prefix: string = ''): string {
  const timestamp = Date.now().toString(36);
  const random = randomAlphanumeric(8);
  return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
}

export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function randomWeighted<T>(items: Array<{ value: T; weight: number }>): T | undefined {
  if (items.length === 0) return undefined;
  
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const item of items) {
    random -= item.weight;
    if (random <= 0) {
      return item.value;
    }
  }
  
  return items[items.length - 1].value;
}

export function randomGaussian(mean: number = 0, stdDev: number = 1): number {
  let u1 = 0;
  let u2 = 0;
  
  while (u1 === 0) u1 = Math.random();
  while (u2 === 0) u2 = Math.random();
  
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdDev + mean;
}

export function randomExponential(lambda: number = 1): number {
  return -Math.log(1 - Math.random()) / lambda;
}

export function randomPoisson(lambda: number): number {
  const limit = Math.exp(-lambda);
  let product = Math.random();
  let count = 0;
  
  while (product > limit) {
    count++;
    product *= Math.random();
  }
  
  return count;
}