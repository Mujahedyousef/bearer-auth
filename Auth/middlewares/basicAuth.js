"use strict"

require('dotenv').config()
const base64 = require('base-64');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { user } = require('../models/index');
const bcrypt = require('bcrypt')



const basicAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            let basicHeeaderParts = req.headers.authorization.split(' ');
            let encoded = basicHeeaderParts.pop();
            let decoded = base64.decode(encoded);
            let [username, password] = decoded.split(':');
            const User = await user.findOne({ where: { username: username } });
            const valid = await bcrypt.compare(password, User.password);
            if (valid) {
                req.User = User
                console.log(req.User);
                let newToken = jwt.sign({ username: User.username }, SECRET, { expiresIn: 900000 });
                User.token = newToken;
                res.status(200).json(User);
            } else {
                res.status(403).send('invalid login Password')
            }
        }
    } catch (error) {
        res.status(403).send('invalid login Username')
    }

}

module.exports = basicAuth;

