const router = require("express").Router();

const {
  listProducts,
  createProduct,
  getProduct,
  updateProduct,
} = require("../app/services/product/controllers/productController");
const authenticateToken = require("../app/middleware");

router.get("/", listProducts);
router.post("/", createProduct);

router.get("/:id", getProduct);
router.put("/:id", updateProduct);

module.exports = router;
