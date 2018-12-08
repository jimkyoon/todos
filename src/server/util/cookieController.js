const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  // set a cookie
  res.cookie('cookie', 'secret');
  next();
};

cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('user_id', res.locals.id);
  next();
};

cookieController.readCookie = (req, res, next) => {
  res.locals.newUser = req.cookies.user_id;
  next();
};

module.exports = cookieController;
