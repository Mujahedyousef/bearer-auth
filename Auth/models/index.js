"use strict"
const { Sequelize, DataTypes } = require('sequelize')
const user = require('./user.model')
require('dotenv').config()

const POSTGRES_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.POSTGRES_URL; // npm i sqlite3

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};

const sequelize = new Sequelize(POSTGRES_URL, sequelizeOptions)
const UserModel = user(sequelize, DataTypes)

module.exports = {
    DB: sequelize,
    user: UserModel
}