const database = require('../database/productDatabase');

async function getProducts() {
    return await database.readProducts();
}

async function getProductById(id) {
    const products = await database.readProducts();

    return products.find(
        product => product.id === Number(id)
    );
}

async function createProduct(product) {
    const products = await database.readProducts();

    const newProduct = {
        id: products.length + 1,
        ...product
    };

    products.push(newProduct);

    await database.writeProducts(products);

    return newProduct;
}

async function updateProduct(id, data) {
    const products = await database.readProducts();

    const index = products.findIndex(
        product => product.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...data
    };

    await database.writeProducts(products);

    return products[index];
}

async function deleteProduct(id) {
    const products = await database.readProducts();

    const index = products.findIndex(
        product => product.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    const deletedProduct = products[index];

    products.splice(index, 1);

    await database.writeProducts(products);

    return deletedProduct;
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};