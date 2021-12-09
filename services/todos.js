const db = require('./dataBase')
const helper = require('../helper')

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
  let message = 'Error while creating todo'

  if (result.length) {
    message = 'Todo was successfully created'
  }

  return { message }
}

async function remove(id) {
  const result = await db.query(`DELETE FROM todos WHERE id = ${id}`)

  return 'Todo was successfully removed'
}

async function removeCompleted() {
  const result = await db.query(`DELETE FROM todos WHERE iscompleted = true`)

  return 'Completed todos was successfully removed'
}

async function update(id, title, iscompleted) {
  if (!title) {
    const result = await db.query(`UPDATE todos SET iscompleted = $2 WHERE id = $1`, [
      id,
      iscompleted,
    ])

    return 'Todo status was successfully updated'
  } else {
    const result = await db.query(`UPDATE todos SET title = $2 WHERE id = $1`, [id, title])

    return 'Todo title was successfully updated'
  }
}

async function toggleAll(iscompleted) {
  const result = await db.query(`UPDATE todos SET iscompleted = $1`, [iscompleted])

  return 'All todos toggled'
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
