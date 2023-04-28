// 숫자에 쉼표를 추가함. (10000 -> 10,000)
export const addCommas = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
// 로그아웃시 동작
export const logout = (element) => {  
    element.addEventListener("click", ()=>{
    window.localStorage.removeItem("token");
    const baseUrl = window.location.origin;
    const mainUrl = baseUrl + "/main/main.html";
    window.location.href = mainUrl
    })
}