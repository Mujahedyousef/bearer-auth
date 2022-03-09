"use strict"
module.exports = (error, req, res, next) => {
    res.status(500).json({
        status: 500,
        message: `server erroe :${error}`
    })
}