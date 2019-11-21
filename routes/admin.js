var express = require('express');
var router = express.Router();
const users = require('../model/users');

async function isAdmin(req, res, next) {
  if (req.session.user){
    let [result,fields] = await users.findById(req.session.user.id);
    if (result[0].is_admin){
      return next();
    }
  }
  res.redirect('/');
}

router.use('/update', isAdmin, function(req, res, next) {
  let checked_users = req.body.id;
  checked_users.forEach(async element => {
    await users.updateAdmin(element);
  });
  res.json({msg: '권한이 부여되었습니다.'});
});

router.use('/delete', isAdmin, async function(req, res, next) {
  let checked_users = req.body.id;
  checked_users.forEach(async element => {
    await users.deleteAdmin(element);
  });
  res.json({msg: '권한이 취소되었습니다.'});
});


router.use('/choice', isAdmin, async function(req, res, next) {
  let [all_users, field] = await users.findAllExceptMe(req.session.user.id);
  res.render('project_choice', {owner : req.session.user.id,
                                admitted : all_users});
});
 


router.use('/', isAdmin, async function(req, res, next) {
  let [result,fields] = await users.findAll();
  res.render('admin', {owner: req.session.user.id, users : result});
});

module.exports = router;