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
  "███╗   ███╗██╗   ██╗██╗  ██╗███████╗██╗          █████╗ ██████╗ ██╗███████╗    ██████╗ ██╗   ██╗ █████╗ ███╗   ██╗     ██████╗██████╗ ██╗   ██╗███████╗",
  "████╗ ████║╚██╗ ██╔╝██║ ██╔╝██╔════╝██║         ██╔══██╗██╔══██╗██║██╔════╝    ██╔══██╗██║   ██║██╔══██╗████╗  ██║    ██╔════╝██╔══██╗██║   ██║╚══███╔╝",
  "██╔████╔██║ ╚████╔╝ █████╔╝ █████╗  ██║         ███████║██████╔╝██║███████╗    ██████╔╝██║   ██║███████║██╔██╗ ██║    ██║     ██████╔╝██║   ██║  ███╔╝ ",
  "██║╚██╔╝██║  ╚██╔╝  ██╔═██╗ ██╔══╝  ██║         ██╔══██║██╔══██╗██║╚════██║    ██╔══██╗██║   ██║██╔══██║██║╚██╗██║    ██║     ██╔══██╗██║   ██║ ███╔╝  ",
  "██║ ╚═╝ ██║   ██║   ██║  ██╗███████╗███████╗    ██║  ██║██║  ██║██║███████║    ██████╔╝╚██████╔╝██║  ██║██║ ╚████║    ╚██████╗██║  ██║╚██████╔╝███████╗",
  "╚═╝     ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝     ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝",
  "                                                                                                                                                        "
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

// Function to generate random character
function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

// Function to generate random color
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

function update() {
  // Update ASCII art with random glitches
  const lines = artLines.map((line, i) => line.split('').map((ch, j) => {
    let progress = transitionProgress[i][j];

    // Update progress
    if (showArt) {
      progress += 0.05;
      if (progress > 1) progress = 1;
    } else {
      progress -= 0.05;
      if (progress < 0) progress = 0;
    }
    transitionProgress[i][j] = progress;

    // Glitching letters with color
    const keepRandomChance = 0.011;
    if (Math.random() < 1 - progress || (showArt && Math.random() < keepRandomChance)) {
      const char = randomChar();
      const color = showArt ? randomColor() : '#000';
      return `<span style="color:${color}">${char}</span>`;
    } else {
      return ch;
    }
  }).join(''));

  asciiEl.innerHTML = lines.join('<br>');

  // Optional background random letters (kept black)
  if (typeof bgEl !== 'undefined') {
    const bgCount = 1;
    let bgString = '';
    for (let i = 0; i < bgCount; i++) {
      bgString += randomChar();
    }
    bgEl.textContent = bgString;
    bgEl.style.color = '#000';
  }
}

setInterval(update, 50);
setInterval(() => { showArt = !showArt; }, 5000);

// Adjust font size
function updateFontSize() {
  const width = sectionEl.clientWidth;
  const height = sectionEl.clientHeight;

  // keep your original scale (height / 1)
  let fontSize = Math.min(width / 100, height / 1);

  // cap the font size so it won't zoom too much on small screens
  const maxFontSize = 20; // tweak this number to your liking
  if (fontSize > maxFontSize) fontSize = maxFontSize;

  asciiEl.style.fontSize = fontSize + 'px';
}
window.addEventListener('resize', updateFontSize);
updateFontSize();
