const mongoose = require("mongoose");

const productCategoryMappingSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productCategoryMappingSchema.index(
  { productId: 1, categoryId: 1 },
  { unique: true }
);

const ProductCategoryMapping = mongoose.model(
  "ProductCategoryMapping",
  productCategoryMappingSchema
);

module.exports = ProductCategoryMapping;
