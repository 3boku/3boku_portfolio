let target = document.querySelector("#dynamic");

function randomString() {
    let stringArr = [
        "Elice IS GOAT",
        "Web Project",
        "Seoul Robotics High School",
        "Do IT!",
        "Elice",
    ];
    let selectString = stringArr[Math.floor(Math.random() * stringArr.length)];
    let selectStringArr = selectString.split("");

    return selectStringArr;
}

//타이핑 리셋
function resetTyping() {
    target.textContent = "";
    dynamic(randomString());
}

//텍스트 한글자 씩 출력 함수
function dynamic(randomArr) {
    if (randomArr.length > 0) {
        target.textContent += randomArr.shift();
        setTimeout(function () {
            dynamic(randomArr);
        }, 80);
    } else {
        setTimeout(resetTyping, 3000);
    }
}

//randomString 옆에 소괄호 까먹지 말기(없으면 작동 안됨)
dynamic(randomString());
//커서 깜빡임 효과
function blink() {
    target.classList.toggle("active");
}
setInterval(blink, 500);

const getToken = () => {
    let cookieName = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
    return cookieName;
};

const updateLoginButton = (isLoggedIn) => {
    const navBtn = document.querySelector("#login-btn");
    const link = navBtn.querySelector("a");

    if (isLoggedIn) {
        link.href = "/auth/api/logout";
        link.textContent = "logout";
    } else {
        link.href = "/auth/login";
        link.textContent = "login";
    }
};

const getName = (token) => {
    const target = document.querySelector(".sm-text");

    if (!token) {
        target.textContent = "Do IT! WEB Project | anonymous";
        return;
    }
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const name = JSON.parse(
        decodeURIComponent(escape(window.atob(base64)))
    ).name;
    target.textContent = `Do IT! WEB Project | ${name ? name : "anonymous"}`;
};

window.onload = function () {
    const token = getToken();
    updateLoginButton(!!token);
    getName(token);
};

const link = document.querySelector("a");

// link.addEventListener("click", (event) => {
//     event.preventDefault(); // 기본 동작 중지

//     // 링크 가져오기
//     const href = link.getAttribute("href");

//     // 페이지 이동
//     window.location.href = href;
// });
