const express = require('express');

const router = express.Router();

const service = require('./service');

const {
    cache,
    cacheMiddleware,
    clearCache
} = require('./Middleware');


router.get(
    '/products',
    cacheMiddleware,
    async (req, res) => {
        try {
            const products = await service.getProducts();

            cache[req.originalUrl] = {
                data: products,
                createdAt: Date.now()
            };

            res.status(200).json(products);

        } catch (err) {
            console.log(err);

            res.status(500).json({
                message: "Internal server error"
            });
        }
    }
);


router.get(
    '/products/:id',
    cacheMiddleware,
    async (req, res) => {
        try {
            const product = await service.getProductById(
                req.params.id
            );

            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            const responseData = {
                product: product
            };

            cache[req.originalUrl] = {
                data: responseData,
                createdAt: Date.now()
            };

            res.status(200).json(responseData);

        } catch (err) {
            console.log(err);

            res.status(500).json({
                message: "Internal server error"
            });
        }
    }
);


router.post(
    '/products',
    async (req, res) => {
        try {
            const product = await service.createProduct(req.body);

            clearCache();

            res.status(201).json({
                message: "Product created successfully",
                product: product
            });

        } catch (err) {
            console.log(err);

            res.status(500).json({
                message: "Internal server error"
            });
        }
    }
);


router.put(
    '/products/:id',
    async (req, res) => {
        try {
            const product = await service.updateProduct(
                req.params.id,
                req.body
            );

            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            clearCache();

            res.status(200).json({
                message: "Product updated successfully",
                product: product
            });

        } catch (err) {
            console.log(err);

            res.status(500).json({
                message: "Internal server error"
            });
        }
    }
);


router.patch(
    '/products/:id',
    async (req, res) => {
        try {
            const product = await service.updateProduct(
                req.params.id,
                req.body
            );

            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            clearCache();

            res.status(200).json({
                message: "Product updated successfully",
                product: product
            });

        } catch (err) {
            console.log(err);

            res.status(500).json({
                message: "Internal server error"
            });
        }
    }
);


router.delete(
    '/products/:id',
    async (req, res) => {
        try {
            const product = await service.deleteProduct(
                req.params.id
            );

            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            clearCache();

            res.status(200).json({
                message: "Product deleted successfully",
                product: product
            });

        } catch (err) {
            console.log(err);

            res.status(500).json({
                message: "Internal server error"
            });
        }
    }
);


module.exports = router;