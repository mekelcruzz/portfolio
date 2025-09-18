// Grab elements
const modal = document.getElementById("contactModal");
const btn = document.getElementById("contactBtn");
const span = document.querySelector(".close");
const burger = document.getElementById("burger");
const navMenu = document.getElementById("navMenu");
const closeNav = document.getElementById("closeNav");

// Show modal
btn.onclick = function (e) {
  e.preventDefault();
  modal.style.display = "block";
};

// Close modal with X
span.onclick = function () {
  modal.style.display = "none";
};

// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Toggle nav when burger is clicked
burger.addEventListener("click", () => {
  navMenu.classList.add("active");
});

// Close nav when close button is clicked
closeNav.addEventListener("click", () => {
  navMenu.classList.remove("active");
});

// Close nav when a link is clicked
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// Close nav when clicking outside
document.addEventListener("click", (e) => {
  if (
    navMenu.classList.contains("active") &&
    !navMenu.contains(e.target) &&
    !burger.contains(e.target)
  ) {
    navMenu.classList.remove("active");
  }
});


const artLines = [
  " /$$      /$$           /$$                 /$$        /$$$$$$            /$$                 /$$$$$$$         /$$$$$$                               ",
  "| $$$    /$$$          | $$                | $$       /$$__  $$          |__/                | $$__  $$       /$$__  $$                              ",
  "| $$$$  /$$$$ /$$   /$$| $$   /$$  /$$$$$$ | $$      | $$  \\ $$  /$$$$$$  /$$  /$$$$$$$      | $$  \\ $$      | $$  \\__/  /$$$$$$  /$$   /$$ /$$$$$$$$",
  "| $$ $$/$$ $$| $$  | $$| $$  /$$/ /$$__  $$| $$      | $$$$$$$$ /$$__  $$| $$ /$$_____/      | $$$$$$$       | $$       /$$__  $$| $$  | $$|____ /$$/",
  "| $$  $$$| $$| $$  | $$| $$$$$$/ | $$$$$$$$| $$      | $$__  $$| $$  \\__/| $$|  $$$$$$       | $$__  $$      | $$      | $$  \\__/| $$  | $$   /$$$$/ ",
  "| $$\\  $ | $$| $$  | $$| $$_  $$ | $$_____/| $$      | $$  | $$| $$      | $$ \\____  $$      | $$  \\ $$      | $$    $$| $$      | $$  | $$  /$$__/  ",
  "| $$ \\/  | $$|  $$$$$$$| $$ \\  $$|  $$$$$$$| $$      | $$  | $$| $$      | $$ /$$$$$$$/      | $$$$$$$/      |  $$$$$$/| $$      |  $$$$$$/ /$$$$$$$$",
  "|__/     |__/ \\____  $$|__/  \\__/ \\_______/|__/      |__/  |__/|__/      |__/|_______/       |_______/        \\______/ |__/       \\______/ |________/",
  "              /$$  | $$                                                                                                                              ",
  "             |  $$$$$$/                                                                                                                              ",
  "              \\______/                                                                                                                               "
];

const asciiEl = document.getElementById('asciiArt');
const sectionEl = document.getElementById('home');
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:",.<>/?~';

let transitionProgress = [];
let showArt = true;

// Initialize progress array
for (let i = 0; i < artLines.length; i++) {
  transitionProgress[i] = Array(artLines[i].length).fill(0);
}

function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

function update() {
  const lines = artLines.map((line, i) => line.split('').map((ch, j) => {
    let progress = transitionProgress[i][j];
    if (showArt) {
      progress += 0.05;
      if (progress > 1) progress = 1;
      transitionProgress[i][j] = progress;
      return Math.random() < 1 - progress ? randomChar() : ch;
    } else {
      progress -= 0.05;
      if (progress < 0) progress = 0;
      transitionProgress[i][j] = progress;
      return Math.random() < 1 - progress ? randomChar() : ch;
    }
  }).join(''));

  asciiEl.textContent = lines.join('\n');

  // Fill entire section with random letters
  const sectionLines = [];
  const sectionHeight = Math.floor(sectionEl.clientHeight / 14); // approx line height
  const sectionWidth = Math.floor(sectionEl.clientWidth / 8); // approx char width
  for (let i = 0; i < sectionHeight; i++) {
    let line = '';
    for (let j = 0; j < sectionWidth; j++) {
      line += randomChar();
    }
    sectionLines.push(line);
  }
}

setInterval(update, 50);
setInterval(() => { showArt = !showArt; }, 5000);
