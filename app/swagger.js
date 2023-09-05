/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 *
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         user_name:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone_code:
 *           type: string
 *         phone_number:
 *           type: string
 *         image_url:
 *           type: string
 *         date_of_birth:
 *           type: string
 *           format: date
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - phone_number
 *         - password
 * /api/user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *     - Authorization: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *     - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Failed to create a user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 * /api/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *     - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *     - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Failed to update the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User Registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Failed to Register a user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User Loggedin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Failed to login a user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 *
 *
 * components:
 *   schemas:
 *     ProductVariations:
 *          type: object
 *          properties:
 *            size:
 *              type: string
 *            color:
 *              type: string
 *            price:
 *              type: integer
 *            inventory:
 *              type: integer
 *            image_url:
 *              type: string
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         image_url:
 *           type: string
 *         productVariations:
 *          type: array
 *          items:
 *              $ref: '#/components/schemas/ProductVariations'
 *
 *       required:
 *         - name
 *
 * /api/product:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *     - Authorization: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *     - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Failed to create a product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 * /api/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     security:
 *     - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *     - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Failed to update the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 * @swagger
 * tags:
 *   name: ProductVariation
 *   description: Product Variation management
 *
 *
 * components:
 *   schemas:
 *     ProductVariation:
 *          type: object
 *          properties:
 *            size:
 *              type: string
 *            color:
 *              type: string
 *            price:
 *              type: integer
 *            inventory:
 *              type: integer
 *            image_url:
 *              type: string
 *            product_id:
 *              type: string
 *
 * /api/productVariation:
 *   get:
 *     summary: Get all product Variations
 *     tags: [Product Variations]
 *     security:
 *     - Authorization: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/productVariation'
 *
 *   post:
 *     summary: Create a new productVariation
 *     tags: [Product Variations]
 *     security:
 *     - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/productVariation'
 *     responses:
 *       201:
 *         description: productVariation created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/productVariation'
 *       500:
 *         description: Failed to create a productVariation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 * /api/productVariation/{id}:
 *   get:
 *     summary: Get a productVariation by ID
 *     tags: [Product Variations]
 *     security:
 *     - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the productVariation
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/productVariation'
 *       404:
 *         description: productVariation not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *   put:
 *     summary: Update a productVariation by ID
 *     tags: [Product Variations]
 *     security:
 *     - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/productVariation'
 *     responses:
 *       200:
 *         description: productVariation updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/productVariation'
 *       404:
 *         description: productVariation not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Failed to update the productVariation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 */
