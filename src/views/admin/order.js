// 주문 상태 조회 API를 호출하여 데이터 가져오기
function loadOrders() {
    fetch('/admin/orders/')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                // API 요청이 실패한 경우 임시 데이터를 사용
                return [
                    {
                        orderDate: '2023-04-26',
                        customerName: '엘리스',
                        productName: '사프란 1g',
                        totalPrice: '31,800원',
                        status: 'pending',
                        productId: 'temp_product_id'
                    },
                    {
                        orderDate: '2023-04-26',
                        customerName: '엘리스',
                        productName: '사프란 1g',
                        totalPrice: '31,800원',
                        status: 'process',
                        productId: 'temp_product_id'
                    },
                    {
                        orderDate: '2023-04-26',
                        customerName: '엘리스',
                        productName: '사프란 1g',
                        totalPrice: '31,800원',
                        status: 'cancel',
                        productId: 'temp_product_id'
                    },
                    {
                        orderDate: '2023-04-26',
                        customerName: '엘리스',
                        productName: '사프란 1g',
                        totalPrice: '31,800원',
                        status: 'pending',
                        productId: 'temp_product_id'
                    },
                    {
                        orderDate: '2023-04-26',
                        customerName: '엘리스',
                        productName: '사프란 1g',
                        totalPrice: '31,800원',
                        status: 'completed',
                        productId: 'temp_product_id'
                    },
                    {
                        orderDate: '2023-04-26',
                        customerName: '엘리스',
                        productName: '사프란 1g',
                        totalPrice: '31,800원',
                        status: 'process',
                        productId: 'temp_product_id'
                    },
                    {
                        orderDate: '2023-04-26',
                        customerName: '엘리스',
                        productName: '사프란 1g',
                        totalPrice: '31,800원',
                        status: 'completed',
                        productId: 'temp_product_id'
                    }
                ];
            }
        })
        .then(data => {
            // 데이터를 이용해 주문 내역 테이블 생성
            const ordersTable = document.querySelector('#order table tbody');
            ordersTable.innerHTML = '';
            data.forEach(order => {
                const row = `
                    <tr>
                    <td>${order.orderDate}</td>
                    <td>
                        <p>${order.customerName}</p>
                    </td>
                    <td>${order.productName}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                        <select id="status-select" class="status ${order.status}" data-product-id="${order.productId}">
                        <option value="pending"${order.status === 'pending' ? ' selected' : ''}>배송 준비중</option>
                        <option value="process"${order.status === 'process' ? ' selected' : ''}>배송중</option>
                        <option value="completed"${order.status === 'completed' ? ' selected' : ''}>배송 완료</option>
                        <option value="cancel"${order.status === 'cancel' ? ' selected' : ''}>주문 취소</option>
                        </select>
                    </td>
                    </tr>
                `;
                ordersTable.innerHTML += row;
            });


            // 배송상태 변경할 때마다 버튼 색상 바뀌게
            const statusSelects = document.querySelectorAll("#status-select");

            statusSelects.forEach(statusSelect => {
                statusSelect.addEventListener("change", () => {
                    const selectedOption = statusSelect.options[statusSelect.selectedIndex];

                    statusSelect.classList.remove("pending", "process", "completed", "cancel");
                    statusSelect.classList.add(selectedOption.value);
                });
            });
        })
        .catch(error => console.error(error));
}


// 주문 내역 페이지 로딩시 주문 조회
window.addEventListener('load', () => {
    loadOrders();
});

// 주문 상태 변경 이벤트 핸들러 등록
document.querySelectorAll('#order .status').forEach(select => {
    select.addEventListener('change', event => {
        const productId = event.target.getAttribute('data-product-id');
        const status = event.target.value;

        fetch(`/admin/orders/${productId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error, status = ' + response.status);
                }
                // 주문 상태 변경 후 주문 조회
                loadOrders();
            })
            .catch(error => console.error(error));
    });
});
