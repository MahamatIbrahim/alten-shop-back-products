import { Router } from "express";
import * as productController from "../controller/ProductController.js";
const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "API IS RINING",
    message: "success",
  });
});

router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductsById);
router.post("/products/add", productController.addProducts);
router.put("/products/update/:id", productController.updateProductsById);
router.delete("/products/delete/:id", productController.deleteProducts);
/**
 * @openapi
 * /products:
 *      get:
 *        summary: Lists all the products
 *        tags: [Products]
 *        description: The products list
 *        responses:
 *         200:
 *          description: The products list
 *          content:
 *           application/json:
 *            schema:
 *             type: array
 *             items:
 *              $ref: '#/components/schemas/Product'
 *         404:
 *          description: products not found
 */

/**
 * @openapi
 * /products/{id}:
 *      get:
 *        summary: Get a product by ID
 *        tags: [Products]
 *        description: Get a product by ID
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: The product ID
 *            schema:
 *              type: number
 *        responses:
 *         200:
 *          description: The product
 *          content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/Product'
 *         404:
 *          description: product not found
 */

/**
 * @openapi
 * /products/add:
 *      post:
 *        summary: Add a new product
 *        tags: [Products]
 *        description: Add a new product
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        responses:
 *         201:
 *          description: Product was successfully added
 *          content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/Product'
 *         400:
 *          description: product not added
 */

/**
 * @openapi
 * /products/update/{id}:
 *      put:
 *        summary: Update a product by ID
 *        tags: [Products]
 *        description: Update a product by ID
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: The product ID
 *            schema:
 *              type: number
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        responses:
 *         200:
 *          description: Product was successfully updated
 *          content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/Product'
 *         404:
 *          description: product not found
 */

/**
 * @openapi
 * /products/delete/{id}:
 *      delete:
 *        summary: Delete a product by ID
 *        tags: [Products]
 *        description: Delete a product by ID
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: The product ID
 *            schema:
 *              type: number
 *        responses:
 *         200:
 *          description: Product was successfully deleted
 *          content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/Product'
 *         404:
 *          description: product not found
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         code:
 *           type: string
 *           required: true
 *         name:
 *           type: string
 *           required: true
 *         description:
 *           type: string
 *           required: true
 *         price:
 *           type: number
 *           required: true
 *         quantity:
 *           type: number
 *           default: 0
 *         inventoryStatus:
 *           type: string
 *           required: true
 *         category:
 *           type: string
 *           required: true
 *         image:
 *           type: string
 *         rating:
 *           type: number
 */

export default router;
