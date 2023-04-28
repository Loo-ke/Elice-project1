import { main, logout } from "/public/js/main.js";
const { loggedInUser } = await main();
// 유효성 검사
const updateBtn = document.getElementById("update-btn");
const postSearchBtn = document.getElementById("post-search-btn");
const userIdInput = document.getElementById("user-id");
const userPwInput = document.getElementById("user-pw");
const userPwCfm = document.getElementById("user-pw-cfm");
const userName = document.getElementById("user-name");
const userPhone = document.getElementById("user-phone");
const userPost = document.getElementById("user-post");
const userAddr = document.getElementById("user-addr");
const userDetailAddr = document.getElementById("user-detail-addr");


const idError = document.getElementById("id-error");
const pwError = document.getElementById("pw-error");
const pwCrmError = document.getElementById("pw-cfm-error");
const nameError = document.getElementById("name-error");
const addrError = document.getElementById("addr-error");
const phoneError = document.getElementById("phone-error");

const validId = /^[a-zA-Z0-9]+$/;
const validIdLength = /^.{4,12}$/;
const validPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
const validName = /^[가-힣]{2,15}$/;
const validAddr = /^[가-힣0-9\s]+$/;
const validPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;

//데이터 불러오기
const token = JSON.parse(localStorage.getItem("token"));
const userId = JSON.parse(localStorage.getItem("userId"));

fetch(`/user/mypage/${userId}`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
    }
})
.then((res) => res.json())
.then((data) => {
    userIdInput.value = data.userId;
    // userPwInput.value = data.password;
    userName.value = data.name;
    userPhone.value = data.phone;
    userPost.value = data.address.postalCode;
    userAddr.value = data.address.address1;
    userDetailAddr.value = data.address.address2;
})
.catch((err) => console.error(err));

//탈퇴 기능



//수정 기능
updateBtn.onclick = () => {
    // 아이디를 입력 안했을 때
    if(userIdInput.value == "") {
        userIdInput.placeholder = "아이디를 입력하세요";
        userIdInput.focus();
        return false;
    }
    //이름을 입력 안했을 때
    else if (userName.value == "") {
        userName.placeholder = "이름을 입력하세요";
        userName.focus();//포커스를 Password박스로 이동.
        return false;
    }
    //핸드폰 번호를 입력 안했을 때
    else if (userPhone.value == "") {
        userPhone.placeholder = "핸드폰 번호를 입력하세요";
        userPhone.focus();//포커스를 Password박스로 이동.
        return false;
    }
    //데이터 보내기
    else {
        const req = {
            userId: userIdInput.value,
            // password: userPwInput.value,
            name: userName.value,
            phone: userPhone.value,
            address: {
                postalCode: userPost.value,
                address1: userAddr.value,
                address2: userDetailAddr.value,
            },
        };
        fetch(`/user/mypage/${userIdInput.value}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(req),
        })
        .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        })
        .then((data) => {
            alert(`정상적으로 수정되었습니다.`);
        })
        .catch((err) => {
            console.error(err.stack);
            alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
        });
    }
}

//onchange_id

userIdInput.onchange = () => {
    const userIdInputValue = userIdInput.value;
    if (!validId.test(userIdInputValue)) {
        idError.style.display = "block";
        idError.style.color = "red";
        idError.innerHTML = "아이디는 영문 혹은 영문과 숫자의 조합만 입력 가능 합니다";
    }else if (!validIdLength.test(userIdInputValue)) {
        idError.style.display = "block";
        idError.style.color = "red";
        idError.innerHTML = "아이디는 4~12자 이내로 입력 가능합니다";
    }else {
        idError.style.display = "none";
    }
    return false;
}

//onchange_pw
userPwInput.onchange = () => {
    const userPwInputValue = userPwInput.value;
    if (!validPw.test(userPwInputValue)) {
        pwError.style.display = "block";
        pwError.style.color = "red";
        pwError.innerHTML = "비밀번호는 8~20자 이내의 영문+숫자+특수문자 조합만 입력 가능 합니다";
    }else {
        pwError.style.display = "none";
    }
    return false;
}

//onchange_pwcfm
userPwCfm.onchange = () => {
    const userPwInputValue = userPwInput.value;
    const userPwCfmInput = userPwCfm.value;
    if (userPwInputValue !== userPwCfmInput) {
        pwCrmError.style.display = "block";
        pwCrmError.style.color = "red";
        pwCrmError.innerHTML = "비밀번호가 일치하지 않습니다";
    }else {
        pwCrmError.style.display = "none";
    }
    return false;
}

//onchange_name
userName.onchange = () => {
    const userNameInput = userName.value;
    if (!validName.test(userNameInput)) {
        nameError.style.display = "block";
        nameError.style.color = "red";
        nameError.innerHTML = "이름에 특수문자, 영어, 숫자는 사용할수 없습니다. 한글만 입력해주세요";
    }else {
        nameError.style.display = "none";
    }
    return false;
}

//onchange_address
userAddr.onchange = () => {
    const userAddrInput = userDetailAddr.value;
    if (!validAddr.test(userAddrInput)) {
        addrError.style.display = "block";
        addrError.style.color = "red";
        addrError.innerHTML = "주소에 특수문자, 영어는 사용할수 없습니다. 한글만 입력해주세요";
    }else {
        addrError.style.display = "none";
    }
    return false;
}

//onchange_phone
userPhone.onchange = () => {
    const userPhoneInput = userPhone.value;
    if (!validPhone.test(userPhoneInput)) {
        phoneError.style.display = "block";
        phoneError.style.color = "red";
        phoneError.innerHTML = "올바른 휴대폰 번호 숫자만 입력해주세요";
    }else {
        phoneError.style.display = "none";
    }
    return false;
}

// 주소 검색 함수
postSearchBtn.onclick = () => {
	new daum.Postcode({
        oncomplete: function(data) {
        	
        	console.log(data);
        	
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var jibunAddr = data.jibunAddress; // 지번 주소 변수
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('user-post').value = data.zonecode;
            if(roadAddr !== ''){
                document.getElementById("user-addr").value = roadAddr;
            } 
            else if(jibunAddr !== ''){
                document.getElementById("user-addr").value = jibunAddr;
            }
        }
    }).open();
}