/* ─────────────────────────────────────────────
   MOKUTAN · main.js
   Scripts do index.html
   ───────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── NAV SCROLL ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('on', window.scrollY > 70);
  });

  /* ── MOBILE MENU ── */
  const hbg = document.getElementById('hbg');
  const mm  = document.getElementById('mm');

  hbg.addEventListener('click', () => mm.classList.toggle('open'));

  function closeMobileMenu() {
    mm.classList.remove('open');
  }

  mm.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* Fecha menu ao pressionar Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  /* ── REVEAL ON SCROLL ── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  document.querySelectorAll('.rv').forEach((el) => revealObserver.observe(el));

  /* ── TABS DO CARDÁPIO ── */
  window.tab = function (id, el) {
    document.querySelectorAll('.panel').forEach((p) => p.classList.remove('on'));
    document.querySelectorAll('.tab').forEach((t) => t.classList.remove('on'));
    document.getElementById('p-' + id).classList.add('on');
    el.classList.add('on');
  };

  /* ── GALERIA DRAG ── */
  const gt = document.getElementById('gt');
  if (gt) {
    let isDragging = false;
    let startX, scrollLeft;

    gt.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - gt.offsetLeft;
      scrollLeft = gt.scrollLeft;
      gt.style.cursor = 'grabbing';
    });

    gt.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - gt.offsetLeft;
      gt.scrollLeft = scrollLeft - (x - startX) * 1.2;
    });

    ['mouseup', 'mouseleave'].forEach((ev) => {
      gt.addEventListener(ev, () => {
        isDragging = false;
        gt.style.cursor = 'grab';
      });
    });

    /* Touch support */
    gt.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX - gt.offsetLeft;
      scrollLeft = gt.scrollLeft;
    }, { passive: true });

    gt.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX - gt.offsetLeft;
      gt.scrollLeft = scrollLeft - (x - startX) * 1.2;
    }, { passive: true });
  }

  /* ── FORMULÁRIO DE RESERVA ── */
  window.sendForm = function () {
    const fw  = document.getElementById('fw');
    const fok = document.getElementById('fok');
    if (fw && fok) {
      fw.style.display  = 'none';
      fok.style.display = 'block';
    }
  };

})();
