const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('6419ff9b1b45f875a33f31ba')
  .then(user => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    res.redirect('/');
  })
  .catch(err=>{console.error(err)})
};
