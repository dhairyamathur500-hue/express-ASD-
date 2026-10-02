const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const port = 3000;

const cache = {};
const pathToFile = path.join(__dirname, 'db.json');

async function readFile() {
    try {
        let data = await fs.readFile(pathToFile, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.log(err);
    }
}

async function readFilewithDelay() {
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });

    let p = await readFile();
    return p;
}

app.get('/products', async (req, res) => {
    try {
        let key = req.url;

        if (cache[key]) {
            console.log("Serving from cache");
            return res.json(cache[key]);
        }

        let products = await readFilewithDelay();

        cache[key] = products;

        return res.json(products);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        let key = req.url;

        if (cache[key]) {
            console.log("Serving from cache");
            return res.json(cache[key]);
        }

        const { id } = req.params;

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

        cache[key] = { product };

        return res.status(200).json({ product });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});