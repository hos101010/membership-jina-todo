const connection = require('./connection');

const users = {
    findAll() {
        return connection.query('SELECT user_id, is_admin FROM user');
    },
    findAllExceptMe(id) {
        return connection.query('SELECT user_id, is_admin FROM user WHERE user_id != ?', id);
    },
    findById(id) {
        return connection.query('SELECT user_id, user_pw, is_admin FROM user WHERE user_id = ?', id);
    },
    updateAdmin(id){
        return connection.query('UPDATE user SET is_admin=true WHERE user_id = ?', id);
    },
    deleteAdmin(id){
        return connection.query('UPDATE user SET is_admin=false WHERE user_id = ?', id);
    },
    findAdmittedBoards(id){
        return connection.query('SELECT user FROM admitted_user WHERE admitted = ?', id);
    },
    isAdmitted(page_owner, board_owner){
        return connection.query('SELECT user FROM admitted_user WHERE user = ? AND admitted = ?', [board_owner, page_owner]);
    },
    admitAnotherUser(user, admitted_user){
        connection.query(`insert into admitted_user values (?, ?)`, [user, admitted_user]);
    }
}

module.exports = users;