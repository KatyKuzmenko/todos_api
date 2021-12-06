const db = require("./dataBase");
const helper = require("../helper");
const config = require("../config");

async function getMultiple() {
  const rows = await db.query("SELECT * FROM todos");
  const data = helper.emptyOrRows(rows);

  return data;
}

async function getTodoById(id) {
  const rows = await db.query(`SELECT * FROM todos WHERE id=${id}`);
  const data = helper.emptyOrRows(rows);
  return data;
}

async function create(todo) {
  const result = await db.query(
    "INSERT INTO todos(title) VALUES ($1) RETURNING *",
    [todo.title]
  );
  let message = "Error while creating todo";

  if (result.length) {
    message = "Todo was successfully created";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM todos WHERE id = ${id}`);
  return "Todo was successfully removed";
}

async function update(id, title) {
  console.log(id, title);
  const result = await db.query(`UPDATE todos SET title = $2 WHERE id = $1`, [
    id,
    title,
  ]);

  return "Todo title was successfully updated";
}

module.exports = {
  getMultiple,
  create,
  remove,
  getTodoById,
  update,
};
