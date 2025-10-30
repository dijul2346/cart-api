import express from "express";
import { validateProductId } from "../middleware/validateProductId";
import { validateUserId } from "../middleware/validateUserId";
import { addToCart, updateCart, removeFromCart, viewCart } from "../controllers/cartController";

const router = express.Router();

router.post("/add", validateUserId, validateProductId, addToCart);


router.put("/update", validateUserId, validateProductId, updateCart);


router.delete("/remove/:userId/:prod_id", validateUserId, validateProductId, removeFromCart);


router.get("/:userId", validateUserId, viewCart);

export default router;