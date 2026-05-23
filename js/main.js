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

  hbg.addEventListener('click', () => {
    const isOpen = mm.classList.toggle('open');
    hbg.setAttribute('aria-expanded', isOpen);
  });

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

  /* ── CONCEITO — PILL INTERACTION ── */
  const conceitoPills = {
    default: {
      img: 'img/DSC00500.JPG',
      alt: 'Salão do Mokutan',
      heading: 'O Carvão',
      headingI: 'que define tudo',
      body1: 'No Japão, o fogo sempre foi mais do que técnica. É tempo, atenção e respeito ao ingrediente. No Mokutan, o carvão vegetal é o coração da cozinha.',
      body2: 'Entre a delicadeza dos preparos crus e a intensidade da grelha, nossa cozinha busca equilíbrio: simplicidade, precisão e produto.'
    },
    brasa: {
      img: 'img/grelha.jpg',          /* → adicione a foto da grelha com carvão */
      alt: 'Grelha na brasa — Mokutan',
      heading: 'Fogo',
      headingI: 'a alma da cozinha',
      body1: 'A grelha é o centro de tudo. Cada proteína é tratada com precisão — o calor exato, o tempo certo, a distância que define textura e sabor.',
      body2: 'Nenhum tempero substitui o fogo bem conduzido. O carvão faz o trabalho quando quem grelha sabe ouvir o ingrediente.'
    },
    cozinha: {
      img: 'img/cozinha.jpg',         /* → adicione a foto da cozinha aberta */
      alt: 'Cozinha aberta — Mokutan',
      heading: 'Cozinha',
      headingI: 'aberta e precisa',
      body1: 'A cozinha do Mokutan não tem paredes. Cada movimento é visível — o corte, o preparo, o emplatamento. Transparência como filosofia.',
      body2: 'Cozinha aberta não é performance. É compromisso com o produto e com quem come.'
    },
    bar: {
      img: 'img/bar.jpg',             /* → adicione a foto do bar ou das bebidas */
      alt: 'Bar — Mokutan',
      heading: 'O Bar',
      headingI: 'drinques com assinatura',
      body1: 'A carta de bebidas acompanha a cozinha: ingredientes japoneses, técnica brasileira. Cada drinque tem nome e história próprios.',
      body2: 'Do Umeshu ao whisky japonês — a seleção de sakes e destilados foi pensada para dialogar com cada prato.'
    },
    frutos: {
      img: 'img/frutos.jpg',          /* → adicione foto de peixe/frutos do mar (ex: atum branco) */
      alt: 'Frutos do Mar — Mokutan',
      heading: 'Do Mar',
      headingI: 'peixe e frescor',
      body1: 'Frutos do mar que chegam para revelar textura e sabor em sua forma mais pura — do atum branco ao polvo na brasa.',
      body2: 'O menu varia conforme a estação e o mercado. Frescor não espera cardápio fixo.'
    }
  };

  window.setPill = function (id, el) {
    const data = conceitoPills[id];
    if (!data) return;

    const wasActive = el.classList.contains('active');

    /* toggle: clicar no ativo volta ao padrão */
    document.querySelectorAll('.pill').forEach((p) => p.classList.remove('active'));
    const target = wasActive ? conceitoPills.default : data;
    if (!wasActive) el.classList.add('active');

    /* fade imagem */
    const img = document.getElementById('c-img-src');
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = target.img;
      img.alt = target.alt;
      img.style.opacity = '1';
    }, 220);

    /* fade texto */
    const swap = document.getElementById('c-swap');
    swap.classList.add('fading');
    setTimeout(() => {
      document.getElementById('c-heading').textContent   = target.heading;
      document.getElementById('c-heading-i').textContent = target.headingI;
      document.getElementById('c-body1').textContent     = target.body1;
      document.getElementById('c-body2').textContent     = target.body2;
      swap.classList.remove('fading');
    }, 220);
  };

  /* ── TABS DO CARDÁPIO ── */
  function moveTabInd(el) {
    const ind = document.getElementById('tab-ind');
    if (!ind) return;
    /* offsetLeft é relativo ao container scrollável — indicator acompanha corretamente */
    ind.style.left  = el.offsetLeft + 'px';
    ind.style.width = el.offsetWidth + 'px';
  }

  window.tab = function (id, el) {
    document.querySelectorAll('.panel').forEach((p) => p.classList.remove('on'));
    document.querySelectorAll('.tab').forEach((t) => t.classList.remove('on'));
    document.getElementById('p-' + id).classList.add('on');
    el.classList.add('on');
    moveTabInd(el);
    /* garante que a tab clicada fica visível no container scrollável */
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  };

  /* posiciona indicador na tab ativa ao carregar */
  const firstTab = document.querySelector('.tab.on');
  if (firstTab) moveTabInd(firstTab);

  /* reposiciona ao redimensionar janela */
  window.addEventListener('resize', () => {
    const activeTab = document.querySelector('.tab.on');
    if (activeTab) moveTabInd(activeTab);
  }, { passive: true });

  /* ── GALERIA DRAG + BOTÕES ── */
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

    gt.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX - gt.offsetLeft;
      scrollLeft = gt.scrollLeft;
    }, { passive: true });

    gt.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX - gt.offsetLeft;
      gt.scrollLeft = scrollLeft - (x - startX) * 1.2;
    }, { passive: true });

    const scrollAmt = 420;
    document.getElementById('gprev')?.addEventListener('click', () => {
      gt.scrollBy({ left: -scrollAmt, behavior: 'smooth' });
    });
    document.getElementById('gnext')?.addEventListener('click', () => {
      gt.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    });
  }

  /* ── MBAR HIDE ON SCROLL DOWN ── */
  const mbar = document.getElementById('mbar');
  if (mbar) {
    let lastY = 0;
    window.addEventListener('scroll', () => {
      const curr = window.scrollY;
      if (curr > lastY && curr > 160) {
        mbar.classList.add('hidden');
      } else {
        mbar.classList.remove('hidden');
      }
      lastY = curr <= 0 ? 0 : curr;
    }, { passive: true });
  }

})();
