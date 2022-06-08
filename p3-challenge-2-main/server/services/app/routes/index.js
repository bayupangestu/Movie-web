const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController.js");
const routerProducts = require("./productsRouter.js");
const routerCategories = require("./categoriesRouter.js");
const routerUser = require("./userRouter.js");
const errorHandler = require("../middlewares/errorHandler.js");
const { authentication, isAdmin } = require("../middlewares/auth.js");

router.get("/");

router.post(
  "/register",
  // authentication,
  // isAdmin,
  AuthController.register
);

router.post("/login", AuthController.login);

router.use("/products", routerProducts);

router.use("/categories", routerCategories);

router.use("/user", routerUser);

router.use(errorHandler);

module.exports = router;
