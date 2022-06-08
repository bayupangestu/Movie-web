const { comparePassword } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const { User } = require("../models");

class AuthController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const data = await User.create({ username, email, password, phoneNumber, address });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const emailTrue = await User.findOne({ where: { email } });
      if (!emailTrue) {
        throw "EmailPasswordFalse";
      }
      const passwordTrue = comparePassword(password, emailTrue.password);
      if (!passwordTrue) {
        throw "EmailPasswordFalse";
      }
      const payload = {
        id: emailTrue.id,
        email: emailTrue.email,
      };

      const jwtToken = createToken(payload);
      res.status(200).json({
        id: emailTrue.id,
        username: emailTrue.username,
        role: emailTrue.role,
        accessToken: jwtToken,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
