// routes/userRoutes.js

const User = require("../models/user");

const bcrypt = require("bcrypt");

// Get all users
exports.listUsers = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = User.find(JSON.parse(queryStr));

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
      const productCount = await User.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const product = await query;
    res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      userName,
      phoneExtension,
      phoneNumber,
      imageUrl,
      dateOfBirth,
      password,
      role,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      userName,
      phoneExtension,
      phoneNumber,
      imageUrl,
      dateOfBirth,
      password: hashedPassword,
      role,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create a user" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch the user" });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      userName,
      phoneExtension,
      phoneNumber,
      imageUrl,
      dateOfBirth,
      password,
    } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Update the user's name and email
    if (name) user.name = name;
    if (email) user.email = email;
    if (userName) user.userName = userName;
    if (phoneExtension) user.phoneExtension = phoneExtension;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (imageUrl) user.imageUrl = imageUrl;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (password) user.password = hashedPassword;
    await user.save();
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the user" });
  }
};
