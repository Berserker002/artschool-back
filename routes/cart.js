const router = require("express").Router();

const {
    getCart,
    updateCart,
    createCart
} = require("../app/services/cart/controllers/cartControllers");

router.post("/", createCart);

router.get("/:id", getCart);

router.put("/:id", updateCart);

module.exports = router;
