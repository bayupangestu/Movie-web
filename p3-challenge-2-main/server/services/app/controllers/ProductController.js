const {
  Product,
  Category,
  Image,
  // User,
  sequelize,
} = require("../models/");

class ProductController {
  // Post Product
  static async postProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        name,
        description,
        price,
        mainImg,
        authorId,
        authorMongoId,
        categoryId,
        images1,
        images2,
        images3,
      } = req.body;
      const data = await Product.create(
        {
          name,
          description,
          price,
          mainImg,
          authorId,
          authorMongoId,
          categoryId,
        },
        { transaction: t }
      );

      const image = await Image.bulkCreate(
        [
          { productId: data.id, imgUrl: mainImg },
          { productId: data.id, imgUrl: images1 },
          { productId: data.id, imgUrl: images2 },
          { productId: data.id, imgUrl: images3 },
        ],
        { transaction: t }
      );
      await t.commit();
      res.status(201).json({
        message: `Success create product and Images`,
        productCreated: data,
        imageCreated: image,
      });
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }

  // Get Product
  static async getProducts(req, res, next) {
    try {
      const data = await Product.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          { model: Category, attributes: { exclude: ["createdAt", "updatedAt"] } },
          // { model: User, attributes: { exclude: ["createdAt", "updatedAt", "password", "id"] } },
        ],
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
        include: [{ model: Image, attributes: { exclude: ["createdAt", "updatedAt"] } }],
      });
      if (!data) {
        throw `DataNotFound`;
      } else {
        res.status(200).json({
          message: `Found data with ID ${id} Success`,
          products: data,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  // Update Product by ID
  static async putProductById(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const data = await Product.findByPk(id);
      if (!data) {
        throw `DataNotFound`;
      } else {
        const { id } = req.params;
        const { name, description, price, mainImg, categoryId, images1, images2, images3 } =
          req.body;
        let update = await Product.update(
          {
            name,
            description,
            price,
            mainImg,
            categoryId,
          },
          {
            where: {
              id,
            },
            transaction: t,
            returning: true,
          }
        );
        update = update[1][0];
        const destroyImage = await Image.destroy({ where: { productId: id }, transaction: t });
        const updateImage = await Image.bulkCreate(
          [
            { productId: update.id, imgUrl: mainImg },
            { productId: update.id, imgUrl: images1 },
            { productId: update.id, imgUrl: images2 },
            { productId: update.id, imgUrl: images3 },
          ],
          { transaction: t }
        );
        await t.commit();
        res.status(200).json({
          message: `Update data with ID ${id} Success`,
        });
      }
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }

  // Delete Product by ID
  static async deleteProductById(req, res, next) {
    const { id } = req.params;
    try {
      const data = await Product.findByPk(id);
      if (!data) {
        throw `DataNotFound`;
      } else {
        await Product.destroy({ where: { id } });
        res.status(200).json({
          message: `Delete Product ID ${id} Success`,
          product: data,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
