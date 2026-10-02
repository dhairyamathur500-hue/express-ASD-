const cache = {};

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;

    if (cache[key]) {
        console.log("Serving from cache");

        return res.json(cache[key].data);
    }

    console.log("Cache miss");

    next();
}

module.exports = {
    cache,
    cacheMiddleware
};