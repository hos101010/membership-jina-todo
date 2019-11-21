var express = require('express');
var router = express.Router();
const users = require('../model/users');
const projects = require('../model/projects');


function isAuthenticated(req, res, next) {
  //isAuthenticated() 안됨...왜?????????
  if (req.session.user){
    return next();
  }
  res.redirect('/');
}

async function hasAuthority(page_owner, board_owner) {
  let page_owner_info, admitted, field;
  
  [page_owner_info,field] = await users.findById(page_owner);
  [board_owner_info,fields] = await users.findById(board_owner);
  if (page_owner_info[0].is_admin){
    if (board_owner_info[0]){
      return true;
    }else return 'no_user';
  }

  if (page_owner == board_owner){
    return true;
  }

  [admitted, field] = await users.isAdmitted(page_owner, board_owner);
  if (admitted.length > 0){
    return true;
  }
  return false;
}


router.use('/choice', isAuthenticated, async function(req, res, next) {
  let [admitted, field] = await users.findAdmittedBoards(req.session.user.id);
  res.render('project_choice', {owner : req.session.user.id,
                                admitted : admitted});
});



router.use('/board/:id/add', isAuthenticated, async function(req, res, next) {
  let row, field;
  [row, field] = await projects.findCategoryByCategoryName(req.body.category);
  let category_id = row[0].category_id;

  [row,field] = await projects.findMaxTodoId();
  let max_id = row[0].num;

  await projects.addTodo({
    todo_id : max_id + 1,
    content : req.body.content,
    attached : null,
    category : category_id
  });

  res.json({msg:'추가가 완료되었습니다.'});
});


router.use('/board/:id', isAuthenticated, async function(req, res, next) {
  let auth = await hasAuthority(req.session.user.id, req.params.id);
  if (auth == 'no_user'){
    res.redirect('/admin/choice');
    return;
  }
  if (!auth){
    res.redirect('/users/choice');
    return;
  }

  
  let category_list, todo_list, field;
  [category_list, field] = await projects.findCategoryById(req.params.id);
  [todo_list, field] = await projects.findTodoById(req.params.id);

  category_list.sort(function(a,b){
    return a.category_id - b.category_id;
  })

  todo_list.sort(function(a,b){
    return a.category_id - b.category_id || a.todo_id - b.todo_id;
  })

  //sql sort

  console.log(req.user);
  
  res.render('project_board', {owner : req.session.user.id,
                              board_owner : req.params.id,
                              category_list : category_list,
                              todo_list : todo_list});
});



router.use('/admit_page', isAuthenticated, async function(req, res, next) {
  res.render('user_admit', {owner : req.session.user.id});
});

router.use('/admit_friend', isAuthenticated, async function(req, res, next) {
  await users.admitAnotherUser(req.session.user.id, req.body.friend);
  res.json({msg : '초대가 완료되었습니다.'});
});



module.exports = router;
