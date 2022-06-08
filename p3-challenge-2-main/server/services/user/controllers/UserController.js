const UserModel = require("../models/UserModel");

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      users.forEach((user) => delete user.password);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.getUserById(id);
      delete user.password;
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async postUser(req, res) {
    try {
      const { username, email, password, role, phoneNumber, address } = req.body;
      const user = await UserModel.postUser({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      res.status(200).json({ message: "success create user", UserId: user.insertedId });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async deleteUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.getUserById(id);
      if (!user) {
        throw { name: "data not found", message: "Data not found" };
      }
      await UserModel.deleteUserById(id);
      res.status(200).json({ message: `Success delete user with id ${user._id}` });
    } catch (error) {
      if (error.name === "data not found") {
        res.status(404).json({ message: error.message });
      } else if (error.name === "BSONTypeError") {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

module.exports = UserController;
