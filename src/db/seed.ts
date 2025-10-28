import mongoose from "mongoose";
import { connectDB } from "./connect";
import { Product } from "../models/Product";
Product

const seedProducts = async () => {
  await connectDB();
  await Product.deleteMany();

  await Product.insertMany([
    { prod_id: "P001", name: "Laptop", price: 60000, stock: 10 },
    { prod_id: "P002", name: "Mouse", price: 800, stock: 15 },
    { prod_id: "P003", name: "Keyboard", price: 1500, stock: 8 }
  ]);

  console.log("Products seeded");
  mongoose.connection.close();
};

seedProducts();
