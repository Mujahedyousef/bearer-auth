"use strict"
require('dotenv').config()
const base64 = require('base-64')
const { user } = require('../models/index.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const basicAuth = async (req, res, next) => {
    let basicAuthText = req.headers.authorization;
    try {
        if (basicAuthText) {
            let basicHeardersParts = basicAuthText.split(' ');
            let encoded = basicHeardersParts.pop();
            let decode = base64.decode(encoded);
            console.log(decode);
            let [username, password] = decode.split(":")
            const User = await user.findOne({ where: { username: username } });
            // console.log(User.password);
            // console.log(password);
            const valid = await bcrypt.compare(password, User.password);
            console.log(valid);
            if (valid) {
                req.User = User;
                let newToken = jwt.sign({ username: User.username }, SECRET, { expiresIn: 900000 })
                User.token = newToken;
                res.status(200).json(User)
                next()
            } else {
                console.error;
                res.status(403).send('invalid sign in Password')
            }
        }

    } catch (error) {
        console.error(`${error}`)
        res.status(403).send('invalid sign in Username')
    }
}
module.exports = basicAuth;