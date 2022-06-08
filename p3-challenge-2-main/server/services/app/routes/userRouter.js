const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.get("/products", UserController.getProductsByCategory);

router.get("/products/:id", UserController.getProductById);

router.get("/top-products", UserController.getProductsByPrice);

module.exports = router;
