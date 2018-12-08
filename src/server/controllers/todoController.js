const Todo = require('../models/todoModel');

const todoController = {};

todoController.createItem = (req, res, next) => {
  const { todoItem } = req.body;
  const newItem = new Todo({ todoItem: todoItem});
  newItem.save((err, item) => {
    if (err) return res.json({error: err});
    res.locals.itemTodo = item.todoItem;
    next();
  });
};

todoController.findAll = (req, res, next) => {
  Todo.find({}, (err, list) => {
    if (err) return res.status(400).json({ error: err});
    res.locals.list = list;
    next();
  });
};

todoController.updateItem = (req, res, next) => {
  const { todoItem, todoUpdate } = req.body;
  const query = { todoItem: todoItem };
  // Todo.update(query, { todoItem: todoUpdate }, )

  Todo.findOneAndUpdate(query, { todoItem: todoUpdate }, {new: true}, (err, update) => {
    if (err) return res.status(400).json({ error: err });
    res.locals.updateItem = update.todoItem;
    console.log(update);
    next();
  });
};

todoController.updateItemById = (req, res, next) => {
  const { id } = req.params;
  const { todoUpdate } = req.body;
  const query = { _id: id };
  // Todo.update(query, { todoItem: todoUpdate }, )

  Todo.findByIdAndUpdate(query, { todoItem: todoUpdate }, {new: true}, (err, update) => {
    if (err) return res.status(400).json({ error: err });
    res.locals.updateItem = update.todoItem;
    console.log(update);
    next();
  });
};

todoController.deleteItemById = (req, res, next) => {
  const { id } = req.params;
  const query = { _id: id };
  Todo.findByIdAndDelete(query, (err, deleted) => {
    if (err) return res.status(400).json(err);
    res.locals.todoItem = deleted.todoItem;
    next();
  });
};

module.exports = todoController;
