// models/Product.ts
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  prod_id: { type: String, required: true, unique: true },
  name: String,
  price: Number,
  stock: Number
});

export const Product = mongoose.model("Product", productSchema);
