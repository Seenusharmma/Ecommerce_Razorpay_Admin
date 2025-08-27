import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Express app
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connect
mongoose.connect(
  "mongodb+srv://roshansharma7250:v5xmJvpbsxEYW1ek@cluster0.l4oud1b.mongodb.net/",{
        dbName:"MERN_Ecommerce"
    }
).then(()=>console.log("MongoDB Connected Succssfully...!")).catch((err)=>console.log(err));

const port = 1000;


// Schema
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  qty: Number,
  imgSrc: String,
});

const Product = mongoose.model("Product", productSchema);

// ✅ Routes

// Get all products
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Create product
app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

// Update product
app.put("/api/products/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete product
app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Run server
app.listen(port,()=>console.log(`Server is running on port ${port}`))
