const { Schema, model } = require('mongoose');

const TodoSchema = Schema(
  {
    task: { type: String, required: [true, 'Enter a task'] },
    category: {
      type: String,
      required: [true, 'A category must be assigned to a task'],
    },
    isCompleted: { type: Boolean, default: false },
    dateAdded: { type: String },
  },
  { timestamps: true }
);

const Todo = model('Todo', TodoSchema);

module.exports = Todo;
