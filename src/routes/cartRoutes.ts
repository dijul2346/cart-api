import express from "express";
import { validateProductId } from "../middleware/validateProductId";
import { validateUserId } from "../middleware/validateUserId";
import { addToCart, updateCart, removeFromCart, viewCart } from "../controllers/cartController";

const router = express.Router();

// Add to cart
/**
 * @swagger
 * /cart/add:
 * post:
 * summary: Add an item to a user's cart
 * description: Adds a product to the cart. If the item already exists, its quantity is increased.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * userId:
 * type: string
 * description: The user's ID
 * example: "6900a73e9a16dfbde280c5ce"
 * prod_id:
 * type: string
 * description: The product's ID
 * example: "P002"
 * quantity:
 * type: number
 * description: The quantity to add (defaults to 1 if not provided)
 * example: 2
 * responses:
 * 200:
 * $ref: '#/components/responses/CartResponse'
 * 400:
 * $ref: '#/components/responses/ErrorResponse'
 * 404:
 * $ref: '#/components/responses/ErrorResponse'
 * 500:
 * $ref: '#/components/responses/ErrorResponse'
 * **/
router.post("/add", validateUserId, validateProductId, addToCart);


/**
 * @swagger
 * /cart/update:
 * put:
 * summary: Update an item's quantity in the cart
 * description: Updates the quantity of a specific item in the cart to a new value.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * userId:
 * type: string
 * description: The user's ID
 * example: "6900a73e9a16dfbde280c5ce"
 * prod_id:
 * type: string
 * description: The product's ID
 * example: "P001"
 * quantity:
 * type: number
 * description: The new total quantity for the item (must be 1 or more)
 * example: 3
 * responses:
 * 200:
 * $ref: '#/components/responses/CartResponse'
 * 400:
 * $ref: '#/components/responses/ErrorResponse'
 * 404:
 * $ref: '#/components/responses/ErrorResponse'
 * 500:
 * $ref: '#/components/responses/ErrorResponse'
 */
router.put("/update", validateUserId, validateProductId, updateCart);

/**
 * @swagger
 * /cart/remove/{userId}/{prod_id}:
 * delete:
 * summary: Remove an item from the cart
 * description: Completely removes a specific product from a user's cart, regardless of quantity.
 * parameters:
 * - in: path
 * name: userId
 * required: true
 * schema:
 * type: string
 * description: The user's ID
 * example: "6900a73e9a16dfbde280c5ce"
 * - in: path
 * name: prod_id
 * required: true
 * schema:
 * type: string
 * description: The product's ID
 * example: "P001"
 * responses:
 * 200:
 * $ref: '#/components/responses/CartResponse'
 * 404:
 * $ref: '#/components/responses/ErrorResponse'
 * 500:
 * $ref: '#/components/responses/ErrorResponse'
 */
router.delete("/remove/:userId/:prod_id", validateUserId, validateProductId, removeFromCart);

/**
 * @swagger
 * /cart/{userId}:
 * get:
 * summary: View a user's cart
 * description: Retrieves the full cart object for a specific user.
 * parameters:
 * - in: path
 * name: userId
 * required: true
 * schema:
 * type: string
 * description: The user's ID
 * example: "6900a73e9a16dfbde280c5ce"
 * responses:
 * 200:
 * description: The user's cart.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Cart'
 * 404:
 * $ref: '#/components/responses/ErrorResponse'
 * 500:
 * $ref: '#/components/responses/ErrorResponse'
 */
router.get("/:userId", validateUserId, viewCart);

export default router;
