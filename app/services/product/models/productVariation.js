const mongoose = require("mongoose");

const productVariationSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    size: String,
    color: String,
    price: {
      type: Number,
      required: true,
    },
    inventory: {
      type: Number,
      required: true,
    },
    imageUrls: [String],
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

const ProductVariation = mongoose.model(
  "ProductVariation",
  productVariationSchema
);

module.exports = ProductVariation;
