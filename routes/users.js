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

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await users.deleteUser(req.params.id))
  } catch (err) {
    console.error(`Error while removing a user`, err.message)
    next(err)
  }
})

async function registration(req,res) {
  try {
    const {login, password} = req.body
    const candidate = await getUserByLogin({login})
    if (candidate) {
      return res.status(400).json({message: `User with login ${login} is already exists`})
    }
    const hashedPassword = bcrypt.hashSync(password, 6)
    const user = {login, password: hashedPassword}
    await saveUser(user)
    return res.json({message: 'User is successfully saved'})
  } catch {
    res.status(400).json({message: 'Registration failed. Try again'})
  }
}

module.exports = router
