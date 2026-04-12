(function () {
  const root = document.documentElement;
  const key = 'lab-theme';
  const toggle = document.getElementById('theme-switch');

  function applyTheme(theme) {
    const t = theme === 'light' ? 'light' : 'dark';
    root.dataset.theme = t;
    if (toggle) toggle.checked = t === 'light';
    try {
      localStorage.setItem(key, t);
    } catch (_) {}
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('theme') === 'light' || params.get('theme') === 'dark') {
    applyTheme(params.get('theme'));
  } else {
    try {
      const stored = localStorage.getItem(key);
      if (stored === 'light' || stored === 'dark') applyTheme(stored);
      else applyTheme('dark');
    } catch (_) {
      applyTheme('dark');
    }
  }

  toggle?.addEventListener('change', function () {
    applyTheme(toggle.checked ? 'light' : 'dark');
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) e.target.classList.add('is-visible');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
      io.observe(el);
    });

    document.querySelectorAll('.story-log.reveal-on-scroll').forEach(function (log) {
      io.observe(log);
    });
  } else {
    document.querySelectorAll('.reveal-on-scroll, .story-log, .log-line').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* Nav buttons: switching-systems ripple */
  document.querySelectorAll('.nav-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.classList.add('is-press');
      setTimeout(function () {
        btn.classList.remove('is-press');
      }, 380);
    });
  });

  /* Portfolio hero: subtle cursor ripple */
  const portfolioHero = document.querySelector('body.portfolio-theme .lab-hero');
  if (portfolioHero && !reduceMotion) {
    let raf = false;
    portfolioHero.addEventListener(
      'mousemove',
      function (e) {
        if (raf) return;
        raf = true;
        requestAnimationFrame(function () {
          const x = ((e.clientX - portfolioHero.getBoundingClientRect().left) / portfolioHero.offsetWidth) * 100;
          const y = ((e.clientY - portfolioHero.getBoundingClientRect().top) / portfolioHero.offsetHeight) * 100;
          portfolioHero.style.setProperty('--ripple-x', x + '%');
          portfolioHero.style.setProperty('--ripple-y', y + '%');
          raf = false;
        });
      },
      { passive: true }
    );
  }


  /* Reflection typewriter (first block) */
  const tw = document.querySelector('[data-typewriter]');
  if (tw && reduceMotion) {
    tw.classList.add('reflection-typewriter');
  } else if (tw && !reduceMotion) {
    const full = tw.textContent.trim();
    tw.textContent = '';
    tw.classList.add('reflection-typewriter');
    let i = 0;
    const span = document.createElement('span');
    const caret = document.createElement('span');
    caret.className = 'tw-caret';
    tw.appendChild(span);
    tw.appendChild(caret);
    function tick() {
      if (i <= full.length) {
        span.textContent = full.slice(0, i);
        i++;
        setTimeout(tick, i < 24 ? 42 : 22);
      } else {
        caret.remove();
      }
    }
    const ioTw = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          tick();
          ioTw.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    ioTw.observe(tw);
  }
})();
