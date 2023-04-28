/*
const apiUrl = 'http://localhost:4000/admin/register/category/';
const categoryTable = document.getElementById('category-table');
const addCategoryButton = document.getElementById('add-category-btn');
const addCategoryModal = document.getElementById('addCategoryModal');
const addCategoryForm = document.getElementById('add-category-form');
const modifyCategoryModal = document.getElementById('modifyCategoryModal');
const modifyCategoryForm = document.getElementById('modify-category-form');

// 카테고리 리스트 초기화
function initCategories() {
	getCategoryList()
		.then(renderCategoryTable)
		.catch(handleError);
}

// 카테고리 리스트 불러오기
function getCategoryList() {
	return fetch(apiUrl, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` // 추가된 코드
		}
	})
		.then(response => {
		if (!response.ok) {
			throw new Error('API 요청이 실패했습니다.');
		}
		return response.json();
		});
}

// 카테고리 리스트 테이블에 렌더링
function renderCategoryTable(categories) {
	categoryTable.innerHTML = `
		<thead>
		<tr>
			<th>등록일자</th>
			<th>수정일자</th>
			<th>카테고리명</th>
			<th></th>
		</tr>
		</thead>
		<tbody>
		${categories.map(category => `
			<tr data-category-id="${category.category_id}">
			<td>${category.createdAt}</td>
			<td>${category.update}</td>
			<td>${category.name}</td>
			<td>
				<button class="button is-small is-info" onclick="openModifyCategoryModal(${category.category_id})">수정</button>
				<button class="button is-small is-danger" onclick="deleteCategory(${category.category_id})">삭제</button>
			</td>
			</tr>
		`).join('')}
		</tbody>
	`;
}

// 카테고리 추가 모달 열기
function openAddCategoryModal() {
  	addCategoryModal.classList.add('is-active');
}

// 카테고리 추가 모달 닫기
function closeAddCategoryModal() {
	addCategoryModal.classList.remove('is-active');
	addCategoryForm.reset();
}

// 카테고리 추가하기
function addCategory() {
	const formData = new FormData(addCategoryForm);
	const body = {
		'new-category': formData.get('new-category'),
		'category-img': formData.get('category-img')
	};
	return fetch(apiUrl + 'edit', {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
		.then(response => {
		if (!response.ok) {
			throw new Error('API 요청이 실패했습니다.');
		}
		closeAddCategoryModal();
		initCategories();
		})
		.catch(handleError);
}

// 카테고리 수정 모달 열기
function openModifyCategoryModal(categoryId) {
	const titleInput = modifyCategoryForm.querySelector('#titleInput');
	titleInput.value = getCategoryName(categoryId);
	modifyCategoryForm.dataset.categoryId = categoryId;
	modifyCategoryModal.classList.add('is-active');
}
*/

// 데이터를 받아올 URL
const API_URL = 'http://localhost:4000';

// API 요청을 보내는 함수
const sendRequest = async (method, url, data = null) => {
	try {
		const response = await fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
		});

		const responseData = await response.json();
		return responseData;
	} catch (error) {
		console.log(error);
		return { // 요청이 실패했을 시, 임시 데이터를 반환
		data: [
			{
			category_id: '1',
			category_name: '시즈닝',
			nation_id: 'KR',
			createdAt: '2023-04-18',
			update: '2023-04-20'
			},
			{
			category_id: '2',
			category_name: '스낵',
			nation_id: 'JP',
			createdAt: '2023-04-19',
			update: '2023-04-21'
			},
			{
			category_id: '3',
			category_name: '음료',
			nation_id: 'US',
			createdAt: '2023-04-20',
			update: '2023-04-22'
			}
		]
		};
	}
	};

// 카테고리 조회 함수
const getCategoryList = async () => {
	const response = await sendRequest('GET', `${API_URL}/admin/register/category/`);
	return response.data;
};

// 카테고리 추가 함수
const addCategory = async (categoryName, categoryImg) => {
	const data = {
		'new-category': categoryName,
	};
	await sendRequest('POST', `${API_URL}/admin/register/category/edit`, data);
};

// 카테고리 수정 함수
const modifyCategory = async (categoryId, categoryName) => {
	const data = {
		update: categoryName
	};
	await sendRequest('PATCH', `${API_URL}/admin/register/category/update?category-id=${categoryId}`, data);
};

// 카테고리 삭제 함수
const deleteCategory = async (categoryId) => {
	const data = {
		delete: '삭제하기'
	};
	await sendRequest('DELETE', `${API_URL}/admin/register/category/delete?category-id=${categoryId}`, data);
};

// 카테고리 목록을 테이블에 출력하는 함수
const displayCategoryList = async () => {
	const categoryList = await getCategoryList();
	const tbody = document.querySelector('#category-table tbody');
	tbody.innerHTML = '';

	categoryList.forEach((category) => {
		const tr = document.createElement('tr');
		tr.innerHTML = `
		<td>${category.createdAt}</td>
		<td>${category.update}</td>
		<td>${category.category_name}</td>
		<td><button class="modify" data-category-id="${category.category_id}" data-category-name="${category.category_name}">수정</button></td>
		<td><button class="delete" data-category-id="${category.category_id}">삭제</button></td>
		`;
		tbody.appendChild(tr);
	});
};

// 카테고리 데이터를 불러오는 API 요청 코드

fetch('http://localhost:4000/admin/register/category')
	.then((response) => response.json())
	.then((data) => {
		getCategoryList = data;
		displayCategoryList();
	})
	.catch((error) => console.error(error));