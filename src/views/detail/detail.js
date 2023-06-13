import { main } from "/public/js/main.js";
const {loggedInUser} = await main();

// css 마무리 *필요
// 미디어쿼리 *필요

// 상품명, 상품설명, 가격, 사진주소 api 패치 *완
// 장바구니 누르면 장바구니 데이터 만들기 *완
// 바로구매 누를시 회원이면 주문하기로, 비회원이면 로그인으로 *완
// 수량 버튼 누를시 수량 늘리기 *완
// 주문금액 합산 계산 *완


// 주소 토대로 자르고, 지워서 아이디 구하기
const html = window.location.href;
const sp = html.split("?");
const itemid = sp[1].replace("/", "");


// 프로덕트 정보 렌더링
const productName = document.querySelector(".product-name")
const productDesc = document.querySelector(".product-desc")
const productPrice = document.querySelector(".product-price")
const orderedPrice = document.querySelector(".ordered-price")
const productImg = document.querySelector(".product-img-container")
const productAmount = document.querySelector(".product-amount")
const buttonContainer = document.querySelector(".order-container")

fetch(`http://localhost:4000/product/${itemid}`)
  .then(res => res.json())
  .then((product)=>{
    productName.textContent = product.product;
    productDesc.textContent = product.detailDescription;
    productPrice.textContent = `₩${product.price}`;
    orderedPrice.textContent = `₩${product.price}`; 
    productImg.innerHTML += `<img src="${product.imgUrl}" class="product-img" />`

    // 로그인, 비로그인 유저별 주문버튼 생성
    if (loggedInUser) {
      buttonContainer.innerHTML += `<div class="button-sub-container">
      <a class="button-cart"><p>장바구니</p></a>
      <a href="/src/views/order" class="button-purchase"><p>바로구매</p></a>
    </div>`
    const PurchaseBtn = document.querySelector(".button-purchase")
    PurchaseBtn.classList.add(".button-cart");
    } else {
      buttonContainer.innerHTML += `<div class="button-sub-container">
      <a class="button-cart"><p>장바구니</p></a>
      <a href="/src/views/login/login.html" class="button-purchase"><p>바로구매</p></a>
    </div>`
    const PurchaseBtn = document.querySelector(".button-purchase")
    PurchaseBtn.addEventListener("click", ()=>{alert("로그인 후 이용가능합니다")});
    }
  })
  .then((product)=>{ // 로컬 저장소의 장바구니 조회 후 현재 제품 장바구니 추가
    const cartBtn = document.querySelector(".button-cart")
    cartBtn.addEventListener("click", ()=>{

      // 카트 현상황 갯수 조회
      let nowcart = [];
      const productInfo = {
        _id : itemid, //cart1234
        product : product.product,
        price : product.price,
        amount : productAmount.innerText,
        imgUrl : product.imgUrl,
      };
      const productInfoJson = JSON.stringify(productInfo);

      // 로컬저장소에 제이슨문자열로 현재상품 정보 전달
      for(let i = 0; i < window.localStorage.length; i++){
         if(window.localStorage.key(i).includes("cart")){
          nowcart.push(window.localStorage.key(i))
         }
      }
      
      const nextCartNum = `cart${ _id}`// cart1234
      if (nowcart.length !== 0){
        window.localStorage.setItem(nextCartNum, productInfoJson)
      } else {
        window.localStorage.setItem("cart1", productInfoJson)}

      alert("장바구니에 저장했습니다")
    })
  });


// 수량 증감
const amountPlus = document.querySelector(".button-plus")
const amountMinus = document.querySelector(".button-minus")

amountPlus.addEventListener("click", ()=>{
  const productPriceNum = parseInt(productPrice.textContent.split("₩")[1]) //금액 숫자만큼

  productAmount.textContent = parseInt(productAmount.textContent) + 1;
  orderedPrice.textContent = `₩${productPriceNum*parseInt(productAmount.textContent)}` //곱해서 총 주문가격 출력
})

amountMinus.addEventListener("click", ()=>{
  if(parseInt(productAmount.textContent) == 1){
    alert("최소 수량입니다")
  } else {
    const productPriceNum = parseInt(productPrice.textContent.split("₩")[1]) //금액 숫자만큼

    productAmount.textContent = parseInt(productAmount.textContent) - 1;
    orderedPrice.textContent = `₩${productPriceNum*parseInt(productAmount.textContent)}` //곱해서 총 주문가격 출력
  }
})



// 로그인, 비로그인 유저별 주문버튼 생성

