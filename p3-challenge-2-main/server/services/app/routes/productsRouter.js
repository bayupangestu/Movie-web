const express = require("express");
const ProductController = require("../controllers/ProductController");
const { authentication, isAdmin } = require("../middlewares/auth");
const router = express.Router();

//Read Products
router.get("/", ProductController.getProducts);

// Get Products By Id
router.get("/:id", ProductController.getProductById);

// router.use(authentication);

//Post Product
router.post(
  "/",
  // isAdmin,
  ProductController.postProduct
);

// Update Product By Id
router.put(
  "/:id",
  // isAdmin,
  ProductController.putProductById
);

// Delete Product By Id
router.delete(
  "/:id",
  // isAdmin,
  ProductController.deleteProductById
);

module.exports = router;
