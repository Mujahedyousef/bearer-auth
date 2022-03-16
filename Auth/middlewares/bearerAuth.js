"use strict"

const { user } = require('../models/index.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.SECRET


const bearerAuth = async (req, res, next) => {
    let basicAuthText = req.headers.authorization;
    try {
        if (basicAuthText) {
            let basicHeardersParts = basicAuthText.split(' ');
            let encoded = basicHeardersParts.pop();
            let decode = base64.decode(encoded);
            let [username, password] = decode.split(":")
            const User = await user.findOne({ where: { username: username } });
            const valid = await bcrypt.compare(password, User.password);
            if (valid) {
                req.User = User
                let newToken = jwt.sign({ username: User.username }, SECRET, { expiresIn: 900000 })
                User.token = newToken;
                res.status(200).json(User)
                next()
            } else {
                res.status(403).send('invalid sign in Password')
            }
        }

    } catch (error) {
        console.error(`${error}`)
        res.status(403).send('invalid sign in Username')
    }
}
module.exports = bearerAuth;



