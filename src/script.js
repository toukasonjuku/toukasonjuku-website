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

  // ---- 横に流れるカード（JAF Mate型カルーセル） ----
  // 中央に1枚を大きく、左右に前後のカードを少し見せる。一定間隔で自動的に次へ進む。
  // マウスを乗せている間・キーボード操作中・画面外にあるとき・タブが裏にあるときは止まる。
  // 「視差効果を減らす」設定の人には自動で動かさない（停止ボタンから再生はできる）。WCAG 2.2.2
  const AUTOPLAY_MS = 5000;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-carousel]').forEach(root => {
    const track = root.querySelector('.carousel-track');
    const slides = [...track.children];
    if (slides.length < 2) return;

    root.classList.add('is-carousel');
    track.setAttribute('tabindex', '0');
    slides.forEach((s, i) => {
      s.setAttribute('role', 'group');
      s.setAttribute('aria-roledescription', 'slide');
      s.setAttribute('aria-label', `${i + 1} / ${slides.length}`);
    });

    // 操作部品（矢印・位置の点・停止ボタン）を組み立てる
    const ui = document.createElement('div');
    ui.className = 'carousel-ui';
    ui.innerHTML = `
      <button type="button" class="carousel-btn carousel-prev" aria-label="前のカード">&larr;</button>
      <div class="carousel-dots"></div>
      <button type="button" class="carousel-btn carousel-toggle" aria-label="自動切り替えを停止"><span class="carousel-toggle-icon" aria-hidden="true"></span></button>
      <button type="button" class="carousel-btn carousel-next" aria-label="次のカード">&rarr;</button>`;
    root.appendChild(ui);
    const dotsWrap = ui.querySelector('.carousel-dots');
    const dots = slides.map((_, i) => {
      const d = document.createElement('button');
      d.type = 'button';
      d.className = 'carousel-dot';
      d.setAttribute('aria-label', `${i + 1}枚目を表示`);
      d.addEventListener('click', () => { goTo(i); restart(); });
      dotsWrap.appendChild(d);
      return d;
    });
    const toggle = ui.querySelector('.carousel-toggle');

    let current = 0;
    const goTo = (i, smooth = true) => {
      current = (i + slides.length) % slides.length; // 最後の次は最初へ戻る
      const s = slides[current];
      track.scrollTo({
        left: s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2,
        behavior: smooth ? 'smooth' : 'instant',
      });
    };

    // スクロール位置から、中央に一番近いカードを「表示中」にする（スワイプにも追従）
    const markActive = () => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0, bestDist = Infinity;
      slides.forEach((s, i) => {
        const dist = Math.abs(s.offsetLeft + s.offsetWidth / 2 - center);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      current = best;
      slides.forEach((s, i) => {
        const on = i === best;
        s.classList.toggle('is-active', on);
      });
      dots.forEach((d, i) => d.setAttribute('aria-current', i === best ? 'true' : 'false'));
    };
    let raf = 0;
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(markActive);
    }, { passive: true });
    // 中央以外のカードを押したら、そのカードを中央へ
    slides.forEach((s, i) => s.addEventListener('click', () => {
      if (i !== current) { goTo(i); restart(); }
    }));

    ui.querySelector('.carousel-prev').addEventListener('click', () => { goTo(current - 1); restart(); });
    ui.querySelector('.carousel-next').addEventListener('click', () => { goTo(current + 1); restart(); });
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); restart(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); restart(); }
    });

    // ---- 自動切り替え ----
    let playing = !reduceMotion; // 利用者が停止ボタンで決めた状態
    let hovering = false, focused = false, visible = false;
    let timer = 0;
    const tick = () => {
      clearTimeout(timer);
      if (playing && !hovering && !focused && visible && !document.hidden) {
        timer = setTimeout(() => { goTo(current + 1); tick(); }, AUTOPLAY_MS);
      }
    };
    const restart = tick; // 手で動かしたら、そこから数え直す
    const renderToggle = () => {
      root.classList.toggle('is-paused', !playing);
      toggle.setAttribute('aria-label', playing ? '自動切り替えを停止' : '自動切り替えを再生');
    };
    toggle.addEventListener('click', () => { playing = !playing; renderToggle(); tick(); });
    root.addEventListener('mouseenter', () => { hovering = true; tick(); });
    root.addEventListener('mouseleave', () => { hovering = false; tick(); });
    root.addEventListener('focusin', () => { focused = true; tick(); });
    root.addEventListener('focusout', (e) => {
      if (!root.contains(e.relatedTarget)) { focused = false; tick(); }
    });
    track.addEventListener('pointerdown', restart, { passive: true });
    document.addEventListener('visibilitychange', tick);
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; tick(); }, { threshold: 0.4 })
      .observe(root);

    // 画像の読み込みや画面幅の変化で位置がずれないよう、表示中のカードを中央に置き直す
    window.addEventListener('resize', () => goTo(current, false));
    goTo(0, false);
    markActive();
    renderToggle();
  });
})();

