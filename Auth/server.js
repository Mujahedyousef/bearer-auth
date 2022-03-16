"use strict"
const express = require('express')
const app = express()
const cors = require('cors')
const routerUser = require('./routes/user')
const errorHandler = require('./error-handlers/500')
const bearerAuth = require('./middlewares/bearerAuth')
const notFound = require('./error-handlers/404')
const { user } = require('./models/index')
app.use(express.json())
app.use(cors())
app.use(routerUser)


app.get("/", (req, res) => {
    res.status(200).send('Welcome in Home page.')
})

app.get('/users', bearerAuth, async (req, res) => {
    const users = await user.findAll();
    res.status(200).json(users);
})

function start(port) {
    app.listen(port, () => {
        console.log(`The server is connection on ${port}`)
    })

    app.use(errorHandler)
    app.use('*', notFound)
}
module.exports = {
    app: app,
    start: start
}