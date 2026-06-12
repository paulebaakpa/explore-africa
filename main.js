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

window.addEventListener("scroll", () => {

  const scrollTop = document.documentElement.scrollTop;

  const scrollHeight =
  document.documentElement.scrollHeight -
  document.documentElement.clientHeight;

  const progress =
  (scrollTop / scrollHeight) * 100;

  document.getElementById("progressBar")
          .style.width = progress + "%";
});

const reveals = document.querySelectorAll(
'.featured-card,.stat-card'
);

window.addEventListener('scroll',()=>{

 reveals.forEach(card=>{

   const top = card.getBoundingClientRect().top;

   if(top < window.innerHeight - 100){
      card.classList.add('active');
   }

 });

});

window.addEventListener("scroll",()=>{

 const winScroll =
 document.documentElement.scrollTop;

 const height =
 document.documentElement.scrollHeight -
 document.documentElement.clientHeight;

 const scrolled =
 (winScroll / height) * 100;

 document.getElementById(
 "scrollProgress"
 ).style.width = scrolled + "%";

});