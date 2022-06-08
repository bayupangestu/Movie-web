const { Product, Category, Image } = require("../models/");

class UserController {
  static async getProductsByCategory(req, res, next) {
    try {
      let { category } = req.query;

      if (!category) {
        category = "Bracelets";
      }

      const data = await Product.findAll({
        include: [
          {
            model: Category,
            where: { name: category },
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getProductsByPrice(req, res, next) {
    try {
      const data = await Product.findAll({
        order: [["price", "DESC"]],
        limit: 4,
        include: [
          {
            model: Category,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  // Get Product by ID
  static async getProductById(req, res, next) {
    const { id } = req.params;
    try {
      const data = await Product.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Image,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: Category,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });
      if (!data) {
        throw `DataNotFound`;
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
