// ===============================
// HAMBURGER MENU TOGGLE
// ===============================
function toggleMenu() {
  const nav = document.getElementById("nav-links");
  nav.classList.toggle("active");
}


// ===============================
// STICKY NAVBAR ON SCROLL
// ===============================
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 50);
});


// ===============================
// FADE-IN HERO TEXT ON LOAD
// ===============================
window.addEventListener("load", function () {
  const hero = document.querySelector(".hero");
  hero.classList.add("show");
});

function goToMenu() {
  window.location.href = ".html";
}

const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", reveal);

function reveal() {
  cards.forEach(card => {
    const windowHeight = window.innerHeight;
    const revealTop = card.getBoundingClientRect().top;
    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      card.classList.add("active");
    }
  });
}

function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('active');
}

