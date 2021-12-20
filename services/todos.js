const db = require('./dataBase')
const helper = require('../helper')
const { is } = require('express/lib/request')

async function getMultiple() {
  const rows = await db.query('SELECT * FROM todos ORDER by id ASC')
  const data = helper.emptyOrRows(rows)

  return data
}

async function getTodoById(id) {
  const rows = await db.query(`SELECT * FROM todos WHERE id=${id}`)
  const data = helper.emptyOrRows(rows)

  return data
}

async function create(todo) {
  const result = await db.query('INSERT INTO todos(title) VALUES ($1) RETURNING *', [todo.title])
  return result[0]
}

async function remove(id) {
  const result = await db.query(`DELETE FROM todos WHERE id = ${id}`)
  
  return result
}

async function removeCompleted() {
  const result = await db.query(`DELETE FROM todos WHERE iscompleted = true`)
  return 'Completed todos was successfully removed'
}

async function update(todo) {
    const result = await db.query(`UPDATE todos SET title = $2, iscompleted = $3 WHERE id = $1 RETURNING *`, [
      todo.id,
      todo.title,
      todo.iscompleted,
    ])
    console.log(result[0])
    return result[0]
}

async function toggleAll(iscompleted) {
  const result = await db.query(`UPDATE todos SET iscompleted = $1`, [iscompleted])

  return iscompleted
}

module.exports = {
  getMultiple,
  create,
  remove,
  getTodoById,
  update,
  toggleAll,
  removeCompleted,
}
