const cache = {};

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;

    if (cache[key]) {
        console.log("Serving from cache");

        res.setHeader('X-Cache', 'HIT');

        return res.json(cache[key].data);
    }

    console.log("Cache miss");

    res.setHeader('X-Cache', 'MISS');

    next();
}

module.exports = {
    cache,
    cacheMiddleware
};