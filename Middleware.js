const cache = {};

const CACHE_TTL = 60 * 1000;

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;

    const cachedData = cache[key];

    if (cachedData) {
        const age = Date.now() - cachedData.createdAt;

        if (age < CACHE_TTL) {
            console.log("Serving from cache");

            res.setHeader('X-Cache', 'HIT');

            return res.json(cachedData.data);
        }

        console.log("Cache expired");

        delete cache[key];
    }

    console.log("Cache miss");

    res.setHeader('X-Cache', 'MISS');

    next();
}

module.exports = {
    cache,
    cacheMiddleware
};