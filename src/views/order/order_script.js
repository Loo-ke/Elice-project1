
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
      
console.log(nowcart);

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
		})
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
	

		orderBtn.addEventListener('click',()=>{ // 주문자페이지로 데이터보내기
			
		})
		orderPriceFunc()
	
