const db = require("./dataBase");
const helper = require("../helper");
const config = require("../config");

async function getMultiple() {
  const rows = await db.query("SELECT * FROM todos");
  const data = helper.emptyOrRows(rows);

  return data;
}

async function create(todo) {
  const result = await db.query(
    "INSERT INTO todos(title, isCompleted) VALUES ($1, $2) RETURNING *",
    [todo.title, todo.isCompleted]
  );
  let message = "Error while creating todo";

  if (result.length) {
    message = "Todo was successfully created";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM todos WHERE id = ${id}`);
  let message = "Error while deleting todo";

  if (result.length) {
    message = "Todo was successfully removed";
  }

  return message;
}

module.exports = {
  getMultiple,
  create,
  remove
};
