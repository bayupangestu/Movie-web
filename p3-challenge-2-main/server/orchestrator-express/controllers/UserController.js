const axios = require("axios");
const redis = require("../config/redis.js");

class UserController {
  static async getAllUsers(req, res) {
    try {
      const usersCache = await redis.get("users");
      if (usersCache) {
        console.log("dari cache");
        const users = JSON.parse(usersCache);
        res.status(200).json(users);
      } else {
        console.log("dari axios");
        const { data } = await axios({
          method: "GET",
          url: "https://cartier-server-services-user.herokuapp.com/users",
        });
        await redis.set("users", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        method: "GET",
        url: `https://cartier-server-services-user.herokuapp.com/users/${id}`,
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async postUser(req, res) {
    const { username, email, password, role, phoneNumber, address } = req.body;
    try {
      const { data } = await axios({
        url: "https://cartier-server-services-user.herokuapp.com/users/",
        method: "POST",
        data: {
          username,
          email,
          password,
          role,
          phoneNumber,
          address,
        },
      });
      await redis.del("users");
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async deleteUserById(req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        method: "DELETE",
        url: `https://cartier-server-services-user.herokuapp.com/users/${id}`,
      });
      await redis.del("users");
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = UserController;
