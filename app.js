const startBtn = document.querySelector(".start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector(".time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const COLORS = ["#66FF00", "#1974D2", "#08E8DE", "#FFF000", "#FFAA1D", "#FF007F"];
let score = 0;
let time = 0;

// EVENTS
startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  setTime(time);
  createCircle();
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    setTime(current);
  }
}

function setTime(value) {
  if (value >= 60) {
    value = `0${Math.floor(value / 60)} minutes`;
  } else if (value < 60) {
    value = `00:${value}`;
  } else if (value < 10) {
    value = `00:0${value}`;
  }
  timeEl.innerHTML = `${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
}

function createCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(15, 30);
  const { width, height } = board.getBoundingClientRect();
  const posY = getRandomNumber(width - size);
  const posX = getRandomNumber(height - size);
  const color = getRandomColor();

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${posY}px`;
  circle.style.left = `${posX}px`;
  circle.style.backgroundColor = `${color}`;
  circle.style.boxShadow = `0 0 5px ${color}`;

  board.append(circle);
}

function getRandomNumber(max = 100, min = 0) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * COLORS.length);
  return COLORS[index];
}

// WITH ONCE ERRORS
// function getRandomColor() {
//   const color = `#` + ((Math.random() * 0xffffff) << 0).toString(16);

//   if (board.style.backgroundColor != color) {
//     return `${color}`;
//   }

//   getRandomColor();
// }
