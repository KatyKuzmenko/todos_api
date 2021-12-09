const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.json({ message: 'use /todos endpoint' })
})

module.exports = router
