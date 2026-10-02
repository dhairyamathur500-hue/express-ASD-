app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Unique cache key for each product
        const key = req.url;

        // Check cache
        if (cache[key]) {
            console.log("Serving from cache");
            return res.json(cache[key]);
        }

        console.log("Reading from file...");

        // Read file with 1.5 second delay
        const products = await readFilewithDelay();

        const product = products.find(
            product => product.id === Number(id)
        );

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        // Store product in cache
        cache[key] = { product };

        return res.json({ product });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});