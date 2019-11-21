
let boards = document.querySelectorAll('.board');
boards.forEach(element => {
    element.addEventListener("click", () => {
        let user = event.target.value;
        if (user == 'mine') user = document.querySelector('.owner').innerHTML;
        window.location.href = `/users/board/${user}`;
    }, false);
});