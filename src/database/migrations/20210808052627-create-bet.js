"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Bet", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: "User", key: "id" },
      },
      betAmount: {
        type: Sequelize.FLOAT,
      },
      chance: {
        type: Sequelize.FLOAT,
      },
      payout: {
        type: Sequelize.FLOAT,
      },
      win: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Bet");
  },
};
