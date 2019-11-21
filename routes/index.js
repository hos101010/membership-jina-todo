var express = require('express');
var router = express.Router();
const passport = require('../passport/passport');

router.use('/signin', function(req, res, next){
  passport.authenticate(`local`, function(err, user, msg){
    if (!user){
      res.json(msg);
      return;
    }

    req.session.user = {id : user.id};

    if (user.is_admin) {
      res.redirect('/admin');
      return;
    }
    res.redirect('/users/choice');
  })(req, res, next);}
);

router.get('/signout', function(req, res, next){
  console.log('hi');
  delete req.session.user;
  req.session.save(() => {
    res.redirect('/');
  });
});


router.get('/', function(req, res, next) {
  res.render('signin');
});


module.exports = router;
