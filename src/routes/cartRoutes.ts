/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management API
 */

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "64ff5c2b2c3f2f6a9d7c8a2a"
 *               productId:
 *                 type: string
 *                 example: "P001"
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product added successfully
 *       400:
 *         description: Invalid input or product not found
 */

/**
 * @swagger
 * /api/cart/remove:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product removed successfully
 *       404:
 *         description: Product not found in cart
 */

/**
 * @swagger
 * /api/cart/update:
 *   put:
 *     summary: Update quantity of a product in cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 *       400:
 *         description: Invalid quantity
 */

/**
 * @swagger
 * /api/cart/{userId}:
 *   get:
 *     summary: Get all items in a user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB user ID
 *     responses:
 *       200:
 *         description: List of cart items
 *       404:
 *         description: Cart not found
 */





import express from "express";
import { validateProductId, validateUserId } from "../middleware/validators";
import { addToCart } from "./cart/addToCart";
import { updateCart } from "./cart/updateCart";
import { removeFromCart } from "./cart/removeFromCart";
import { viewCart } from "./cart/viewCart";

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
