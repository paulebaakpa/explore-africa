/* ==========================================================================
   EXPLORE AFRICA — GLOBAL JAVASCRIPT & SCROLL REVEAL (main.js)
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

window.toggleMenu = toggleMenu;

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------------------
     1. AUTO-ACTIVE NAVIGATION LINK HIGHLIGHTING
     ------------------------------------------------------------------------ */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute('href');
    link.classList.remove('active');

    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ------------------------------------------------------------------------
     2. CLOSE MOBILE MENU ON OUTSIDE CLICK OR ESCAPE KEY
     ------------------------------------------------------------------------ */
  document.addEventListener('click', (event) => {
    const navLinksElement = document.getElementById('nav-links');
    const hamburgerElement = document.querySelector('.hamburger');

    if (navLinksElement && hamburgerElement) {
      const isClickInsideNav =
        navLinksElement.contains(event.target) || hamburgerElement.contains(event.target);
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

  /* ------------------------------------------------------------------------
     3. SMOOTH SCROLL-REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ------------------------------------------------------------------------ */
  const revealSelectors = [
    '.stat',
    '.layout-split',
    '.section-header',
    '.card',
    '.species-card',
    '.itinerary-card',
    '.info-card',
    '.feature',
    '.day-list',
    '.contact-section form'
  ].join(', ');

  const revealTargets = document.querySelectorAll(revealSelectors);

  // Add staggered transition delays for sibling cards inside grids
  const gridContainers = document.querySelectorAll(
    '.trip-stats, .experience-grid, .contact-info, .features'
  );

  gridContainers.forEach((container) => {
    const children = container.querySelectorAll(
      '.stat, .card, .info-card, .feature'
    );
    children.forEach((child, index) => {
      child.style.transitionDelay = `${index * 90}ms`;
    });
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');

            /* ------------------------------------------------------------------------
     4. CLICKABLE IMAGES LIGHTBOX VIEWER
     ------------------------------------------------------------------------ */
  const zoomableImages = document.querySelectorAll(
    '.card img, .img-wrapper img, .species-image'
  );

  if (zoomableImages.length > 0) {
    // Build reusable lightbox overlay once per page
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image preview');
    lightbox.innerHTML = `
      <button type="button" class="lightbox-close" aria-label="Close image preview">&times;</button>
      <img src="" alt="">
      <p class="lightbox-caption"></p>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    zoomableImages.forEach((img) => {
      // Skip images already wrapped inside a navigation link
      if (img.closest('a')) return;

      img.classList.add('clickable-photo');
      img.setAttribute('tabindex', '0');
      img.setAttribute('title', 'Click to enlarge photo');

      const openPhoto = () => {
        lightboxImg.src = img.currentSrc || img.src;
        lightboxImg.alt = img.alt || 'Explore Africa photo';
        lightboxCaption.textContent = img.alt || '';
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      };

      img.addEventListener('click', openPhoto);
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPhoto();
        }
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

            // Clear stagger delay after entrance so hover transitions stay snappy
            setTimeout(() => {
              entry.target.style.transitionDelay = '0ms';
            }, 850);

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealTargets.forEach((el) => {
      el.classList.add('reveal-item');
      revealObserver.observe(el);
    });
  }
});

/* ------------------------------------------------------------------------
     5. HAMBURGER HOVER & CLICK OPEN WITH AUTOMATIC MOUSE-LEAVE CLOSE
     ------------------------------------------------------------------------ */
  const hamburgerBtn = document.querySelector('.hamburger');
  const navMenu = document.getElementById('nav-links');

  if (hamburgerBtn && navMenu) {
    let hoverCloseTimer = null;
    let openedViaHoverAt = 0;

    const openNavMenu = () => {
      clearTimeout(hoverCloseTimer);
      navMenu.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    };

    const closeNavMenu = () => {
      clearTimeout(hoverCloseTimer);
      navMenu.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    };

    const scheduleCloseNavMenu = () => {
      clearTimeout(hoverCloseTimer);
      hoverCloseTimer = setTimeout(() => {
        closeNavMenu();
      }, 180);
    };

    // Keep global onclick="toggleMenu()" safe when user hovers then clicks
    window.toggleMenu = () => {
      const justHoveredOpen = Date.now() - openedViaHoverAt < 350;
      if (justHoveredOpen && navMenu.classList.contains('active')) {
        return; // Don't immediately close if mouseenter just opened it
      }

      if (navMenu.classList.contains('active')) {
        closeNavMenu();
      } else {
        openNavMenu();
      }
    };

    // 1. Open on hover and keep open while pointer is over button or dropdown
    hamburgerBtn.addEventListener('mouseenter', () => {
      if (!navMenu.classList.contains('active')) {
        openedViaHoverAt = Date.now();
      }
      openNavMenu();
    });

    navMenu.addEventListener('mouseenter', openNavMenu);

    // 2. Whether opened by hover OR click, auto-close once mouse leaves both
    hamburgerBtn.addEventListener('mouseleave', scheduleCloseNavMenu);
    navMenu.addEventListener('mouseleave', scheduleCloseNavMenu);

    // 3. Also auto-close if user starts scrolling down the page
    window.addEventListener(
      'scroll',
      () => {
        if (navMenu.classList.contains('active')) {
          closeNavMenu();
        }
      },
      { passive: true }
    );
  }