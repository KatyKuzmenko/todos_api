const express = require('express')
const router = express.Router()
const jwt = require('../services/jwt')

router.post('/', async function(req, res, next) {
  try {
    res.json(jwt.generateToken(req.params.userId))
  } catch {
    console.error(`Error while getting token `, err.message)
    next(err)
  }
})

module.exports = router