const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    items: [
      {
        productVariation: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductVariation",
        },
        quantity: Number,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
