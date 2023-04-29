// 관리자 메인 페이지 로딩 시 실행
window.onload = function() {
    loadMainData();
}

// 관리자 메인 페이지 데이터 로드 함수
async function loadMainData() {
    try {
    const response = await fetch('/admin/main');
    const data = await response.json();
    applyMainData(data);
    } catch (error) {
    console.log(error);
    }
}

    // 임시 데이터
    const data = {
        today_order: 529,
        today_visit: 2173,
        today_sales: '₩ 3,351,750',
        recent_status: [
            {
            date: '2023-04-28',
            user: '홍길동',
            product: '베트남 스파이스',
            price: '10,000원',
            status: 'completed'
            },
            {
                date: '2023-04-28',
                user: '조나단',
                product: '스페인 솔트',
                price: '15,000원',
                status: 'cancel'
            },
            {
                date: '2023-04-28',
                user: '김미미',
                product: '미국산 허브',
                price: '15,000원',
                status: 'pending'
            },
            {
                date: '2023-04-29',
                user: '홍길동',
                product: '사프란 1g',
                price: '31,800원',
                status: 'process'
            }
        ],
    };

    // 데이터 적용
    applyMainData(data);


// 관리자 메인 페이지 데이터 적용 함수
function applyMainData(data) {
    // 오늘의 주문량 적용
    const todayOrder = document.querySelector('#home .box-info li:nth-child(1) h3');
    todayOrder.textContent = data.today_order;

    // 오늘의 방문자수 적용
    const todayVisit = document.querySelector('#home .box-info li:nth-child(2) h3');
    todayVisit.textContent = data.today_visit;

    // 오늘의 매출 적용
    const todaySales = document.querySelector('#home .box-info li:nth-child(3) h3');
    todaySales.textContent = data.today_sales;

    // 최근 주문 현황 적용
    const recentStatus = document.querySelector('#home .table-data tbody');
    recentStatus.innerHTML = '';

    data.recent_status.forEach(function(order) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${order.date}</td>
            <td>
            <p>${order.user}</p>
            </td>
            <td>${order.product}</td>
            <td>${order.price}</td>
            <td><span class="status ${order.status}">${getStatusText(order.status)}</span></td>
        `;
        recentStatus.appendChild(tr);
    });
}

// 주문 상태 텍스트 반환 함수
function getStatusText(status) {
    switch (status) {
        case 'completed':
            return '배송 완료';
        case 'cancel':
            return '주문 취소';
        case 'pending':
            return '배송 준비중';
        case 'process':
            return '배송중';
        default:
            return '';
    }
}