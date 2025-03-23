const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" })); // Increase JSON payload size limit
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // Increase URL-encoded payload size limit

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/wristnneck", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  images: [String],
  discount: Number,
  category: String,
  description: String,
});

const Product = mongoose.model("Product", productSchema);

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail as the email service
  auth: {
    user: "your-email@gmail.com", // Replace with your Gmail email
    pass: "rlbg jatk nctv xgmy", // Replace with your Gmail app password
  },
});

// API to add a product
app.post("/api/products", async (req, res) => {
  const product = req.body;

  try {
    const newProduct = new Product(product);
    await newProduct.save();
    res.status(201).send("Product added successfully");
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Failed to add product");
  }
});

// API to get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Failed to fetch products");
  }
});

// API to delete a product
app.delete("/api/products/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) {
      res.status(200).send("Product deleted successfully");
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Failed to delete product");
  }
});

// API to handle order and send email
app.post("/api/order", async (req, res) => {
  const { name, email, productName, price } = req.body;

  // Email content
  const mailOptions = {
    from: "your-email@gmail.com", // Sender email
    to: "anusn2914@gmail.com", // Receiver email
    subject: "New Order Received", // Email subject
    text: `You have received a new order:
           Name: ${name}
           Email: ${email}
           Product: ${productName}
           Price: ${price}`, // Email body
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Order successful! Email sent." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});