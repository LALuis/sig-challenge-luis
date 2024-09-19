const express = require("express");
const fs = require("fs");
const cors = require("cors"); 
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

const products = JSON.parse(fs.readFileSync("data/data.json", "utf-8"));

app.get("/products/:product_id", (req, res) => {
    const productId = parseInt(req.params.product_id, 10);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
});

app.get("/products", (req, res) => {
    const allProductsWithFields = products.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.category,
        discount: p.discount,
    }));

    res.json(allProductsWithFields);
});

app.post("/products/:product_id", (req, res) => {
    const productId = parseInt(req.params.product_id, 10);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ error: "Product not found" });
    }
        products[productIndex] = { ...products[productIndex], ...req.body };    
        res.json(products[productIndex]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
