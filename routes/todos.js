const express = require('express');
const router = express.Router();
const todos = require('../services/todos');

router.get('/', async function(req, res, next) {
  try {
    res.json(await todos.getMultiple());
  } catch (err) {
    console.error(`Error while getting todos `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await todos.create(req.body));
  } catch (err) {
    console.error(`Error while posting todos`, err.message);
    next(err);
  }
});

router.delete('/', async function(req, res, next) {
  try {
    res.json(await todos.remove(req.body))
  } catch(err) {
    console.error(`Error while removing todo`, err.message)
    next(err)
  }
})

module.exports = router;
