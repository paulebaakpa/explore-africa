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


/* ==========================================================================
   EXPLORE AFRICA — GLOBAL JAVASCRIPT (main.js)
   ========================================================================== */

/**
 * Toggles the mobile navigation drawer and updates ARIA expanded state.
 */
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  const hamburger = document.querySelector('.hamburger');
  
  if (navLinks && hamburger) {
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isOpen);
  }
}

// Make toggleMenu globally available for inline onclick handlers
window.toggleMenu = toggleMenu;

/**
 * Automatically highlights the active navbar link based on the current page URL.
 */
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute('href');
    
    // Remove active class from all links first
    link.classList.remove('active');

    // Match exact filename or root index
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Close mobile menu when clicking outside or pressing escape key
  document.addEventListener('click', (event) => {
    const navLinksElement = document.getElementById('nav-links');
    const hamburgerElement = document.querySelector('.hamburger');
    
    if (navLinksElement && hamburgerElement) {
      const isClickInsideNav = navLinksElement.contains(event.target) || hamburgerElement.contains(event.target);
      if (!isClickInsideNav && navLinksElement.classList.contains('active')) {
        navLinksElement.classList.remove('active');
        hamburgerElement.setAttribute('aria-expanded', 'false');
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const navLinksElement = document.getElementById('nav-links');
      const hamburgerElement = document.querySelector('.hamburger');
      if (navLinksElement && navLinksElement.classList.contains('active')) {
        navLinksElement.classList.remove('active');
        if (hamburgerElement) {
          hamburgerElement.setAttribute('aria-expanded', 'false');
        }
      }
    }
  });
});