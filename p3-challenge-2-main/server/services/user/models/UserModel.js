const { getDatabase } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

class UserModel {
  static async getAllUsers() {
    try {
      const db = getDatabase();
      const users = await db.collection("users").find().toArray();
      return users;
    } catch (error) {
      throw error;
    }
  }
  static async getUserById(id) {
    try {
      const db = getDatabase();
      const user = await db.collection("users").findOne({ _id: ObjectId(id) });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async postUser({ username, email, password, role, phoneNumber, address }) {
    try {
      const db = getDatabase();
      const user = await db.collection("users").insertOne({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async deleteUserById(id) {
    try {
      const db = getDatabase();
      const user = await db.collection("users").deleteOne({ _id: ObjectId(id) });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserModel;
