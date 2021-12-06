const express = require("express");
const router = express.Router();
const todos = require("../services/todos");

router.get("/", async function (req, res, next) {
  try {
    res.json(await todos.getMultiple());
  } catch (err) {
    console.error(`Error while getting todos `, err.message);
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    res.json(await todos.getTodoById(req.params.id));
  } catch (err) {
    console.error(`Error while getting todo`, err.message);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    res.json(await todos.create(req.body));
  } catch (err) {
    console.error(`Error while posting todos`, err.message);
    next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await todos.remove(req.params.id));
  } catch (err) {
    console.error(`Error while removing todo`, err.message);
    next(err);
  }
});

router.patch("/:id", async function (req, res, next) {
  try {
    const { title } = req.body;
    res.json(await todos.update(req.params.id, title));
  } catch (err) {
    console.error(`Error while updating todo`);
    next(err);
  }
});

module.exports = router;
