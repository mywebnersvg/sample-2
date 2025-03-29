const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" })); // Increase JSON payload size limit
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // Increase URL-encoded payload size limit

// Mock database (replace with a real database later)
let products = [];

// API to add a product
app.post("/api/products", (req, res) => {
  const product = req.body;
  products.push(product);
  res.status(201).send("Product added successfully");
});

// API to get all products
app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

// API to delete a product
app.delete("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  if (productId >= 0 && productId < products.length) {
    products.splice(productId, 1); // Remove the product from the array
    res.status(200).send("Product deleted successfully");
  } else {
    res.status(404).send("Product not found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});