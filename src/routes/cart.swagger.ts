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
 *                 example: "69039ca9b2350860d960cb33"
 *               prod_id:
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
 *                 example: "69039ca9b2350860d960cb33"
 *               prod_id:
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
 *         example: "69039ca9b2350860d960cb33"
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
 *         example: "69039ca9b2350860d960cb33"
 *     responses:
 *       200:
 *         description: List of cart items
 *       404:
 *         description: Cart not found
 */