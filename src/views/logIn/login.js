const submitBtn = document.getElementById("submit-btn");
const userId = document.getElementById("user-id");
const userPw = document.getElementById("user-pw");
const idError = document.getElementById("id-error");
const pwError = document.getElementById("pw-error");

submitBtn.onclick = () => {
    const data = {
        userId: userId.value,
        password: userPw.value,
    };
    fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((data) => {
        //로그인 성공
        if (data.token) {
            const token = data.token;
            localStorage.setItem("token", JSON.stringify(token));
            console.log(token);
            fetch(`http://localhost:4000/mypage/${userId.value}`, {
                method: "GET",
                headers: {
                "Authorization": `Bearer ${token}`
                }
            })
            .then((res) => res.json())
            //회원 로그인 페이지 || 관리자 페이지 이동
            .then((mypageData) => {
                if (mypageData.isAdmin) {
                    window.location.href = "/src/views/admin/index.html";
                } else {
                    window.location.href = "/src/views/main/main.html";
                }
            })
            .catch((err) => console.error(err));
        //로그인 실패 에러 메세지 출력
        } else if (data.error) {
            console.log(data.error);
            if(data.error === "없는 아이디입니다.") {
                idError.style.display = "block";
                idError.innerHTML = data.error;
            } else if(data.error === "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.") {
                idError.style.display = "none";
                pwError.style.display = "block";
                pwError.innerHTML = data.error;
            }
        //로그인 실패
        } else {
            console.log("로그인 실패");
        }
    })
    .catch((err) => console.error(err));
}
