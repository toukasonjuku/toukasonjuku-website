/* =========================================================
   桃下村塾  ／  TOUKA SONJUKU
   ========================================================= */

(() => {
  // ---- Header scroll state ----
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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
    window.scrollTo(0, savedScrollY);
  };

  const openMenu = () => {
    burger.classList.add('open');
    navMobile.classList.add('open');
    lockScroll();
  };
  const closeMenu = () => {
    burger.classList.remove('open');
    navMobile.classList.remove('open');
    unlockScroll();
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

