const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('STAKES_NEW3', 'postgres', '7778', {
    dialect : 'postgres',
    host : 'localhost',
    port : 5432
})

module.exports = sequelize