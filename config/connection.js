const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.Madrid_db, 
    process.env.Madrid_user,
    process.env.Madrid_password,
    {
        host: 'localhost',
        dialect: 'postgres'
    }
)

module.exports = sequelize;