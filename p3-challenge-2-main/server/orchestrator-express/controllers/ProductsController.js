const axios = require("axios");
const redis = require("../config/redis.js");

class ProductsController {
  static async getAllProducts(req, res) {
    try {
      const productsCache = await redis.get("products");
      if (productsCache) {
        console.log("dari cache");
        const products = JSON.parse(productsCache);
        res.status(200).json(products);
      } else {
        console.log("dari axios");
        const { data } = await axios({
          method: "GET",
          url: "https://cartier-server-services-app.herokuapp.com/products",
        });
        await redis.set("products", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const productCached = await redis.get(`products`);
      if (productCached) {
        console.log("dari cache");
        const product = JSON.parse(productCached);
        const productById = product.find((el) => el.id == id);
        if (!productById) {
          throw { name: "Product not found", message: "Product not found" };
        } else {
          const { data } = await axios({
            url: `https://cartier-server-services-user.herokuapp.com/users/${productById.authorMongoId}`,
            method: "GET",
          });
          productById.User = data;
          await redis.del("products");
          res.status(200).json(productById);
        }
      } else {
        console.log("dari axios");
        const { data: product } = await axios({
          method: "GET",
          url: `https://cartier-server-services-app.herokuapp.com/products/${id}`,
        });
        const { data: user } = await axios({
          url: `https://cartier-server-services-user.herokuapp.com/users/${product.products.authorMongoId}`,
          method: "GET",
        });
        product.products.User = user;
        res.status(200).json(product.products);
      }
    } catch (error) {
      if (error.name === "Product not found") {
        res.status(404).json({ message: error.message });
      } else if (error.message === "Request failed with status code 404") {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(500).json(error);
      }
    }
  }

  static async postProduct(req, res) {
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
      const { data } = await axios({
        method: "POST",
        url: `https://cartier-server-services-app.herokuapp.com/products`,
        data: {
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
        },
      });
      await redis.del("products");
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async putProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, mainImg, categoryId, images1, images2, images3 } = req.body;
      const { data } = await axios({
        method: "PUT",
        url: `https://cartier-server-services-app.herokuapp.com/products/${id}`,
        data: { name, description, price, mainImg, categoryId, images1, images2, images3 },
      });
      await redis.del("products");
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteProductById(req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        method: "DELETE",
        url: `https://cartier-server-services-app.herokuapp.com/products/${id}`,
      });
      await redis.del("products");
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = ProductsController;
