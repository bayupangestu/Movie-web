const express = require("express");
const router = express.Router();
const productsRouter = require("./productsRouter.js");
const userRouter = require("./userRouter.js");

router.use("/users", userRouter);

router.use("/products", productsRouter);

module.exports = router;
