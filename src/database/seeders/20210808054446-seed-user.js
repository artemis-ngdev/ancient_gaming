"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("User", [
      {
        name: "Artemis",
        balance: 100,
      },
      {
        name: "Mary",
        balance: 900,
      },
      {
        name: "George",
        balance: 1000,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("User", null, {});
  },
};
