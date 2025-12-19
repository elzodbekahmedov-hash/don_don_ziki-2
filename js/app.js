import {
  elHands,
  elUser,
  elRobot,
  elRefreshGameButton,
  elModeChangerButton,
  elGameZone,
  elResultZone,
  elAdvenced,
  elBasic,
  elScore
} from "./html-elements.js";

/* ================= LOCAL STORAGE ================= */

// score
let score = Number(localStorage.getItem("score")) || 0;
elScore.innerText = score;

// mode
let activeMode = localStorage.getItem("mode") || "basic";

/* ================= ROBOT CHOOSE ================= */

function robotChoose() {
  const hands = ["rock", "paper", "scissors"];
  const randomIndex = Math.trunc(Math.random() * hands.length);
  return hands[randomIndex];
}

/* ================= MODE CHANGER ================= */

function applyMode() {
  if (activeMode === "advenced") {
    elAdvenced.style.display = "none";
    elBasic.style.display = "grid";
    elModeChangerButton.innerText = "Basic";
  } else {
    elAdvenced.style.display = "grid";
    elBasic.style.display = "none";
    elModeChangerButton.innerText = "Advenced";
  }
}

function modeChanger() {
  activeMode = activeMode === "basic" ? "advenced" : "basic";
  localStorage.setItem("mode", activeMode);
  applyMode();
}

/* ================= ZONE CHANGER ================= */

function swapZone(isResult) {
  if (isResult) {
    elGameZone.style.display = "none";
    elResultZone.style.display = "flex";
  } else {
    elGameZone.style.display = "flex";
    elResultZone.style.display = "none";
  }
}

/* ================= CHECK WINNER ================= */

function checkWinner(user, robot) {
  const rules = {
    rock: {
      rock: "TIE",
      paper: "LOSE",
      scissors: "WIN"
    },
    paper: {
      paper: "TIE",
      rock: "WIN",
      scissors: "LOSE"
    },
    scissors: {
      scissors: "TIE",
      paper: "WIN",
      rock: "LOSE"
    }
  };

  return rules[user][robot];
}

/* ================= SCORE ================= */

function increaseScore() {
  score++;
  elScore.innerText = score;
  localStorage.setItem("score", score);
}

/* ================= HANDS CLICK ================= */

elHands.forEach((hand) => {
  hand.addEventListener("click", (e) => {
    swapZone(true);

    const user = e.target.alt;
    const robot = robotChoose();

    elUser.src = e.target.src;
    elRobot.src = "./img/choosing.svg";

    setTimeout(() => {
      elRobot.src = `./img/${robot}.svg`;

      const result = checkWinner(user, robot);
      if (result === "WIN") increaseScore();
    }, 1000);
  });
});

/* ================= BUTTONS ================= */

elRefreshGameButton.addEventListener("click", () => {
  swapZone(false);
});

elModeChangerButton.addEventListener("click", modeChanger);

/* ================= INIT ================= */

applyMode();
