// app.js

const express = require("express");
const dbConnect = require("../db/config");
const userRoutes = require("../routes/user");
const authRoutes = require("../routes/auth");
const authenticateToken = require("./middleware");
const app = express();
const productRoutes = require("../routes/product");
const productCategoryRoutes = require("../routes/productCategory");
const productCategoryMappingRoutes = require("../routes/productCategoryMapping");
const cartRoutes = require("../routes/cart");

var cors = require("cors");
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/productCategory", productCategoryRoutes);
app.use("/api/productCategoryMapping", productCategoryMappingRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);

dbConnect();
const port = 8001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
