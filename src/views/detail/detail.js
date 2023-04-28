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

fetch(`/product/product/${itemid}`)
  .then(res => res.json())
  .then((product)=>{
    productName.textContent = product.product;
    productDesc.textContent = product.detailDescription;
    productPrice.textContent = `₩${product.price.toLocaleString()}`;
    orderedPrice.textContent = `₩${product.price.toLocaleString()}`; 
    productImg.innerHTML += `<img src="${product.imgUrl}" class="product-img" />`

    // 로그인, 비로그인 유저별 주문버튼 생성
    if (loggedInUser) {
      buttonContainer.innerHTML += `<div class="button-sub-container">
      <a class="button-cart"><p>장바구니</p></a>
      <a href="/order" class="button-cart" class="login-purchase"><p>바로구매</p></a>
    </div>`
    } else {
      buttonContainer.innerHTML += `<div class="button-sub-container">
      <a class="button-cart"><p>장바구니</p></a>
      <a href="/login/login.html" class="button-purchase"><p>바로구매</p></a>
    </div>`
    const PurchaseBtn = document.querySelector(".button-purchase")
    PurchaseBtn.addEventListener("click", ()=>{return alert("로그인 후 이용가능합니다")});
    }

    // 로컬 저장소의 장바구니 조회 후 현재 제품 장바구니 추가
    const cartBtn = document.querySelector(".button-cart");
    const itemName = product.product;
    const itemPrice = product.price;
    const itemImg = product.imgUrl;

    cartBtn.addEventListener("click", (e)=>{
      const productAmount = document.querySelector(".product-amount")
      
      // 로그인/비로그인이 장바구니를 누를 경우
      if(e.target.classList.contains("login-purchase") !== true){
      const productInfo = {
        _id : itemid,
        product : itemName,
        price : itemPrice,
        amount : productAmount.innerText,
        imgUrl : itemImg,
      };
      const productInfoJson = JSON.stringify(productInfo);

      for(let i = 0; i < window.localStorage.length; i++){
         if(window.localStorage.key(i).includes(itemid)){
          return alert("이미 장바구니에 담겨있는 상품입니다")
         }
      }
      // 로컬저장소에 제이슨문자열로 현재상품 정보 전달
      window.localStorage.setItem(`cart${itemid}`, productInfoJson)
      return alert("장바구니에 저장했습니다")
      } else if (e.target.classList.contains("login-purchase") == true){
        // 로그인이 구매하기를 누를 경우
        const productInfo = {
          _id : itemid,
          product : itemName,
          price : itemPrice,
          amount : productAmount.innerText,
          imgUrl : itemImg,
        };
        const productInfoJson = JSON.stringify(productInfo);
  
        for(let i = 0; i < window.localStorage.length; i++){
           if(window.localStorage.key(i).includes(itemid)){
            alert("이미 장바구니에 담겨있는 상품입니다")
           }
        }
  
        // 로컬저장소에 제이슨문자열로 현재상품 정보 전달
        window.localStorage.setItem(`cart${itemid}`, productInfoJson)
        return alert("주문페이지로 이동합니다")
      }
    })
    
  });
 

// 수량 증감
const amountPlus = document.querySelector(".button-plus")
const amountMinus = document.querySelector(".button-minus")

amountPlus.addEventListener("click", ()=>{
  const productPriceNum = parseInt(productPrice.textContent.replace(/[^0-9]/g, ""),10) //금액 숫자만큼

  productAmount.textContent = parseInt(productAmount.textContent) + 1;
  const returnedPrice = productPriceNum*parseInt(productAmount.textContent)
  orderedPrice.textContent = `₩${returnedPrice.toLocaleString()}` //곱해서 총 주문가격 출력
})

amountMinus.addEventListener("click", ()=>{
  if(parseInt(productAmount.textContent) == 1){
    alert("최소 수량입니다")
  } else {
    const productPriceNum = parseInt(productPrice.textContent.replace(/[^0-9]/g, ""),10) //금액 숫자만큼

    productAmount.textContent = parseInt(productAmount.textContent) - 1;
    const returnedPrice = productPriceNum*parseInt(productAmount.textContent)
    orderedPrice.textContent = `₩${returnedPrice.toLocaleString()}` //곱해서 총 주문가격 출력
  }
});
