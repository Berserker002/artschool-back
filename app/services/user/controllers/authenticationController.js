const User = require("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
exports.register = async (req, res) => {
  try {
    const { email = '', password  = ''} = req.body;
    if (!email && !password){
      return res.status(500).json({ error: "Please provide email and password" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to register user" });
  }
};

// Authenticate a user and generate a JWT token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to authenticate user" });
  }
};
