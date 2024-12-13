import { 
    generateCacheKey, 
    loadCache, 
    storeInCache, 
} from "./cache.js";
import axios from "axios";

export async function forwardRequest(req, res, origin) {
    const cache = await loadCache();
    const url = `${origin}${req.url}`;
    const cacheKey = generateCacheKey(url);

    if (cache[cacheKey]) {
        res.setHeader('X-Cache', 'HIT');
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;

        res.end(cache[cacheKey]);

        return;
    }

    try {
        const response = await axios.get(url);
        const data = JSON.stringify(response.data);
        await storeInCache(cache, cacheKey, data);

        res.setHeader('X-Cache', 'MISS');
        res.setHeader('Content-Type', 'application/json');

        res.statusCode = 200;
        res.end(data);

    } catch (error) {
        res.statusCode = 500;
        res.end('error fetching data from the origin server.');
    }
}