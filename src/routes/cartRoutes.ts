import express from "express";
import { validateProductId } from "../middleware/validateProductId";
import { validateUserId } from "../middleware/validateUserId";
import { addToCart, updateCart, removeFromCart, viewCart } from "../controllers/cartController";

const router = express.Router();

// Add to cart
router.post("/add", validateUserId, validateProductId, addToCart);

// Update quantity
router.put("/update", validateUserId, validateProductId, updateCart);

// Remove from cart
router.delete("/remove/:userId/:prod_id", validateUserId, validateProductId, removeFromCart);

// View cart
router.get("/:userId", validateUserId, viewCart);

export default router;
