"use strict";

const fs = require("fs");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const dataProduct = JSON.parse(fs.readFileSync("./data/products.json", "UTF-8"));
    dataProduct.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      el.slug = `${el.name.split(" ").join("-")}-USD${el.price}`;
    });
    await queryInterface.bulkInsert("Products", dataProduct, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {});
  },
};
