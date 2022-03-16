"use strict"
const { Sequelize, DataTypes } = require('sequelize')
const user = require('./user.model')
require('dotenv').config()

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL; // npm i sqlite3

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions)


module.exports = {
    DB: sequelize,
    user: user(sequelize, DataTypes)
}