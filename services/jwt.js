const jwt = require('jsonwebtoken')
secret = 'SECRET_KEY_RANDOM'

const registration = (req, res) => {
  try {
    const {login, password} = req.body
  } catch {
    
  }
}

const generateToken = (id) => {
  const token = jwt.sign({userId: id}, secret, { expiresIn: 1000000 })
  return token
}

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    })
  }

  jwt.verify(token, secret, (err) => {
    if (err) {
      return res.status(401).send({
        message: 'Restricted access',
      })
    }
    next()
  })
}

module.exports = {verifyToken, generateToken}
