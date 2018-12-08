// require node modules
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// require controllers here
const userController = require('./controllers/userController');
// const sessionController = require('./controllers/sessionController');
const cookieController = require('./util/cookieController');
const todoController = require('./controllers/todoController');

const app = express();

const PORT = 3000;

// express app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

require('dotenv').config();
// mongoose connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true },
  (err) => {
    if (err) console.log(err);
    else console.log('Connected to the database!');
  },
);

// // serve index.html
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/index.html'));
// });

// // index html loads, then goes to get style.css
// app.get('/style.css', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/style.css'));
// });

// // index html loads, then goes to get script.js
// app.get('/script.js', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/script.js'));
// });

// app.get('/', cookieController.readCookie, (req, res) => {
//   return res.json({ 'what we got back from cookie': res.locals.newUser });
// });

app.post('/signup', userController.signup, cookieController.setSSIDCookie, (req, res) => {
  return res.status(200).json({'user_id': res.locals.id});
});

app.post('/login', userController.login, cookieController.setCookie, (req, res) => {
  return res.status(200).json({'user_id': res.locals.id});
})

app.get('/todo/all', todoController.findAll, (req, res) => {
  return res.status(200).json({'all the items': res.locals.list});
});

app.post('/todo/create', todoController.createItem, (req, res) => {
  return res.status(200).json({'todo item created': res.locals.itemTodo});
});

app.patch('/todo/update', todoController.updateItem, (req, res) => {
  return res.status(200).json({'todo item updated': res.locals.updateItem });
});

app.patch('/todo/update/:id', todoController.updateItemById, (req, res) => {
  return res.status(200).json({'todo item updated': res.locals.updateItem });
});

app.delete('/todo/delete/:id', todoController.deleteItemById, (req, res) => {
  return res.status(200).json({'todo item deleted by id': res.locals.todoItem});
});

app.use(express.static(path.join(__dirname, '../client/')));

// start server with port
app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listening on PORT ${PORT}`);
});
