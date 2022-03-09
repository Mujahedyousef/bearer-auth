"use strict"
const { DB } = require('./Auth/models')
const server = require('./Auth/server')
require('dotenv').config()
DB.sync().then(() => {
    server.start(process.env.PORT || 3030)
}).catch(console.error)
