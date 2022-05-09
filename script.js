const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const timerDisplay = document.querySelector(".display__time-left");
const button = document.querySelector(".btn");
let lastHole;
let timeUp = false;
let score = 0;
let countdown;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  //console.log(holes.length);
  if (hole === lastHole) {
    console.log("Ah ne izgleda da je opet ista rupa");
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);

  //console.log(time, hole);
}

function startGame(seconds) {
  clearInterval(countdown);
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (timeUp = true), 20000);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function bonk(e) {
  //console.log(e);
  if (!e.isTrusted) return; //cheater!
  score++;
  this.classList.remove("up");
  scoreBoard.textContent = score;
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;
  const display = `${minutes}:${remainSeconds < 10 ? "0" : ""}${remainSeconds}`;
  timerDisplay.textContent = display;
}

function sGame() {
  const seconds = parseInt(this.dataset.time);
  startGame(seconds);
}

moles.forEach((mole) => mole.addEventListener("click", bonk));
button.addEventListener("click", sGame);
