const express = require('express');
const router = express.Router();
const todos = require('../services/todos');

/* GET quotes listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await todos.getMultiple(req.query.page));
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

module.exports = router;
