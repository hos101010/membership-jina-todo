document.querySelector('.update_privilege').addEventListener("click", () => {
    let checked_users = find_checks();
    send_to_server('/admin/update', checked_users);
}, false);

document.querySelector('.delete_privilege').addEventListener("click", () => {
    let checked_users = find_checks();
    send_to_server('/admin/delete', checked_users);
}, false);

document.querySelector('.projects').addEventListener("click", () => {
    window.location.href = '/admin/choice';
}, false);


function find_checks(){
    let checks = document.querySelectorAll('.main input[type="checkbox"]:checked');
    let checked_users = [];
    checks.forEach(element => {
        checked_users.push(element.name);
    });
    return checked_users;
}

function send_to_server(url,checked_users){
    fetch(url,{            
        method: 'POST',
        body: JSON.stringify({id :checked_users}),
        headers:{
          'Content-Type': 'application/json'
        }
    })
    .then(res=> res.json())
    .then(response=>{
        alert(response.msg);
        window.location.href = '/admin';
    })
    .catch(error => console.error('Error:', error));
}