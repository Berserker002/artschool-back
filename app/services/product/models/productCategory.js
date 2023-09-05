const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: String,
    description: String,
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: false,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
  },
  {
    timestamps: true,
  }
);

productCategorySchema.index({ name: "text", description: "text" });

const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);

module.exports = ProductCategory;
