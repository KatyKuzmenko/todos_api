const bcrypt = require('bcryptjs')
const db = require('./dataBase')
const helper = require('../helper')

async function saveUser(user) {
  const result = await db.query('INSERT INTO users(login, password) VALUES($1, $2) RETURNING *', [user.login, user.password])
  return result[0]
}

async function getUsers() {
  const rows = await db.query('SELECT * FROM users ORDER by user_id ASC')
  const data = helper.emptyOrRows(rows)

  return data
}

async function getUserById(id) {
  const rows = await db.query(`SELECT * FROM users WHERE user_id=${id}`)
  const data = helper.emptyOrRows(rows)

  return data
}

async function deleteUser(id) {
  const result = await db.query(`DELETE FROM users WHERE user_id = ${id}`)
  console.log(result)
  return result
}

async function getUserByLogin(login) {
  const rows = await db.query(`SELECT * FROM users WHERE login=${login}`)
  const data = helper.emptyOrRows(rows)

  return data
}

module.exports = { saveUser, getUsers, getUserById, deleteUser, getUserByLogin }
