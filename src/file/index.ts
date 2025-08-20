import * as fs from 'fs';
import * as path from 'path';

const { promises: fsPromises } = fs;

export async function exists(filePath: string): Promise<boolean> {
  try {
    await fsPromises.stat(filePath);
    return true;
  } catch {
    return false;
  }
}

export function existsSync(filePath: string): boolean {
  try {
    fs.statSync(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function ensureDir(dirPath: string): Promise<void> {
  try {
    await fsPromises.mkdir(dirPath, { recursive: true });
  } catch (error: any) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

export function ensureDirSync(dirPath: string): void {
  try {
    fs.mkdirSync(dirPath, { recursive: true });
  } catch (error: any) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

export async function readJson<T = any>(filePath: string): Promise<T> {
  const content = await fsPromises.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

export function readJsonSync<T = any>(filePath: string): T {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

export async function writeJson(filePath: string, data: any, options?: {
  spaces?: number;
  replacer?: (key: string, value: any) => any;
}): Promise<void> {
  const { spaces = 2, replacer } = options || {};
  const content = JSON.stringify(data, replacer, spaces);
  await fsPromises.writeFile(filePath, content, 'utf-8');
}

export function writeJsonSync(filePath: string, data: any, options?: {
  spaces?: number;
  replacer?: (key: string, value: any) => any;
}): void {
  const { spaces = 2, replacer } = options || {};
  const content = JSON.stringify(data, replacer, spaces);
  fs.writeFileSync(filePath, content, 'utf-8');
}

export async function readText(filePath: string): Promise<string> {
  return await fsPromises.readFile(filePath, 'utf-8');
}

export function readTextSync(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}

export async function writeText(filePath: string, content: string): Promise<void> {
  await fsPromises.writeFile(filePath, content, 'utf-8');
}

export function writeTextSync(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content, 'utf-8');
}

export async function appendText(filePath: string, content: string): Promise<void> {
  await fsPromises.appendFile(filePath, content, 'utf-8');
}

export function appendTextSync(filePath: string, content: string): void {
  fs.appendFileSync(filePath, content, 'utf-8');
}

export async function copy(src: string, dest: string): Promise<void> {
  const srcStat = await fsPromises.stat(src);
  
  if (srcStat.isDirectory()) {
    await ensureDir(dest);
    const files = await fsPromises.readdir(src);
    
    for (const file of files) {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      await copy(srcPath, destPath);
    }
  } else {
    await fsPromises.copyFile(src, dest);
  }
}

export function copySync(src: string, dest: string): void {
  const srcStat = fs.statSync(src);
  
  if (srcStat.isDirectory()) {
    ensureDirSync(dest);
    const files = fs.readdirSync(src);
    
    for (const file of files) {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      copySync(srcPath, destPath);
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

export async function remove(filePath: string): Promise<void> {
  try {
    const fileStat = await fsPromises.stat(filePath);
    
    if (fileStat.isDirectory()) {
      const files = await fsPromises.readdir(filePath);
      
      for (const file of files) {
        await remove(path.join(filePath, file));
      }
      
      await fsPromises.rmdir(filePath);
    } else {
      await fsPromises.unlink(filePath);
    }
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

export function removeSync(filePath: string): void {
  try {
    const fileStat = fs.statSync(filePath);
    
    if (fileStat.isDirectory()) {
      const files = fs.readdirSync(filePath);
      
      for (const file of files) {
        removeSync(path.join(filePath, file));
      }
      
      fs.rmdirSync(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

export async function move(src: string, dest: string): Promise<void> {
  await copy(src, dest);
  await remove(src);
}

export function moveSync(src: string, dest: string): void {
  copySync(src, dest);
  removeSync(src);
}

export async function getSize(filePath: string): Promise<number> {
  const fileStat = await fsPromises.stat(filePath);
  
  if (fileStat.isDirectory()) {
    const files = await fsPromises.readdir(filePath);
    let totalSize = 0;
    
    for (const file of files) {
      totalSize += await getSize(path.join(filePath, file));
    }
    
    return totalSize;
  } else {
    return fileStat.size;
  }
}

export function getSizeSync(filePath: string): number {
  const fileStat = fs.statSync(filePath);
  
  if (fileStat.isDirectory()) {
    const files = fs.readdirSync(filePath);
    let totalSize = 0;
    
    for (const file of files) {
      totalSize += getSizeSync(path.join(filePath, file));
    }
    
    return totalSize;
  } else {
    return fileStat.size;
  }
}

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function getExtension(filePath: string): string {
  return path.extname(filePath);
}

export function getBasename(filePath: string, ext?: string): string {
  return path.basename(filePath, ext);
}

export function getDirname(filePath: string): string {
  return path.dirname(filePath);
}

export function join(...paths: string[]): string {
  return path.join(...paths);
}

export function resolve(...paths: string[]): string {
  return path.resolve(...paths);
}

export function normalize(filePath: string): string {
  return path.normalize(filePath);
}

export function isAbsolute(filePath: string): boolean {
  return path.isAbsolute(filePath);
}

export function relative(from: string, to: string): string {
  return path.relative(from, to);
}

export async function find(dir: string, predicate: (file: string, stats: fs.Stats) => boolean): Promise<string[]> {
  const results: string[] = [];
  const files = await fsPromises.readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await fsPromises.stat(filePath);
    
    if (predicate(filePath, fileStat)) {
      results.push(filePath);
    }
    
    if (fileStat.isDirectory()) {
      const subResults = await find(filePath, predicate);
      results.push(...subResults);
    }
  }
  
  return results;
}

export function findSync(dir: string, predicate: (file: string, stats: fs.Stats) => boolean): string[] {
  const results: string[] = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = fs.statSync(filePath);
    
    if (predicate(filePath, fileStat)) {
      results.push(filePath);
    }
    
    if (fileStat.isDirectory()) {
      const subResults = findSync(filePath, predicate);
      results.push(...subResults);
    }
  }
  
  return results;
}