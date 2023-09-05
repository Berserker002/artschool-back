const router = require("express").Router();

const {
  listProductCategoryMappings,
  createProductCategoryMapping,
  getProductCategoryMapping,
  updateProductCategoryMapping,
} = require("../app/services/product/controllers/productCategoryMappingController");
const authenticateToken = require("../app/middleware");

router.get("/", listProductCategoryMappings);

router.post("/", createProductCategoryMapping);

router.get("/:id", getProductCategoryMapping);
router.put("/:id", updateProductCategoryMapping);

module.exports = router;
