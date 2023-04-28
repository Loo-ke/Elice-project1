
// import { main } from "/public/js/main.js";
// const {loggedInUser} = await main();

const cartDetail = document.querySelector('.cart__detail') //배송비 및 토탈가격 포함 section
	const cartHaveProduct = document.querySelector('#cart__have__product') //장바구니 상품리스트 페이지

	const dataCount = localStorage.length;
	let nowcart = [];
      for(let i = 0; i < dataCount; i++){
         if(window.localStorage.key(i).includes("cart")){
					const key = localStorage.key(i);
					const data = JSON.parse(localStorage.getItem(key))
          nowcart.push(data)
         }
				}
  
		nowcart.forEach((cartItem) =>{
			const{ _id, product, price, amount, imgUrl} = cartItem
			cartHaveProduct.insertAdjacentHTML('beforeend', 
				`<div class="cart__product__list" id='productItem__${_id}'>
			
				<div class="list__img__block">
							<a href="#none"><img id="product__img__${_id}" src=${imgUrl} alt="상품이미지파일"></a>
						</div>
						<div class="list__name__block">
							<!-- 상품정보 파트 -->
							<span class="product__name__text" id="product__name__${_id}">${product}</span>
						
						</div>
						<div class="list__info__block">
							<!-- 수량 및 가격 -->
							<div class="product__quan">
								<span>수량:</span>

								<input class = "quan__input "id="quan__num__${_id}"value = '${amount}' readonly/>
							</div>
							<div class="product__price">
								<span>가격:</span>
								<span id="product__price__num__${_id}">${price*amount}</span> 
							</div>
						</div>
					</div>
					`)
		
			const amountNum= document.querySelector(`#quan__num__${_id}`)
			const productPrice = document.querySelector(`#product__price__num__${_id}`)
			const productItem = document.querySelector(`#productItem__${_id}`)
			const orderPrice = document.querySelector('#order__price__num')
			const totalPrice = document.querySelector('#total__price__num')

			const orderPriceFunc= ()=>{
					let orderPriceNum = 0;
						nowcart.forEach((cartItem) =>{
							const{ _id, price, amount} = cartItem
						let productPriceNum = price*amount  
						orderPriceNum += productPriceNum
					 })
					orderPrice.textContent = orderPriceNum
					if(parseInt(orderPrice.textContent)>50000){
						totalPrice.textContent = orderPrice.textContent 
				} else if(parseInt(orderPrice.textContent)<50000){
					totalPrice.textContent =  parseInt(orderPrice.textContent)+2500
				}
			}
			orderPriceFunc()
		})
		const orderBtn = document.querySelector('#order__btn')
		orderBtn.addEventListener('click',()=>{ // 주문자페이지로 데이터보내기
			
		})
		







		//주소 검색버튼

	const postSearchBtn = document.getElementById("post-search-btn");
	const userPost = document.getElementById("user-post");
	const userAddr = document.getElementById("user-addr");
	const userDetailAddr = document.getElementById("user-detail-addr");
	const oldAddr = document.querySelector('#oldAddr')
	const newAddr = document.querySelector('#newAddr')


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
