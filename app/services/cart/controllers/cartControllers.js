const Cart = require("../models/cart");
const mongoose = require("mongoose");
const validateMongoDbId = require("../../../utils/validateMongodbId");
exports.createCart = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { items = [], userId } = req.body;

    const cart = await Cart.create({ user: userId });

    items.forEach((item) => {
      cart.items.push(item);
    });

    cart.save();
    await session.commitTransaction();
    session.endSession();
    return res.status(201).json(cart);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return res.status(500).json({ error: error });
  }
};

exports.getCart = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findCart = await Cart.findOne({ user: id }).populate({
      path: "items.productVariation",
      model: "ProductVariation",
    });
    let totalPrice = 0;
    let totalItems = 0;
    findCart.items.forEach((item) => {
      const currentItems = item.quantity;
      totalItems += currentItems;
      totalPrice += item.productVariation.price * currentItems;
    });
    res.json({ data: findCart, totalItems, totalPrice });
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { items } = req.body;
    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    if (items) cart.items = items;
    await cart.save();
    return res.json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the cart" });
  }
};
