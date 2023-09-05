const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    imageUrls: [String],
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    variations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariation",
      },
    ],
  },
  {
    timestamps: true,
  }
);

productSchema.index({
  name: "text",
  description: "text",
  mapping: {
    ref: "ProductCategoryMapping",
    fields: ["name", "description"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
