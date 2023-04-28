import { checkToken } from "./checkToken.js"
import { navbarRender } from "./navbarRender.js";
import { footerRander } from "./footerRender.js";
export * from "./useful.js";

// 모든 페이지에서 꼭 실행되어야 하는 함수들을 호출하는 함수
// 각 html 파일에 연결된 js 파일에서 이 함수만을 불러와서 사용
async function main() {
    const checkResult = await checkToken();
    const { loggedInUser } = checkResult;

    navbarRender( loggedInUser );
    footerRander();

    //로그아웃 기능
    const logoutBtn = document.getElementById("logout");
    logoutBtn.onclick = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        location.href = "/main/main.html";
    }

    return { loggedInUser }; 
}

export { main };