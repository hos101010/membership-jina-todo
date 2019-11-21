const connection = require('./connection');

const projects = {
    findCategoryById(id) {
        return connection.query('select category_id, category_name from category where category_owner=?',id);
    },
    findCategoryByCategoryName(category_name) {
        return connection.query('select category_id from category where category_name=?', category_name);
    },
    findTodoById(id){
        return connection.query('select category_id, category_name, todo_id, content, attached from category c left join todo t on c.category_id = t.category where category_owner=?',id);
    },
    findMaxTodoId(){
        return connection.query('select max(todo_id) as num from todo');
    },
    addTodo(todo_info){
        connection.query(`insert into todo values (${todo_info.todo_id}, '${todo_info.content}', ${todo_info.attached}, ${todo_info.category})`);
    }
    //prepared statement
}

module.exports = projects;