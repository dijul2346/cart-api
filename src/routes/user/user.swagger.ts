/**
 * @swagger
 * /users/add:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user and a corresponding empty cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Test User
 *               email:
 *                 type: string
 *                 example: dijul234@gmail.com
 *     responses:
 *       200:
 *         description: User created successfully.
 *       400:
 *         description: Bad request (missing name/email or email exists).
 *       500:
 *         description: Failed to add user.
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */