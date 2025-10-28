import express from "express";
import Cart from "../models/Cart";
import { Product } from "../models/Product";

const router = express.Router();

/* -------------------- ADD TO CART -------------------- */
router.post("/add", async (req, res) => {
  try {
    const { userId, prod_id, quantity = 1 } = req.body;

    const product = await Product.findOne({ prod_id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    if ((product.stock ?? 0) < quantity)
      return res.status(400).json({ message: "Insufficient stock" });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const existingItem = cart.items.find((item) => item.productId === prod_id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId: prod_id,
        name: product.name,
        price: product.price,
        quantity,
      });
    }

    product.stock = (product.stock ?? 0) - quantity;
    await product.save();
    await cart.save();

    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
});

/* -------------------- UPDATE QUANTITY -------------------- */
router.put("/update", async (req, res) => {
  try {
    const { userId, prod_id, quantity } = req.body;

    if (quantity < 1)
      return res.status(400).json({ message: "Quantity must be at least 1" });

    const product = await Product.findOne({ prod_id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.productId === prod_id);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    const diff = quantity - item.quantity;

    if (diff > 0 && (product.stock ?? 0) < diff)
      return res.status(400).json({ message: "Not enough stock available" });

    item.quantity = quantity;
    product.stock = (product.stock ?? 0) - diff;

    await product.save();
    await cart.save();

    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error });
  }
});

/* -------------------- REMOVE FROM CART -------------------- */
router.delete("/remove/:userId/:prod_id", async (req, res) => {
  try {
    const { userId, prod_id } = req.params;

    const product = await Product.findOne({ prod_id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.items.findIndex((item) => item.productId === prod_id);
    if (index === -1)
      return res.status(404).json({ message: "Item not found in cart" });

    const removedItem = cart.items[index];
    product.stock = (product.stock ?? 0) + (removedItem?.quantity ?? 0);

    cart.items.splice(index, 1);

    await product.save();
    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing from cart", error });
  }
});

/* -------------------- GET CART -------------------- */
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
});

export default router;
