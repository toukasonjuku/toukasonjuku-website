/* =========================================================
   桃下村塾  ／  TOUKA SONJUKU
   ========================================================= */

(() => {
  // ---- Header scroll state ----
  // 最上部付近では常に表示、下スクロールで隠し、上スクロールで再表示する
  const header = document.getElementById('siteHeader');
  let lastScrollY = window.scrollY;
  let menuOpen = false;
  const onScroll = () => {
    const y = window.scrollY;
    if (y > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    if (menuOpen) return;
    if (y <= 120) header.classList.remove('is-hidden');
    else if (y > lastScrollY + 4) header.classList.add('is-hidden');
    else if (y < lastScrollY - 4) header.classList.remove('is-hidden');
    lastScrollY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- ページ先頭へ戻るボタン（1画面分スクロールしたら表示） ----
  const toTop = document.getElementById('toTop');
  if (toTop) {
    const onScrollTop = () => toTop.classList.toggle('is-shown', window.scrollY > window.innerHeight * .8);
    window.addEventListener('scroll', onScrollTop, { passive: true });
    onScrollTop();
    toTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Current page in nav ----
  // ハッシュなしのリンクだけを対象に、今いるページの項目へ .is-current を付ける
  const here = location.pathname.replace(/index\.html$/, '');
  document.querySelectorAll('.nav-desktop a').forEach(a => {
    const url = new URL(a.href, location.href);
    if (!url.hash && url.pathname === here && here !== '/') {
      a.classList.add('is-current');
      a.setAttribute('aria-current', 'page');
    }
  });

  // ---- Hamburger toggle (mobile-safe scroll lock) ----
  const burger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');
  let savedScrollY = 0;

  const lockScroll = () => {
    savedScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  };
  const unlockScroll = () => {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    // html{scroll-behavior:smooth} の影響でアニメーションしないよう instant で戻す
    window.scrollTo({ top: savedScrollY, behavior: 'instant' });
    lastScrollY = window.scrollY;
  };

  const openMenu = () => {
    burger.classList.add('open');
    navMobile.classList.add('open');
    menuOpen = true;
    header.classList.remove('is-hidden');
    lockScroll();
  };
  const closeMenu = () => {
    burger.classList.remove('open');
    navMobile.classList.remove('open');
    unlockScroll();
    menuOpen = false;
  };

  burger.addEventListener('click', () => {
    if (navMobile.classList.contains('open')) closeMenu();
    else openMenu();
  });

  // close the menu when a nav link is tapped (runs before smooth-scroll handler)
  navMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navMobile.classList.contains('open')) closeMenu();
    });
  });

  // ---- Reveal on scroll ----
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  reveals.forEach(el => io.observe(el));

  // ---- Smooth scroll offset (header height) ----
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = header.offsetHeight - 4;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

