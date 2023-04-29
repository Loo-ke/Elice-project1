function footerRander() {
    const footer = document.querySelector("footer");
 
    footer.innerHTML = `
    <div class="footer">
        <div class="footer-container">
            <p>2023 Team 삼고초려 - 김문진 / 김승환 / 김예은 / 이수영 / 이종욱 / 임준영</p>
            <p>Copyright ⓒ 2023 - 삼고초려. All rights reserved</p>
        </div>
    </div>`;
  }
  
  export { footerRander };
  