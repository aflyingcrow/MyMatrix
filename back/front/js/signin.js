// ### 토큰 검사

const token = localStorage.getItem("x-access-token");

if (token) {
    alert("로그아웃 후 이용해주세요.");
    location.href = "index.html";
}


const buttonSignin = document.getElementById("signin");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const signinForm = document.querySelector(".signin-form");   // 임의 추가

buttonSignin.addEventListener("click", signin);
signinForm.addEventListener("keypress", signin);   // 임의 추가

// 로그인 처리 함수
async function signin(event) {
    const currentEmail = inputEmail.value;
    const currentPassword = inputPassword.value;
    const eventType = event.type;   // 임의 추가
    const key = event.key;          // 임의 추가

    if (eventType !== "click" && key !== "Enter"){  // 임의 추가
        return false;                               // 임의 추가
    }                                               // 임의 추가

    if (!currentEmail || !currentPassword) {
        return false;
    }

    // 로그인 API 요청
    const config = {
        method: "post",
        url: url + "/sign-in",
        data: {
            email: currentEmail,
            password: currentPassword,
        },
    };

    try {
        const res = await axios(config);

        if (res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }

        localStorage.setItem("x-access-token", res.data.result.token);
        alert(res.data.message);
        location.href = "index.html";
        return true;

    } catch (err) {
        console.log(err);
    }
    
}
