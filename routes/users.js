const express = require('express')
const router = express.Router()
const users = require('../services/users')

router.get('/', async function (req, res, next) {
  try {
    res.json(await users.getUsers())
  } catch (err) {
    console.error(`Error while getting users `, err.message)
    next(err)
  }
})

router.post('/', async function (req, res, next) {
  try {
    res.json(await users.saveUser(req.body))
  } catch (err) {
    console.error(`Error while saving a user`, err.message)
    next(err)
  }
})

router.get('/:id', async function (req, res, next) {
  try {
    res.json(await users.getUserById(req.params.id))
  } catch (err) {
    console.error(`Error while getting a user`, err.message)
    next(err)
  }
})

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await users.deleteUser(req.params.id))
  } catch (err) {
    console.error(`Error while removing a user`, err.message)
    next(err)
  }
})

module.exports = router
