const Product = require("../models/product");
const ProductVariation = require("../models/productVariation");
const mongoose = require("mongoose");
const validateMongoDbId = require("../../../utils/validateMongodbId");
// Get all products

exports.listProducts = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr)).populate("variations");
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const products = await query;
    res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};

exports.createProduct = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, description, imageUrl, variations } = req.body;
    const product = await Product.create({
      name,
      description,
      imageUrl,
    });

    const variationPromises = variations.map(async (variation) => {
      return ProductVariation.create({
        product: product._id,
        ...variation,
      });
    });

    const newVariations = await Promise.all(variationPromises);

    newVariations.forEach((vari) => {
      product.variations.push(vari);
    });

    product.save();
    await session.commitTransaction();
    session.endSession();
    return res.status(201).json(product);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return res.status(500).json({ error: error });
  }
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id).populate("variations");
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, imageUrls = [], status } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (name) product.name = name;
    if (description) product.description = description;
    if (imageUrls.length) product.imageUrls = imageUrls;
    if (status) product.status = status;
    await product.save();
    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the product" });
  }
};
