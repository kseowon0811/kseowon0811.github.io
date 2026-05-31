

const clock = document.querySelector("#clock");

function getClock() {
  const date = new Date();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock, 1000);
//실시간 시계

const loginForm = document.querySelector("#login-form");
const greeting = document.querySelector("#greeting");

const USERNAME_KEY = "username";

function onLogin(event) {
  event.preventDefault();

  const username = loginForm.querySelector("input").value;

  localStorage.setItem(USERNAME_KEY, username);

  paintGreeting(username);
}

function paintGreeting(username) {
  loginForm.hidden = true;
  greeting.innerText = `Hello ${username}!`;
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.addEventListener("submit", onLogin);
} else {
  paintGreeting(savedUsername);
}
//로컬 스토리지를 이용한 로그인

const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

let toDos = [];

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

function paintToDo(todo) {
  const li = document.createElement("li");
  li.innerText = todo.text;
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();

  const newTodo = {
    text: toDoInput.value,
    id: Date.now(),
  };

  toDos.push(newTodo);

  paintToDo(newTodo);
  saveToDos();

  toDoInput.value = "";
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem("todos");

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);

  toDos = parsedToDos;

  parsedToDos.forEach(paintToDo);
}
//투두 리스트





const images = [
  "KakaoTalk_20260531_150305272.jpg",
  "KakaoTalk_20260531_150305272_01.jpg",
  "KakaoTalk_20260531_150305272_02.jpg",
  "KakaoTalk_20260531_150305272_03.jpg"
];

function changeBackground() {
  const chosenImage =
    images[Math.floor(Math.random() * images.length)];

  document.body.style.backgroundImage =
    `url(${chosenImage})`;

  console.log("배경 변경:", chosenImage);
}

changeBackground();
setInterval(changeBackground, 5000);
//랜덤 배경 이미지




navigator.geolocation.getCurrentPosition(
  onGeoOk,
  onGeoError
);

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const API_KEY = "102806499ea549ad6fdf4c3a3a18ceff";

  const url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(response => response.json())
.then(data => {
  const temp = document.querySelector("#weather-temp");
  const city = document.querySelector("#weather-city");
  const icon = document.querySelector("#weather-icon");

  const weatherMain = data.weather[0].main;

  if (weatherMain === "Clouds") {
    icon.innerText = "☁️";
  } else if (weatherMain === "Rain") {
    icon.innerText = "🌧️";
  } else if (weatherMain === "Clear") {
    icon.innerText = "☀️";
  } else if (weatherMain === "Snow") {
    icon.innerText = "❄️";
  } else if (weatherMain === "Thunderstorm") {
    icon.innerText = "⛈️";
  } else if (weatherMain === "Drizzle") {
    icon.innerText = "🌦️";
  } else {
    icon.innerText = "🌤️";
  }

  temp.innerText = `${Math.round(data.main.temp)}°`;
  city.innerText = data.name;
});
}
function onGeoError() {
  alert("위치를 찾을 수 없습니다.");
}
//위치 및 날씨

