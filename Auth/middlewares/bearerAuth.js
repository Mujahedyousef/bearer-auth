"use strict"

require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || hello;
const { user } = require('../models/index');
//  const bcrypt = require('bcrypt')


const bearerAuth = async (req, res, next) => {
    if (req.headers.authorization) {
        try {
            let bearerHeadersParts = req.headers.authorization.split(' ');
            let token = bearerHeadersParts.pop();

            if (token) {
                const userToken = jwt.verify(token, SECRET);

                const User = await user.findOne({ where: { username: userToken.username } });
                console.log(userToken);
                if (User) {
                    req.token = userToken;
                    req.User = User;
                    next();
                } else {
                    res.status(403).send('invalid user')
                }
            }
        } catch (error) {
            res.status(403).send('invalid Token');
        }
    } else {
        res.status(403).send('Empty Token')
    }
}

module.exports = bearerAuth;







