"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Image, { foreignKey: "productId" });
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
      // Product.belongsTo(models.User, { foreignKey: "authorId" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: `name cannot be null`,
          },
          notEmpty: {
            args: true,
            msg: `name cannot be empty`,
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: `slug cannot be null`,
          },
          notEmpty: {
            args: true,
            msg: `slug cannot be empty`,
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: `description cannot be null`,
          },
          notEmpty: {
            args: true,
            msg: `description cannot be empty`,
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: `price cannot be null`,
          },
          notEmpty: {
            args: true,
            msg: `price cannot be empty`,
          },
          min: {
            args: 100,
            msg: `Minimum Price is 100`,
          },
        },
      },
      mainImg: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            args: true,
            msg: `mainImg input must be url format`,
          },
          notNull: {
            args: true,
            msg: `mainImg cannot be null`,
          },
          notEmpty: {
            args: true,
            msg: `mainImg cannot be empty`,
          },
        },
      },
      categoryId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
      authorMongoId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  Product.beforeValidate((product) => {
    product.slug = `${product.name.split(" ").join("-")}-USD${product.price}`;
  });
  return Product;
};
