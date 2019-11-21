let add_todo = document.querySelectorAll('.add_todo');
add_todo.forEach(element => {
    element.addEventListener("click", () => {
        let board_owner = document.querySelector('.board_owner').innerHTML;
        let content = event.target.parentNode.childNodes[3].value;
        let category = event.target.parentNode.childNodes[1].innerHTML;
        fetch(`/users/board/${board_owner}/add`,{            
            method: 'POST',
            body: JSON.stringify({category: category,
                                content : content}),
            headers:{
            'Content-Type': 'application/json'
            }
        })
        .then(res=> res.json())
        .then(response=>{
            alert(response.msg);
            window.location.href = `/users/board/${board_owner}`;
        })
        .catch(error => console.error('Error:', error));
    }, false);
});