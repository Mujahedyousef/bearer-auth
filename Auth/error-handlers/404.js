"use strict";

module.exports = (req, res) => {
    res.status(403).json({

        status: 403,
        message: `the page is not found please make sure from the path. `
    })
}