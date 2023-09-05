const router = require("express").Router();

const {
  listProductCategories,
  createProductCategory,
  getProductCategory,
  updateProductCategory,
} = require("../app/services/product/controllers/productCategoryController");
const authenticateToken = require("../app/middleware");

router.get("/", listProductCategories);

router.post("/", createProductCategory);

router.get("/:id", getProductCategory);
router.put("/:id", updateProductCategory);

module.exports = router;
