"use strict"

const { user } = require('../models/index.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.SECRET


const bearerAuth = async (req, res, next) => {
    let bearerAuthText = req.headers.authorization;
    // console.log(11,bearerAuthText);
    if (req.headers.authorization) {
        try {
            let bearerHeadersParts = bearerAuthText.split(' ');
            let token = bearerHeadersParts.pop()
            // console.log(22,token);
            if (token) {
                const parsedToken = jwt.verify(token, SECRET)
                
                const userInf = await user.findOne({ where: { username: parsedToken.username } })
                // console.log(33,userInf);
                if (userInf) {
                    req.token = parsedToken;
                    req.userInf = userInf;
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



