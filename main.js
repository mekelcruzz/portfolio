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
