function footerRander() {
    const footer = document.querySelector("footer");
 
    footer.innerHTML = `
    <footer class="footer">
        <div class="footer-container">
            <p>2023 Team 부글부글 - 김문진 / 김승환 / 김예은 / 이수영 / 이종욱 / 임준영</p>
            <p>Copyright ⓒ 2023 - 부글부글. All rights reserved</p>
        </div>
    </footer>`;
  }
  
  export { footerRander };
  