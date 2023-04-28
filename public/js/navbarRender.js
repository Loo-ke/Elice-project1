function navbarRender(loggedInUser) {
    let navbar;
  
    if (loggedInUser && loggedInUser.isAdmin === true) {
      // 관리자 navbar 어차피 어드민 페이지로 바로 이동해서 사용안할듯?, 혹시 모르니 작성
      navbar = `
      <div class="navbar-container">
      <nav class="navbar">
          <div class="navbar-logo-container">
              <a href="/src/views/main/main.html"><img src="/public/img/WMlogo.png" alt="nav-logo" class="navbar-logo"></a>
          </div>
          <ul class="navbar-nav">
              <li class="navbar-content">
                  <img src="/public/img/WMlogout.png" alt="logout-icon" class="navbar-icon">
                  <p class="navbar-text" id="logout">로그아웃</p>
              </li>
              <li class="navbar-content">
                  <img src="/public/img/WMcart.png" alt="cart-icon" class="navbar-icon">
                  <a href="/src/views/cart" class="navbar-text">장바구니</a>
              </li>
              <li class="navbar-content">
                  <img src="/public/img/WMpepole.png" alt="mypage-icon" class="navbar-icon">
                  <a href="/src/views/admin/admin.html" class="navbar-text">관리자페이지</a>
              </li>
          </ul>
      </nav>
    </div>
          `
            ;
    } else if (loggedInUser) {
      // 일반 유저 navbar
      navbar = `
      <div class="navbar-container">
      <nav class="navbar">
          <div class="navbar-logo-container">
              <a href="/"><img src="/public/img/WMlogo.png" alt="nav-logo" class="navbar-logo"></a>
          </div>
          <ul class="navbar-nav">
              <li class="navbar-content">
                  <img src="/public/img/WMlogout.png" alt="logout-icon" class="navbar-icon">
                  <p class="navbar-text" id="logout">로그아웃</p>
              </li>
              <li class="navbar-content">
                  <img src="/public/img/WMcart.png" alt="cart-icon" class="navbar-icon">
                  <a href="/src/views/cart" class="navbar-text">장바구니</a>
              </li>
              <li class="navbar-content">
                  <img src="/public/img/WMpepole.png" alt="mypage-icon" class="navbar-icon">
                  <a href="/src/views/userinfo/userinfo.html" class="navbar-text">내 정보</a>
              </li>
          </ul>
      </nav>
    </div>
          `
          ;
    } else {
      // 로그인하지 않은 유저의 navbar
      navbar = `
      <div class="navbar-container">
      <nav class="navbar">
          <div class="navbar-logo-container">
              <a href="/src/views/main/main.html"><img src="/public/img/WMlogo.png" alt="nav-logo" class="navbar-logo"></a>
          </div>
          <ul class="navbar-nav">
              <li class="navbar-content">
                  <img src="/public/img/WMlogin.png" alt="login-icon" class="navbar-icon">
                  <a href="/src/views/logIn/login.html" class="navbar-text">로그인</a>
              </li>
              <li class="navbar-content">
                  <img src="/public/img/WMcart.png" alt="cart-icon" class="navbar-icon">
                  <a href="/src/views/cart" class="navbar-text">장바구니</a>
              </li>
          </ul>
      </nav>
    </div>
           `;
    }
  
    // navbar를 body에 렌더
    document.body.innerHTML = navbar + document.body.innerHTML;
  }


  export { navbarRender };
  