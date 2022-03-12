"use strict"
const express = require('express')
const router = express.Router()
// const base64 = require('base-64')
const bcrypt = require('bcrypt')
const basicAuth = require('../middlewares/basicAuth')
const bearerAuth = require('../middlewares/bearerAuth')
const { user } = require('../models/index')

router.post('/signUp', signUpFun)
router.post('/signIn', basicAuth, signInFun)
router.get('/secret', bearerAuth, userHandler)

async function signUpFun(req, res) {
    let userObject = req.body;
    try {
        let hashedPassword = await bcrypt.hash(req.body.password, 5);
        const newUser = await user.create({
            username: userObject.username,
            password: hashedPassword
        })
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error);
    }
}


function signInFun(req, res) {
    res.status(200).json(req.userInf)
}

function userHandler(req, res) {
    res.status(200).json(req.User)
}
module.exports = router;