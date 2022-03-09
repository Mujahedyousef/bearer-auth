"use strict"

const user = (sequelize, DataTypes) => sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.VIRTUAL,

    }
})

module.exports = user;