const express = require("express");
const ProductsController = require("../controllers/ProductsController");
const router = express.Router();

router.get("/", ProductsController.getAllProducts);
router.get("/:id", ProductsController.getProductById);
router.post("/", ProductsController.postProduct);
router.put("/:id", ProductsController.putProduct);
router.delete("/:id", ProductsController.deleteProductById);

module.exports = router;
