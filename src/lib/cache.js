import fs from 'node:fs/promises';
import path from 'node:path';

const CACHE_FILE = path.join(process.cwd(), 'src', 'cache', 'cache.json');

export function generateCacheKey(url) {
    return Buffer.from(url).toString('base64');
}

export async function storeInCache(cache, cacheKey, data) {
    try {
        cache[cacheKey] = data;
        const cacheJson = JSON.stringify(cache, null, 2);

        await fs.writeFile(CACHE_FILE, cacheJson, {flag: 'w'});
    } catch (err) {
        console.error('error storing cache:', err);
    }
}

export async function loadCache() {
    try {
        const cache = await fs.readFile(CACHE_FILE, { encoding: 'utf-8' });
        return cache ? JSON.parse(cache) : {};
    } catch (err) {
        console.error('error loading cache:', err);
        return {};
    }
}

export async function clearCache() {
    try {
        await fs.truncate(CACHE_FILE, 0);
    } catch (err) {
        console.error('error clearing cache:', err);
    }
}




