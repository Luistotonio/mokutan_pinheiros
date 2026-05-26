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

  /* ── MODAL DE RESERVA ── */
  const RSV_URL     = 'https://reservation.getin.app/865NDakj';
  const rsvModal    = document.getElementById('rsv-modal');
  const rsvFrame    = document.getElementById('rsv-frame');
  const rsvCloseBtn = document.getElementById('rsv-close');

  function openRsv() {
    rsvFrame.src = RSV_URL;
    rsvModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    rsvCloseBtn.focus();
  }
  function closeRsv() {
    rsvModal.classList.remove('open');
    rsvFrame.src = '';
    document.body.style.overflow = '';
  }

  if (rsvModal) {
    document.querySelectorAll('a[href="' + RSV_URL + '"]').forEach(link => {
      link.addEventListener('click', e => { e.preventDefault(); openRsv(); });
    });
    rsvCloseBtn.addEventListener('click', closeRsv);
    rsvModal.addEventListener('click', e => { if (e.target === rsvModal) closeRsv(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && rsvModal.classList.contains('open')) closeRsv(); });
  }

})();
