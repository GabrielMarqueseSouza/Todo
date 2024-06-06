const Todo = require('../model/todo.model.js');

const getTodos = async (_, res) => {
  try {
    const todo = await Todo.find({});

    if (!todo) {
      res.status(404).json({ message: 'No tasks available' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const obj = req.body;
    obj.dateAdded = new Date().toLocaleString('en-US');

    const todo = await Todo.create(obj);
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id });

    if (!todo) {
      res.status(404).json({ message: 'Task not found' });
    }

    todo.isCompleted = !todo.isCompleted;
    await todo.save();

    res.status(200).json({ message: 'Task successfuly updated' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task successfuly deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};
