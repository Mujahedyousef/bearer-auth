"use strict"
const base64 = require('base-64')
const { user } = require('../models/index.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.SECRET

const basicAuth = async (req, res, next) => {
    let basicAuthText = req.headers.authorization;
    try {
        if (basicAuthText) {
            // console.log(111,basicAuthText);
            let basicHeaderParts = basicAuthText.split(' ');
            let encodedPart = basicHeaderParts.pop();
            // console.log(2222,encodedPart);
            let decoded = base64.decode(encodedPart);
            let [username, password] = decoded.split(':')
            // console.log(333,decoded);
            const userInf = await user.findOne({ where: { username: username } })
            const validforPassword = await bcrypt.compare(password, userInf.password)
            if (validforPassword) {
                let newToken = jwt.sign({ username: user.username }, SECRET);
                userInf.token = newToken;
                // console.log(444,userInf.token);
                res.status(200).json(userInf);
            } else {
                res.status(403).send('invalid sign in Password')
            }
        }
    } catch (error) {
        res.status(403).send('invalid sign in Username')
    }

}
module.exports = basicAuth;