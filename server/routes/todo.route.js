const express = require('express');
const router = express.Router();
const {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} = require('../controllers/todo.controller.js');

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
