// Grab elements
const modal = document.getElementById("contactModal");
const btn = document.getElementById("contactBtn");
const span = document.querySelector(".close");

// Show modal when Contact is clicked
btn.onclick = function(e) {
  e.preventDefault();
  modal.style.display = "block";
}

// Close when X is clicked
span.onclick = function() {
  modal.style.display = "none";
}

// Close when clicking outside the modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
