/**
 * @swagger
 * /cart/add:
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
 * /cart/update:
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
 *                 example: "64ff5c2b2c3f2f6a9d7c8a2a"
 *               productId:
 *                 type: string
 *                 example: "P001"
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 *       400:
 *         description: Invalid quantity
 */

/**
 * @swagger
 * /cart/remove/{userId}/{prod_id}:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB user ID
 *         example: "6900a73e9a16dfbde280c5ce"
 *       - in: path
 *         name: prod_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product's ID
 *         example: "P001"
 *     responses:
 *       200:
 *         description: Product removed successfully
 *       404:
 *         description: Product not found in cart
 */

/**
 * @swagger
 * /cart/{userId}:
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
 *         example: "6900a73e9a16dfbde280c5ce"
 *     responses:
 *       200:
 *         description: List of cart items
 *       404:
 *         description: Cart not found
 */