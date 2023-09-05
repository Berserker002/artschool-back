const ProductCategoryMapping = require("../models/productCategoryMapping");
const mongoose = require("mongoose");
const validateMongoDbId = require("../../../utils/validateMongodbId");

exports.listProductCategoryMappings = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = ProductCategoryMapping.find(JSON.parse(queryStr));

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
      const productCount = await ProductCategoryMapping.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const productCategoryMapping = await query;
    res.json(productCategoryMapping);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};

exports.createProductCategoryMapping = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { productId, categoryId } = req.body;
    const oldProductProductCategoryMapping = await ProductCategoryMapping.find({
      productId: productId,
      categoryId: categoryId,
    });
    if (oldProductProductCategoryMapping.length) {
      return res.status(201).json(...oldProductProductCategoryMapping);
    }
    const productCategoryMapping = await ProductCategoryMapping.create({
      productId,
      categoryId,
    });

    await session.commitTransaction();
    session.endSession();
    return res.status(201).json(productCategoryMapping);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return res.status(500).json({ error: error });
  }
};

exports.getProductCategoryMapping = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProductCategoryMapping = await ProductCategoryMapping.findById(
      id
    );
    res.json(findProductCategoryMapping);
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateProductCategoryMapping = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, categoryId } = req.body;
    const productCategoryMapping = await ProductCategoryMapping.findById(id);
    if (!productCategoryMapping) {
      return res
        .status(404)
        .json({ error: "ProductCategoryMapping not found" });
    }
    if (productId) productCategoryMapping.productId = productId;
    if (categoryId) productCategoryMapping.categoryId = categoryId;
    await productCategoryMapping.save();
    return res.json(productCategoryMapping);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the product" });
  }
};
