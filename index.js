const nightModeBtn = document.getElementById("mode-toggle-button");
const body = document.getElementsByTagName("body")[0];
const loginForm = document.getElementsByTagName("form")[0];
const loginButton = document.querySelector(".form-button");
const loginFormLogo = document.querySelector(".login-form-logo");
const usernameField = document.querySelector("#username");
const passwordField = document.querySelector("#password");
const params = new URLSearchParams(window.location.search);
const container = document.querySelector(".container");
const message = document.querySelector(".message");

function loginSuccessfulPlay() {
  var audio = new Audio("assets/ding.mp3");
  audio.play();
}

function loginFailedPlay() {
  var audio = new Audio("assets/oops.mp3");
  audio.play();
}

nightModeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (nightModeBtn.innerText === "Night") {
    nightModeBtn.innerText = "Daylight";
  } else if (nightModeBtn.innerText === "Daylight") {
    nightModeBtn.innerText = "Night";
  }
});

function loginSuccessful() {
  loginButton.classList.add("logging-in");
  loginButton.setAttribute("value", "Logging...");

  setTimeout(() => {
    message.classList.add("show");
    message.classList.add("success-text");
    message.innerHTML = "Login Successful";
    loginFormLogo.src = "assets/circle-check-regular.svg";
    loginFormLogo.classList.add("enlarge");
    loginButton.classList.remove("logging-in");
    loginButton.setAttribute("value", "Login");
    loginSuccessfulPlay();
    party.confetti(loginForm, {
      count: party.variation.range(60, 80),
    });
  }, 2000);

  setTimeout(() => {
    loginFormLogo.src = "assets/circle-user-regular.svg";
    loginFormLogo.classList.remove("enlarge");
    message.classList.remove("show");
    message.classList.remove("success-text");
    message.innerHTML = "";
    passwordField.value = "";
  }, 8000);
}

function loginFailed() {
  loginButton.classList.add("logging-in");
  loginButton.setAttribute("value", "Logging...");

  setTimeout(() => {
    loginFormLogo.src = "assets/circle-xmark-regular.svg";
    loginFormLogo.classList.add("shake");
    message.classList.add("show");
    message.classList.add("error-text");
    message.innerHTML = "Login Failed";
    loginButton.classList.remove("logging-in");
    loginButton.setAttribute("value", "Login");
    loginFailedPlay();
  }, 2000);

  setTimeout(() => {
    loginFormLogo.src = "assets/circle-user-regular.svg";
    loginFormLogo.classList.remove("shake");
    message.classList.remove("show");
    message.classList.remove("error-text");
    message.innerHTML = "";
    passwordField.value = "";
  }, 8000);
}

// username is got from the query string
// password is always <username>123
function verify() {
  const CORRECT_USERNAME = params.get("u");
  const CORRECT_PASSWORD = CORRECT_USERNAME + "123";
  let username, password;
  username = usernameField.value;
  password = passwordField.value;
  console.log({ username, password });
  if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
    return true;
  }
  return false;
}

function handleNoUsernameParameter() {
  const MESSAGE = "Sorry Wrong URL 😢";
  if (!params.has("u") || params.get("u") === "") {
    body.removeChild(container);
    body.style.backgroundImage = "none";
    const node = document.createElement("h1");
    const h1 = body.appendChild(node);
    h1.classList.add("error-text");
    h1.classList.add("container-text");
    h1.innerHTML = MESSAGE;
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  handleNoUsernameParameter();
  if (body.classList.contains("dark")) {
    nightModeBtn.innerText = "Daylight";
  } else if (!body.classList.contains("dark")) {
    nightModeBtn.innerText = "Night";
  }
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (verify()) {
    loginSuccessful();
  } else {
    loginFailed();
  }
});
