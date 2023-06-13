// API 데이터 받아오기
function getMembers() {
  fetch("http://localhost:4000/admin/members")
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
          registerdate: "2023-04-18",
          name: "이수영",
          userId: "example123",
          phone: "010-1234-5678",
          address: "서울특별시 성동구 아차산로17길 48 성수낙낙 2층",
          edit: "admin",
        },
        {
          registerdate: "2023-04-18",
          name: "엘리스",
          userId: "elice1234",
          phone: "010-1234-5678",
          address: "서울특별시 성동구 아차산로17길 48 성수낙낙 2층",
          edit: "general",
        },
        {
          registerdate: "2023-04-18",
          name: "홍길동",
          userId: "example",
          phone: "010-1234-5678",
          address: "서울특별시 성동구 아차산로17길 48 성수낙낙 2층",
          edit: "general",
        },
        {
          registerdate: "2023-04-18",
          name: "홍길동",
          userId: "example",
          phone: "010-1234-5678",
          address: "서울특별시 성동구 아차산로17길 48 성수낙낙 2층",
          edit: "general",
        },
        {
          registerdate: "2023-04-18",
          name: "홍길동",
          userId: "example",
          phone: "010-1234-5678",
          address: "서울특별시 성동구 아차산로17길 48 성수낙낙 2층",
          edit: "general",
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
      <td>${member.registerdate}</td>
      <td><p>${member.name}</p></td>
      <td>${member.userId}</td>
      <td>${member.phone}</td>
      <td>${member.address}</td>
      <td>
        <div class="dropdown">
          <select class="status-account" data-userId="${member.userId}">
            <option value="general" ${
              member.edit === "general" ? "selected" : ""
            }>일반회원</option>
            <option value="admin" ${
              member.edit === "admin" ? "selected" : ""
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
      const edit = event.target.value;
      patchMember(userId, edit);
    });
  });
}

// 권한 수정
function patchMember(userId, edit) {
  fetch("http://localhost:4000/admin/members/${userId}", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, edit }),
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
