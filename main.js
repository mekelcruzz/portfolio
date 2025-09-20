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

// === ASCII art effect ===
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

function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

function update() {
  const lines = artLines.map((line, i) => line.split('').map((ch, j) => {
    let progress = transitionProgress[i][j];
    if (showArt) {
      progress += 0.05;
      if (progress > 1) progress = 1;
    } else {
      progress -= 0.05;
      if (progress < 0) progress = 0;
    }
    transitionProgress[i][j] = progress;
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
}

setInterval(update, 50);
setInterval(() => { showArt = !showArt; }, 5000);

function updateFontSize() {
  const width = sectionEl.clientWidth;
  const height = sectionEl.clientHeight;
  const fontSize = Math.min(width / 100, height / 1);
  asciiEl.style.fontSize = fontSize + 'px';
}
window.addEventListener('resize', updateFontSize);
updateFontSize();

// === Section animation in/out ===
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");   // animate in
        entry.target.classList.remove("hidden"); // remove hidden
      } else {
        entry.target.classList.remove("visible"); // animate out
        entry.target.classList.add("hidden");     // add hidden
      }
    });
  },
  { threshold: 0.2, rootMargin: "0px 0px -50% 0px" }
);

sections.forEach((section) => observer.observe(section));
