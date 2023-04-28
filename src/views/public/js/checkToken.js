// 백엔드의 checkToken api를 통해 토큰 확인

// function checkToken() { //토큰체크 api 작성 완료 안됨
//     if(document.cookie.includes("jwt_token")){
//         const checkResult = fetch("http://localhost:4000/auth/checkToken")
//             .then(res => res.json())
//             .then(result => {
//                 const loggedInUser = result;
//                 return {loggedInUser}
//             })
//             .catch((e)=>{
//                 alert(e);
//             });
        
//         return checkResult;
//     }
// }

// setItem("token", JSON.stringify(받아온토큰))

function checkToken() {
    if(window.localStorage.getItem("token")){
        const loggedInUser = JSON.parse(window.localStorage.getItem("token"));
        return {loggedInUser}
    } else {
        return false;
    }
}

export { checkToken } ;
