const router = require("express").Router();

const {
  login,
  register,
} = require("../app/services/user/controllers/authenticationController");

router.post("/login", login);

router.post("/register", register);

module.exports = router;
