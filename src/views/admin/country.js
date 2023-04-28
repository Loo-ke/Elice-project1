// API endpoint
const API_URL = "http://localhost:4000";

// 국가별 카테고리 조회 페이지 요소 선택
const countryCategoryManage = document.querySelector("#country-category-manage");
const addCountryBtn = countryCategoryManage.querySelector("#add-country-btn");
const categoryTable = countryCategoryManage.querySelector("table tbody");

// 국가별 카테고리 데이터 조회
function fetchCountryCategories() {
    fetch(`${API_URL}/nation/nation`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` // 추가된 코드
        },
    })
        .then((response) => response.json())
        .then((data) => {
        data.forEach((category) => {
            // 각 카테고리별 데이터를 테이블에 추가
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${category.createdAt}</td>
            <td>${category.updatedAt}</td>
            <td>${category.nation}</td>
            <td><button type="button" class="modify">수정하기</button></td>
            <td><button type="button" class="delete">삭제하기</button></td>
            `;
            categoryTable.appendChild(tr);
        });
        })
        .catch((error) => console.error(error));
    }

// 수정하기 버튼 클릭 시 해당 카테고리 데이터 조회
const modifyButtons = countryCategoryManage.querySelectorAll("#modify-country-btn");

modifyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nationId = button.dataset.nationId;

    fetch(`${API_URL}/nation/nation/${nationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      },
    })
      .then((response) => response.json())
      .then((category) => {
        // 카테고리 데이터를 수정하는 팝업창 띄우기
        const modal = document.querySelector('#modifyCountryModal');
        const nationInput = modal.querySelector('#nation-input');
        const saveBtn = modal.querySelector('#addCategoryButton');

        // 조회한 데이터를 모달에 보여주기
        nationInput.value = category.nation;

        modal.style.display = 'block';

        saveBtn.addEventListener('click', () => {
          // 수정된 데이터를 서버로 전송하는 코드 작성
          console.log(`카테고리 수정하기: ${nationId}, ${nationInput.value}`);
        });
      })
      .catch((error) => console.error(error));
  });
});
/*
// 수정하기 버튼 클릭 시 해당 카테고리 데이터 조회
const modifyButtons = countryCategoryManage.querySelectorAll("#modify-country-btn");

modifyButtons.forEach((button) => {
button.addEventListener("click", () => {
const nationId = button.dataset.nationId;

fetch(`${API_URL}/nation/nation/${nationId}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` // 추가된 코드
  },
})
.then((response) => response.json())
.then((category) => {
  // 카테고리 데이터를 수정하는 팝업창 띄우기
  console.log(`카테고리 수정 팝업창 띄우기: ${nationId}`);
})
.catch((error) => console.error(error));
});
});
*/

// 삭제하기 버튼 클릭 시 해당 카테고리 데이터 삭제
const deleteButtons = countryCategoryManage.querySelectorAll(".delete");

deleteButtons.forEach((button) => {
button.addEventListener("click", () => {
const nationId = button.dataset.nationId;

fetch(`${API_URL}/nation/nation/${nationId}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` // 추가된 코드
  },
})
.then((response) => {
  if (response.ok) {
    // 삭제 성공 시 해당 카테고리 데이터 테이블에서 삭제
    button.closest("tr").remove();
  }
})
.catch((error) => console.error(error));
});
});

// 국가 추가 버튼 클릭 시 팝업창 띄우기
addCountryBtn.addEventListener("click", () => {
  // 국가 추가 팝업창을 띄우는 코드 작성
  console.log("국가 추가 팝업창 띄우기");
  });
  
  // 페이지 로드 시 국가별 카테고리 데이터 조회
  fetchCountryCategories();


  // 국가 추가 모달창
const modalButton = document.querySelector('#add-country-btn');
const modal = document.querySelector('#addCountryModal');

modalButton.addEventListener('click', () => {
	modal.style.display = 'block';
});


// 국가 수정 모달창
const modalButtons2 = document.querySelectorAll('#modify-country-btn');
const modal5 = document.querySelector('#modifyCountryModal');

modalButtons2.forEach((button) => {
	button.addEventListener('click', () => {
    modal5.style.display = 'block';
});
});

// ------------------------------------------------ or --------------------------------------------------------------------

/*
// 카테고리 추가하기 버튼 클릭 이벤트 핸들러 함수
document.querySelector('#addCategoryButton').addEventListener('click', async (event) => {
    event.preventDefault();

    // 입력된 카테고리 정보 가져오기
    const title = document.querySelector('#titleInput').value;
    const imageFile = document.querySelector('#imageInput').files[0];
  
    // 서버로 카테고리 정보 전송
    const response = await fetch('/categories', {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (!response.ok) {
      console.error('Failed to add category.');
      return;
    }
  
    const category = await response.json();
  
    // 새로운 카테고리를 화면에 추가
    addCategoryToPage(category);
  
    // 모달창 닫기
    closeModal();
  });
  
  // 카테고리를 화면에 추가하는 함수
  function addCategoryToPage(category) {
    const categoriesList = document.querySelector('#categoriesList');
  
    // 새로운 카테고리를 나타내는 HTML 요소 생성
    const categoryItem = document.createElement('li');
    categoryItem.innerHTML = `
      <img src="${category.imageUrl}" alt="${category.title}" />
      <p>${category.title}</p>
      <button class="delete" data-category-id="${category.id}">삭제하기</button>
    `;
  
    // 새로운 카테고리를 리스트에 추가
    categoriesList.appendChild(categoryItem);
  }
  
  // 모달창 닫기 함수
  function closeModal() {
    const addCategoryModal = document.querySelector('#addCategoryModal');
    addCategoryModal.classList.remove('is-active');
  }

  */