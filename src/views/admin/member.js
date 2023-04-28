const token = localStorage.getItem('token');
/*fetch("http://localhost:4000/admin/members", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // 추가된 코드
  },
  credentials: "include",
})

/*
const token = localStorage.getItem('token');
fetch('/api', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});*/


// API 데이터 받아오기
function getMembers() {
  fetch("http://localhost:4000/admin/members", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // 추가된 코드
  },
    credentials: "include",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("API 요청이 실패했습니다.");
      }
    })
    .then((data) => {
      // 받아온 데이터를 화면에 렌더링
      renderMembers(data);
    })
    .catch((error) => {
      // 에러 발생 시 임시 데이터를 화면에 렌더링
      const data = [
        {
          timestamps: "2023-04-18",
          name: "이수영",
          userId: "example123",
          phone: "010-1234-5678",
          address: "서울특별시 성동구 아차산로17길 48 성수낙낙 2층",
          isAdmin: true,
        },
        {
          timestamps: "2023-04-18",
          name: "엘리스",
          userId: "elice1234",
          phone: "010-1234-5678",
          address: "서울특별시 성동구 아차산로17길 48 성수낙낙 2층",
          isAdmin: false,
        },
        {
          timestamps: "2023-04-18",
          name: "홍길동",
          userId: "example",
          phone: "010-1234-5678",
          address: "서울특별시 성동구 아차산로17길 48 성수낙낙 2층",
          isAdmin: false,
        },
        {
          timestamps: "2023-04-18",
          name: "홍길동",
          userId: "example",
          phone: "010-1234-5678",
          address: "서울특별시 성동구 아차산로17길 48 성수낙낙 2층",
          isAdmin: false,
        },
        {
          timestamps: "2023-04-18",
          name: "홍길동",
          userId: "example",
          phone: "010-1234-5678",
          address: "서울특별시 성동구 아차산로17길 48 성수낙낙 2층",
          isAdmin: false,
        }
      ];
      renderMembers(data);
      console.error(error);
    });
}

// 회원 정보 렌더링
function renderMembers(members) {
  const table = document.querySelector("#user-manage table tbody");
  table.innerHTML = "";
  members.forEach((member) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${member.timestamps}</td>
      <td><p>${member.name}</p></td>
      <td>${member.userId}</td>
      <td>${member.phone}</td>
      <td>${member.address}</td>
      <td>
        <div class="dropdown">
          <select class="status-account" data-userId="${member.userId}">
            <option value="false" ${
              member.isAdmin === false ? "selected" : ""
            }>일반회원</option>
            <option value="true" ${
              member.isAdmin === true ? "selected" : ""
            }>관리자</option>
          </select>
        </div>
      </td>
    `;
    table.appendChild(row);
  });

  // 권한 수정 이벤트 핸들링
  const selectEls = document.querySelectorAll(".status-account");
  selectEls.forEach((selectEl) => {
    selectEl.addEventListener("change", (event) => {
      const userId = event.target.dataset.userId;
      const isAdmin = event.target.value;
      patchMember(userId, isAdmin);
    });
  });
}

// 권한 수정
function patchMember(userId, isAdmin) {
  fetch(`http://localhost:4000/admin/members/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, isAdmin }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("API 요청이 실패했습니다.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// 페이지 로드 시 회원 목록 불러오기
getMembers();


document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.querySelector("#logout");
  if (logoutButton) {
      logout(logoutButton);
  }
});



/*
function getUserInfo() {
  return fetch("http://localhost:4000/user/info", {
    credentials: "include"
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("API 요청이 실패했습니다.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}


// API 데이터 받아오기
function getMembers() {
  Promise.all([getUserInfo(), fetch("http://localhost:4000/admin/members", { credentials: "include" })])
    .then(([userInfoRes, membersRes]) => {
      if (!userInfoRes.ok) {
        throw new Error("로그인된 사용자 정보를 가져오는데 실패했습니다.");
      }
      if (!membersRes.ok) {
        throw new Error("API 요청이 실패했습니다.");
      }
      return Promise.all([userInfoRes.json(), membersRes.json()]);
    })
    .then(([userInfo, data]) => {
      // 받아온 데이터를 화면에 렌더링
      renderMembers(data, userInfo.isAdmin);
    })
    .catch((error) => {
      // 에러 발생 시 임시 데이터를 화면에 렌더링
      const data = [
        // ...
      ];
      renderMembers(data);
      console.error(error);
    });
}

// 회원 정보 렌더링
function renderMembers(members, isAdmin = false) {
  const table = document.querySelector("#user-manage table tbody");
  table.innerHTML = "";
  members.forEach((member) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${member.timestamps}</td>
      <td><p>${member.name}</p></td>
      <td>${member.userId}</td>
      <td>${member.phone}</td>
      <td>${member.address}</td>
      <td>
        ${
          isAdmin
            ? `
          <div class="dropdown">
            <select class="status-account" data-userId="${member.userId}">
              <option value="false" ${
                member.isAdmin === "false" ? "selected" : ""
              }>일반회원</option>
              <option value="admin" ${
                member.isAdmin === "admin" ? "selected" : ""
              }>관리자</option>
            </select>
          </div>
        `
            : ""
        }
      </td>
    `;
    table.appendChild(row);
  });

  // 권한 수정 이벤트 핸들링
const selectEls = document.querySelectorAll(".status-account");
selectEls.forEach((selectEl) => {
selectEl.addEventListener("change", (event) => {
const userId = event.target.dataset.userId;
const isAdmin = event.target.value;
const isAdmin = event.target.value === "admin";
// 권한 수정 API 호출
patchMember(userId, isAdmin);

// 만약 수정한 계정이 현재 로그인한 계정이면, 관리자 여부를 업데이트 한다.
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser && currentUser.userId === userId) {
  currentUser.isAdmin = isAdmin;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}
});
});
*/

/*
// API 데이터 받아오기
function getMembers() {
  if (!isAdmin()) {
    // 로그인된 사용자가 관리자가 아닌 경우, 경고 메시지 출력 후 함수 종료
    alert("관리자 권한이 필요합니다.");
    return;
  }
  
  fetch("http://localhost:4000/admin/members", {
    credentials: "include"
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("API 요청이 실패했습니다.");
      }
    })
    .then((data) => {
      // 받아온 데이터를 화면에 렌더링
      renderMembers(data);
    })
    .catch((error) => {
      // 에러 발생 시 임시 데이터를 화면에 렌더링
      const data = [
        {
          timestamps: "2023-04-18",
          name: "이수영",
          userId: "example123",
          phone: "010-1234-5678",
          address: "서울특별시 성동구 아차산로17길 48 성수낙낙 2층",
          isAdmin: "admin",
        }
      ];
      renderMembers(data);
      console.error(error);
    });
}




function getMembers() {
  // 관리자 여부 확인
  const isAdmin = checkIsAdmin(); // checkIsAdmin() 함수는 관리자 여부를 확인하는 함수

  // API 요청
  fetch("http://localhost:4000/admin/members", {
    credentials: "include"
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("API 요청이 실패했습니다.");
      }
    })
    .then((data) => {
      // 받아온 데이터를 화면에 렌더링
      renderMembers(data, isAdmin); // isAdmin 변수를 인자로 전달
    })
    .catch((error) => {
      // 에러 발생 시 임시 데이터를 화면에 렌더링
      const data = [
        {
          timestamps: "2023-04-18",
          name: "이수영",
          userId: "example123",
          phone: "010-1234-5678",
          address: "서울특별시 성동구 아차산로17길 48 성수낙낙 2층",
          isAdmin: "admin",
        }
      ];
      renderMembers(data, isAdmin); // isAdmin 변수를 인자로 전달
      console.error(error);
    });
}

// 회원 정보 렌더링
function renderMembers(members, isAdmin) {
  const table = document.querySelector("#user-manage table tbody");
  table.innerHTML = "";
  members.forEach((member) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${member.timestamps}</td>
      <td><p>${member.name}</p></td>
      <td>${member.userId}</td>
      <td>${member.phone}</td>
      <td>${member.address}</td>
      <td>
        <div class="dropdown">
          <select class="status-account" data-userId="${member.userId}">
            <option value="false" ${
              member.isAdmin === "false" ? "selected" : ""
            }>일반회원</option>
            ${
              isAdmin // 관리자 여부에 따라서 선택 옵션을 추가 또는 제거
                ? `<option value="admin" ${
                    member.isAdmin === "admin" ? "selected" : ""
                  }>관리자</option>`
                : ""
            }
          </select>
        </div>
      </td>
    `;
    table.appendChild(row);
  });

  // 권한 수정 이벤트 핸들링
  const selectEls = document.querySelectorAll(".status-account");
  selectEls.forEach((selectEl) => {
    selectEl.addEventListener("change", (event) => {
      const userId = event.target.dataset.userId;
      const isAdmin = event.target.value;
      patchMember(userId, isAdmin);
    });
  });
}





// 로그아웃
function logout() {
  fetch("http://localhost:4000/logout", {
    method: "POST",
    credentials: "include",
  })
    .then((res) => {
      if (res.ok) {
        // 로그아웃 성공 시, 토큰 삭제 및 로그인 페이지로 이동
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        throw new Error("API 요청이 실패했습니다.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// 로그아웃 버튼 이벤트 핸들링
const logoutBtn = document.querySelector("#logout-btn");
logoutBtn.addEventListener("click", () => {
  logout();
});
*/