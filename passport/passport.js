const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('../model/users');

passport.setConfig = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false
  }, async (id, password, done) => {
    let [result,fields] = await users.findById(id);

    if (result.length == 0){
      return done(null, false, { msg: '존재하지 않는 아이디입니다' });
    }
    if (result[0].user_pw != password){
      return done(null, false, { msg: '비밀번호가 틀렸습니다' });
    }
    return done(null, {
      id: id,
      is_admin: result[0].is_admin
    }); 
  }));
};

module.exports = passport;