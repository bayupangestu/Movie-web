const { Category } = require("../models");

class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const category = await Category.findAll();
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async postCategories(req, res, next) {
    try {
      const { name } = req.body;
      const data = await Category.create({
        name,
      });
      res.status(201).json({ message: `Success create category`, categoryCreated: data });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategoriesById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Category.findByPk(id);
      if (!data) {
        throw `DataNotFound`;
      } else {
        await Category.destroy({ where: { id } });
        res.status(200).json({
          message: `Delete Food ID ${id} Success`,
          category: data,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
