document.querySelector('.admit').addEventListener("click", () => {
    console.log('hi');
    let friend = document.querySelector('.friend').value;
    fetch(`/users/admit_friend`,{            
        method: 'POST',
        body: JSON.stringify({friend: friend}),
        headers:{
        'Content-Type': 'application/json'
        }
    })
    .then(res=> res.json())
    .then(response=>{
        alert(response.msg);
        window.location.href = `/users/admit_page`;
    })
    .catch(error => console.error('Error:', error));
}, false);