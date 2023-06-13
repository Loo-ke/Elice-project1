const submitBtn = document.getElementById("submit-btn");
const userId = document.getElementById("user-id");
const userPw = document.getElementById("user-pw");

//데이터 전달

submitBtn.addEventListener("click", login);

function login() {
    const req = {
        userId: userId.value,
        password: userPw.value,
    };
    fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res) => console.log(res));
}
