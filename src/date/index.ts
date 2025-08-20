export function formatDate(date: Date | string | number, format: string = 'YYYY-MM-DD'): string {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date');
  }
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  const milliseconds = String(d.getMilliseconds()).padStart(3, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('YY', String(year).slice(-2))
    .replace('MM', month)
    .replace('M', String(d.getMonth() + 1))
    .replace('DD', day)
    .replace('D', String(d.getDate()))
    .replace('HH', hours)
    .replace('H', String(d.getHours()))
    .replace('mm', minutes)
    .replace('m', String(d.getMinutes()))
    .replace('ss', seconds)
    .replace('s', String(d.getSeconds()))
    .replace('SSS', milliseconds);
}

export function parseDate(dateString: string, format: string = 'YYYY-MM-DD'): Date {
  const formatParts = format.match(/YYYY|YY|MM|M|DD|D|HH|H|mm|m|ss|s|SSS/g) || [];
  const dateParts: Record<string, number> = {
    year: new Date().getFullYear(),
    month: 0,
    day: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  };
  
  let remainingString = dateString;
  let remainingFormat = format;
  
  for (const part of formatParts) {
    const index = remainingFormat.indexOf(part);
    const value = parseInt(remainingString.substr(index, part.length), 10);
    
    switch (part) {
      case 'YYYY':
        dateParts.year = value;
        break;
      case 'YY':
        dateParts.year = 2000 + value;
        break;
      case 'MM':
      case 'M':
        dateParts.month = value - 1;
        break;
      case 'DD':
      case 'D':
        dateParts.day = value;
        break;
      case 'HH':
      case 'H':
        dateParts.hours = value;
        break;
      case 'mm':
      case 'm':
        dateParts.minutes = value;
        break;
      case 'ss':
      case 's':
        dateParts.seconds = value;
        break;
      case 'SSS':
        dateParts.milliseconds = value;
        break;
    }
    
    remainingString = remainingString.slice(0, index) + remainingString.slice(index + part.length);
    remainingFormat = remainingFormat.slice(0, index) + remainingFormat.slice(index + part.length);
  }
  
  return new Date(
    dateParts.year,
    dateParts.month,
    dateParts.day,
    dateParts.hours,
    dateParts.minutes,
    dateParts.seconds,
    dateParts.milliseconds
  );
}

export function addDays(date: Date | string | number, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function addMonths(date: Date | string | number, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export function addYears(date: Date | string | number, years: number): Date {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d;
}

export function addHours(date: Date | string | number, hours: number): Date {
  const d = new Date(date);
  d.setHours(d.getHours() + hours);
  return d;
}

export function addMinutes(date: Date | string | number, minutes: number): Date {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + minutes);
  return d;
}

export function addSeconds(date: Date | string | number, seconds: number): Date {
  const d = new Date(date);
  d.setSeconds(d.getSeconds() + seconds);
  return d;
}

export function diffInDays(date1: Date | string | number, date2: Date | string | number): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export function diffInHours(date1: Date | string | number, date2: Date | string | number): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60));
}

export function diffInMinutes(date1: Date | string | number, date2: Date | string | number): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diffTime / (1000 * 60));
}

export function diffInSeconds(date1: Date | string | number, date2: Date | string | number): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diffTime / 1000);
}

export function isAfter(date1: Date | string | number, date2: Date | string | number): boolean {
  return new Date(date1) > new Date(date2);
}

export function isBefore(date1: Date | string | number, date2: Date | string | number): boolean {
  return new Date(date1) < new Date(date2);
}

export function isSameDay(date1: Date | string | number, date2: Date | string | number): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

export function getDaysInMonth(date: Date | string | number): number {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

export function getWeekday(date: Date | string | number): string {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return weekdays[new Date(date).getDay()];
}

export function getMonth(date: Date | string | number): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[new Date(date).getMonth()];
}

export function startOfDay(date: Date | string | number): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function endOfDay(date: Date | string | number): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function startOfMonth(date: Date | string | number): Date {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function endOfMonth(date: Date | string | number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1, 0);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function startOfYear(date: Date | string | number): Date {
  const d = new Date(date);
  d.setMonth(0, 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function endOfYear(date: Date | string | number): Date {
  const d = new Date(date);
  d.setMonth(11, 31);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

export function toISOString(date: Date | string | number): string {
  return new Date(date).toISOString();
}

export function fromUnixTime(timestamp: number): Date {
  return new Date(timestamp * 1000);
}

export function toUnixTime(date: Date | string | number): number {
  return Math.floor(new Date(date).getTime() / 1000);
}