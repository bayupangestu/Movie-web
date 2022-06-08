const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const { authentication, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.get("/", CategoryController.getCategories);

//Middleware
// router.use(authentication);

router.post(
  "/",
  // isAdmin,
  CategoryController.postCategories
);

router.delete(
  "/:id",
  // isAdmin,
  CategoryController.deleteCategoriesById
);

module.exports = router;
