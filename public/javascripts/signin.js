document.getElementById("sign_in_button").addEventListener("click", () => {
    let id = document.querySelector('#signin_id_input').value;
    let pw = document.querySelector('#signin_pw_input').value;

    fetch('/signin',{            
        method: 'POST',
        body: JSON.stringify({id : id, pw: pw}),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then((res)=>{
        if (res.redirected){
            window.location.href = res.url;
            return;
        }
        return res.json();
    })
    .then(response=>{
        alert(response.msg);
    })
    .catch(error => console.error('Error:', error));
}, false);
