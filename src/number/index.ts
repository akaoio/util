export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function round(value: number, precision: number = 0): number {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}

export function floor(value: number, precision: number = 0): number {
  const multiplier = Math.pow(10, precision);
  return Math.floor(value * multiplier) / multiplier;
}

export function ceil(value: number, precision: number = 0): number {
  const multiplier = Math.pow(10, precision);
  return Math.ceil(value * multiplier) / multiplier;
}

export function formatNumber(value: number, options?: {
  decimals?: number;
  separator?: string;
  thousandsSeparator?: string;
}): string {
  const { decimals = 2, separator = '.', thousandsSeparator = ',' } = options || {};
  
  const [integerPart, decimalPart] = value.toFixed(decimals).split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  
  return decimalPart ? `${formattedInteger}${separator}${decimalPart}` : formattedInteger;
}

export function beautifyNumber(value: number, precision: number = 1): string {
  const units = ['', 'K', 'M', 'B', 'T'];
  let unitIndex = 0;
  let scaledValue = Math.abs(value);
  
  while (scaledValue >= 1000 && unitIndex < units.length - 1) {
    scaledValue /= 1000;
    unitIndex++;
  }
  
  const formattedValue = scaledValue.toFixed(precision);
  const sign = value < 0 ? '-' : '';
  
  return `${sign}${formattedValue}${units[unitIndex]}`;
}

export function percentage(value: number, total: number, decimals: number = 2): string {
  if (total === 0) return '0%';
  const percent = (value / total) * 100;
  return `${percent.toFixed(decimals)}%`;
}

export function isInteger(value: any): value is number {
  return Number.isInteger(value);
}

export function isFloat(value: any): boolean {
  return typeof value === 'number' && !Number.isInteger(value) && !Number.isNaN(value);
}

export function isEven(value: number): boolean {
  return value % 2 === 0;
}

export function isOdd(value: number): boolean {
  return value % 2 !== 0;
}

export function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  
  return true;
}

export function factorial(n: number): number {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

export function fibonacci(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  
  let prev = 0;
  let curr = 1;
  
  for (let i = 2; i <= n; i++) {
    const temp = curr;
    curr = prev + curr;
    prev = temp;
  }
  
  return curr;
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

export function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * clamp(t, 0, 1);
}

export function normalize(value: number, min: number, max: number): number {
  if (max === min) return 0;
  return (value - min) / (max - min);
}

export function randomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function toDecimal(value: string | number, decimals: number = 18): string {
  const divisor = Math.pow(10, decimals);
  const result = Number(value) / divisor;
  return result.toString();
}

export function toBigNumber(value: string | number, decimals: number = 18): string {
  const multiplier = Math.pow(10, decimals);
  const result = Number(value) * multiplier;
  return Math.floor(result).toString();
}

export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

export function variance(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const avg = average(numbers);
  const squaredDiffs = numbers.map(num => Math.pow(num - avg, 2));
  return average(squaredDiffs);
}

export function standardDeviation(numbers: number[]): number {
  return Math.sqrt(variance(numbers));
}