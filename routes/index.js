const express = require('express');
const router = express.Router();
const todos = require('../services/todos');


router.get('/', function(req, res, next) {
  res.json({message: 'OK'});
});

module.exports = router;
