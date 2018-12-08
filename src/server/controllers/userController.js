const User = require('../models/userModel');

const userController = {};

userController.signup = (req, res, next) => {
  const { username, password } = req.body;
  const newUser = new User({ username: username, password: password });
  newUser.save((err, user) => {
    if (err) return res.status(400).json(err);
    res.locals.id = user._id;
    next();
    // next();
  });
};

userController.login = (req, res, next) => {
  const { username, password } = req.body;
  User.find({ username: username}, (err, user) => {
    if (err) return res.status(400).json({ error: err });
    console.log(user);
    if (password === user[0].password) {
      res.locals.id = user[0]._id;
      next();
    } else {
      return res.status(400).json({ error: 'wrong password'});
    }
  });
};

module.exports = userController;
