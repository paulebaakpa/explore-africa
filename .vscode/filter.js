/* ==========================================================================
   EXPLORE AFRICA — INTERACTIVE DESTINATION FILTERING (filter.js)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const destinationCards = document.querySelectorAll('.destination-card');
  const searchInput = document.getElementById('destination-search');
  const emptyState = document.getElementById('no-results-message');

  let activeCategory = 'all';
  let searchQuery = '';

  function filterDestinations() {
    let visibleCount = 0;

    destinationCards.forEach((card) => {
      const categories = (card.dataset.category || '').toLowerCase().split(' ');
      const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
      const description = (card.querySelector('p')?.textContent || '').toLowerCase();

      const matchesCategory =
        activeCategory === 'all' || categories.includes(activeCategory);
      const matchesSearch =
        title.includes(searchQuery) || description.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.classList.remove('is-hidden');
        // Trigger subtle fade-in animation
        card.style.animation = 'fadeInCard 0.35s ease forwards';
        visibleCount++;
      } else {
        card.classList.add('is-hidden');
        card.style.animation = '';
      }
    });

    // Toggle empty state message if zero cards match
    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  }

  // Handle Filter Pill Clicks
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Update active button state & ARIA accessibility
      filterButtons.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });

      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');

      activeCategory = button.dataset.filter.toLowerCase();
      filterDestinations();
    });
  });

  // Handle Live Search Input (if present on page)
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterDestinations();
    });
  }
});