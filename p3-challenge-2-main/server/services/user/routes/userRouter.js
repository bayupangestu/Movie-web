const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getUserById);

router.post("/", UserController.postUser);

router.delete("/:id", UserController.deleteUserById);

module.exports = router;
