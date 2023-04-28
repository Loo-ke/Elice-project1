const submitBtn = document.getElementById("submit-btn");
const userIdInput = document.getElementById("user-id");
const userPwInput = document.getElementById("user-pw");
const idError = document.getElementById("id-error");
const pwError = document.getElementById("pw-error");

submitBtn.onclick = () => {
    const data = {
        userId: userIdInput.value,
        password: userPwInput.value,
    };
    fetch("/auth/login", {
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
            console.log(data);
            fetch(`/user/mypage/${userIdInput.value}`, {
                method: "GET",
                headers: {
                "Authorization": `Bearer ${token}`
                }
            })
            .then((res) => res.json())       
            //회원 로그인 페이지 || 관리자 페이지 이동
            .then((mypageData) => {
                const userId = mypageData.userId;
                localStorage.setItem("userId", JSON.stringify(userId));
                if (mypageData.isAdmin) {
                    window.location.href = "/admin/index.html";
                } else {
                    window.location.href = "/main/main.html";
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
