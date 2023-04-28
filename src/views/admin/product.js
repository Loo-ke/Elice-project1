/*
// 데이터를 보여주는 함수
function showProductData(productId) {
  fetch(`/product/product`)
    .then((response) => response.json())
    .then((data) => {
      const title = document.querySelector("#title");
      const category = document.querySelector("#category");
      const nation = document.querySelector("#nation");
      const price = document.querySelector("#price");
      const option = document.querySelector("#option");

      title.value = data.title;
      category.value = data.categoryId;
      nation.value = data.nationId;
      price.value = data.price;
      option.value = data.productOption;
    })
    .catch((error) => {
      console.error("Error:", error);
      // 임시 데이터 표시
      const title = document.querySelector("#title");
      const category = document.querySelector("#category");
      const nation = document.querySelector("#nation");
      const price = document.querySelector("#price");
      const option = document.querySelector("#option");

      title.value = "제목";
      category.value = "카테고리";
      nation.value = "국가";
      price.value = "가격";
      option.value = "옵션";
    });
}
*/

// 상품을 등록하는 함수
function addProductData(productData) {
  fetch("/product/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  })
    .then((response) => response.json())
    .then((data) => {
      // 등록 완료 메시지 표시
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
      // 등록 실패 메시지 표시
      console.log("Failed to add product");
    });
}

// 상품 정보를 수정하는 함수
function editProductData(productId, productData) {
  fetch(`/product/product/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  })
    .then((response) => response.json())
    .then((data) => {
      // 수정 완료 메시지 표시
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
      // 수정 실패 메시지 표시
      console.log("Failed to edit product");
    });
}

// 상품 정보를 삭제하는 함수
function deleteProductData(productId) {
  fetch(`/product/product/${productId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      // 삭제 완료 메시지 표시
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
      // 삭제 실패 메시지 표시
      console.log("Failed to delete product");
    });
}

// 상품 추가 모달 열기
const addProductBtn = document.querySelector("#add-product-btn");
const addProductModal = document.querySelector("#addProductModal");

addProductBtn.addEventListener("click", () => {
  addProductModal.classList.add("is-active");
});



/*
// HTML 요소 할당
const addProductBtn = document.querySelector("#add-product-btn");
const closeBtn = document.querySelector("#close");
const addProductModal = document.querySelector("#addProductModal");
const registerProductForm = document.querySelector("#registerProductForm");
const productList = document.querySelector("#product-list");

// 상품 추가 버튼 클릭 이벤트
addProductBtn.addEventListener("click", () => {
  addProductModal.classList.add("is-active");
});

// 상품 추가 모달 닫기 버튼 클릭 이벤트
closeBtn.addEventListener("click", () => {
  addProductModal.classList.remove("is-active");
});

// 상품 조회 함수
function getProductList() {
  fetch('http://localhost:4000/product/product', {
      method: "GET",
        headers: {
            "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` // 추가된 코드
        }
  })
    .then((res) => res.json())
    .then((data) => {
      // 받아온 데이터를 HTML에 추가
      productList.innerHTML = "";
      data.forEach((product) => {
        productList.innerHTML += `
          <div class="product-item">
            <div class="product-img">
              <img src="${product.imgUrl}" alt="${product.product}" />
            </div>
            <div class="product-info">
              <h3>${product.product}</h3>
              <p>${product.detailDescription}</p>
              <div class="product-price">₩ ${product.price}</div>
              <div class="product-inventory">재고 수: ${product.inventory}</div>
              <div class="product-action">
                <button class="edit-btn" data-id="${product._id}">수정</button>
                <button class="delete-btn" data-id="${product._id}">삭제</button>
              </div>
            </div>
          </div>
        `;
      });
    });
}

// 페이지 로드 시 상품 조회
getProductList();

// 상품 추가 폼 제출 이벤트
registerProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(registerProductForm);

  fetch("http://localhost:4000/product/product", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      // 상품 추가 후 상품 조회
      addProductModal.classList.remove("is-active");
      getProductList();
    })
    .catch((error) => console.error(error));
});
*/

// 테이블의 tbody 요소
const tableBody = document.querySelector('#product-manage table tbody');

function fetchProductData() {
  fetch("/product/product", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` // 추가된 코드
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('API 호출에 실패하였습니다.');
    }
    return response.json();
  })
  .then(data => {
    // 데이터를 사용하여 테이블에 새로운 행 추가
    data.forEach(product => {
      const newRow = `
        <tr>
          <td>${new Date(product.createdAt).toLocaleDateString()}</td>
          <td>${product.product}</td>
          <td>${product.nation}</td>
          <td>${product.category}</td>
          <td>${product.price}원</td>
          <td>${product.inventory}</td>
          <td><button type="button" class="modify" id="modify-product-btn">수정하기</button></td>
          <td><button type="button" class="delete">삭제하기</button></td>
        </tr>
      `;
      tableBody.innerHTML += newRow;
    });
  })
  .catch(error => {
    console.error(error);
  });
}

fetchProductData();
