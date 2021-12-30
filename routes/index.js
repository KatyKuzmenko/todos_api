const express = require('express')
const router = express.Router()
const jwt = require('../services/jwt')

router.get('/', function (req, res, next) {
    res.json(jwt.generateToken(req.params.userId))
})

module.exports = router
