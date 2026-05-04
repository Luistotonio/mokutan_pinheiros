/* ─────────────────────────────────────────────
   MOKUTAN · cardapio.js
   Scripts da página cardapio.html
   ───────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── HIGHLIGHT DO LINK ATIVO NA NAV DO CARDÁPIO ── */
  const navLinks = document.querySelectorAll('.page-nav a');
  const sections = document.querySelectorAll('.menu-section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === '#' + id
            );
          });
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach((section) => observer.observe(section));

})();
