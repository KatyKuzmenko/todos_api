const db = require('./dataBase');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT id, todo, completed FROM todo OFFSET $1 LIMIT $2', 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function create(todo) {
  const result = await db.query(
    'INSERT INTO todo(todo, completed) VALUES ($1, $2) RETURNING *',
    [todo.todo, todo.author]
  );
  let message = 'Error while creating todo';

  if (result.length) {
    message = 'Todo was successfully created';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create
}
