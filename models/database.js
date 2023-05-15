const Sequelize = require('sequelize');

const database = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db' // database_directory/database.db
  });

module.exports = database;