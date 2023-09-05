const router = require("express").Router();

const {
  listUsers,
  createUser,
  getUser,
  updateUser,
} = require("../app/services/user/controllers/userController");

router.get("/", listUsers);

router.post("/", () => {
  createUser;
});

router.get("/:id", () => {
  getUser;
});

router.put("/:id", () => {
  updateUser;
});

module.exports = router;
