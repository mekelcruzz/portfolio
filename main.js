// Grab elements
const modal = document.getElementById("contactModal");
const btn = document.getElementById("contactBtn");
const burger = document.getElementById("burger");
const navMenu = document.getElementById("navMenu");
const closeNav = document.getElementById("closeNav");
const span = modal.querySelector(".close");

// Show modal
btn.onclick = function (e) {
  e.preventDefault();
  modal.style.display = "block"; // make sure it's visible again
  requestAnimationFrame(() => {
    modal.classList.add("show");
    modal.classList.remove("hide");
  });
};

// Close modal with X
span.onclick = function () {
  modal.classList.remove("show");
  modal.classList.add("hide");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
};

// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target === modal) {
    modal.classList.remove("show");
    modal.classList.add("hide");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
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

      // ⬇️ wider random letters here
      return `<span style="color:${color}; display:inline-block; width:1.2ch; text-align:center;">${char}</span>`;
    } else {
      return `<span style="font-size:.9em">${ch}</span>`;
    }
  }).join(''));

  asciiEl.innerHTML = lines.join('<br>');
}


setInterval(update, 50);
setInterval(() => { showArt = !showArt; }, 5000);

function updateFontSize() {
  const asciiEl = document.getElementById("asciiArt");
  const sectionEl = asciiEl.parentElement;

  const width = sectionEl.clientWidth;

  // start with a decent size
  let fontSize = width / 101;
  asciiEl.style.fontSize = fontSize + "px";

  // shrink until ASCII fits inside container
  while (asciiEl.scrollWidth > sectionEl.clientWidth && fontSize > 6) {
    fontSize -= 1;
    asciiEl.style.fontSize = fontSize + "px";
  }
}

window.addEventListener("resize", updateFontSize);
window.addEventListener("load", updateFontSize);


const navLinks = document.querySelectorAll("#navMenu a");
const logo = document.getElementById("logo");

// 🔹 Neon glitch for nav links
function glitchNav(el) {
  const randX = Math.floor(Math.random() * 6 - 3);
  const randY = Math.floor(Math.random() * 6 - 3);
  const colors = ["#0ff", "#f0f", "#ff0"];
  const c1 = colors[Math.floor(Math.random() * colors.length)];
  const c2 = colors[Math.floor(Math.random() * colors.length)];

  el.style.transform = `translate(${randX}px, ${randY}px)`;
  el.style.textShadow = `
    ${randX}px ${-randY}px ${c1},
    ${-randX}px ${randY}px ${c2}
  `;

  setTimeout(() => {
    el.style.transform = "translate(0,0)";
    el.style.textShadow = "none";
  }, 120);
}

// 🔹 Glitch for logo (grayscale/white, more subtle)
function glitchLogo(el) {
  const randX = Math.floor(Math.random() * 6 - 3);
  const randY = Math.floor(Math.random() * 6 - 3);
  const colors = [
    "rgba(100,100,100,1)",
    "rgba(194,194,194,1)",
    "rgba(255,255,255,1)"
  ];
  const c1 = colors[Math.floor(Math.random() * colors.length)];
  const c2 = colors[Math.floor(Math.random() * colors.length)];

  el.style.transform = `translate(${randX}px, ${randY}px)`;
  el.style.textShadow = `
    ${randX}px ${-randY}px ${c1},
    ${-randX}px ${randY}px ${c2}
  `;

  setTimeout(() => {
    el.style.transform = "translate(0,0)";
    el.style.textShadow = "none";
  }, 120);
}

// 🔹 Hover glitch (desktop only) for nav links
navLinks.forEach(link => {
  link.addEventListener("mouseenter", () => {
    if (window.innerWidth > 768) {
      link.glitchInterval = setInterval(() => glitchNav(link), 150);
    }
  });

  link.addEventListener("mouseleave", () => {
    clearInterval(link.glitchInterval);
    link.style.transform = "translate(0,0)";
    link.style.textShadow = "none";
  });
});

// 🔹 Auto glitch in mobile view (nav links)
function autoGlitchMobile() {
  if (window.innerWidth <= 768) {
    navLinks.forEach(link => {
      if (!link.autoGlitchInterval) {
        link.autoGlitchInterval = setInterval(
          () => glitchNav(link),
          400 + Math.random() * 600
        );
      }
    });
  } else {
    navLinks.forEach(link => {
      clearInterval(link.autoGlitchInterval);
      link.autoGlitchInterval = null;
      link.style.transform = "translate(0,0)";
      link.style.textShadow = "none";
    });
  }
}
autoGlitchMobile();
window.addEventListener("resize", autoGlitchMobile);

// 🔹 Scroll-to-top behavior for logo
logo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 🔹 Auto glitch for logo (always running)
setInterval(() => glitchLogo(logo), 200 + Math.random() * 300);

