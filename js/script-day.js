    /* ── Loader ── */
    window.addEventListener('load', () => {
      // Generate clouds
      createClouds();
      createPollenParticles();
      initScrollProgress();
      initStickyNav();
      initReveal();
      initTypingEffect();
      initContactForm();
      initBlogSystem();
      initBookScroll();
      initLabOrbitScroll();
      initCursor();
      initActiveNav();
      initThemeToggle();

      setTimeout(() => {
        const loader = document.getElementById('loader-wrapper');
        if (loader) loader.classList.add('fade-out');
        setTimeout(() => loader && (loader.style.display = 'none'), 1300);
      }, 1000);
    });

    /* ── Clouds ── */
    function createClouds() {
      const sky = document.getElementById('sky-background');
      const cloudCount = 10;
      for (let i = 0; i < cloudCount; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        const w = Math.random() * 180 + 80;
        const h = w * 0.35;
        const top = Math.random() * 55;
        const duration = Math.random() * 60 + 50;
        const delay = Math.random() * -80;
        const opacity = Math.random() * 0.3 + 0.55;
        cloud.style.cssText = `
          width: ${w}px;
          height: ${h}px;
          top: ${top}vh;
          animation-duration: ${duration}s;
          animation-delay: ${delay}s;
          opacity: ${opacity};
          filter: blur(${Math.random() * 3 + 1}px);
        `;
        sky.appendChild(cloud);
      }
    }

    /* ── Pollen/Dust Particles ── */
    function createPollenParticles() {
      const colors = [
        'rgba(255, 200, 80, 0.5)',
        'rgba(255, 240, 150, 0.4)',
        'rgba(200, 230, 255, 0.45)',
        'rgba(255, 180, 100, 0.35)'
      ];
      for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'pollen';
        const size = Math.random() * 4 + 1.5;
        p.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${Math.random() * 100}vw;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          animation-duration: ${Math.random() * 20 + 15}s;
          animation-delay: ${Math.random() * -20}s;
        `;
        document.body.appendChild(p);
      }
    }

    /* ── Custom Cursor ── */
    function initCursor() {
      const cursor = document.getElementById('cursor-sunbeam');
      document.body.classList.add('custom-cursor-active');
      let cx = 0, cy = 0, raf = false;
      window.addEventListener('mousemove', e => {
        cx = e.clientX; cy = e.clientY;
        if (!raf) {
          raf = true;
          requestAnimationFrame(() => {
            cursor.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`;
            raf = false;
          });
        }
      });
    }

    /* ── Scroll Progress ── */
    function initScrollProgress() {
      const bar = document.getElementById('scroll-progress');
      if (!bar) return;
      window.addEventListener('scroll', () => {
        const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
        bar.style.width = pct + '%';
      }, { passive: true });
    }

    /* ── Sticky Nav ── */
    function initStickyNav() {
      const nav = document.querySelector('nav');
      if (!nav) return;
      window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
      }, { passive: true });
    }

    /* ── Reveal on scroll ── */
    function initReveal() {
      const els = document.querySelectorAll('.reveal, .slide-in.from-left');
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('active');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
      els.forEach(el => obs.observe(el));
    }

    /* ── Typing Effect ── */
    function initTypingEffect() {
      const el = document.getElementById('hero-subtitle');
      if (!el) return;
      const phrases = ['Code • Words • Curiosity', 'Builder • Dreamer • Explorer', 'Student of the Sunlit World'];
      let pi = 0, ci = 0, deleting = false, paused = false;
      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      el.textContent = '';
      el.appendChild(cursor);
      function tick() {
        const curr = phrases[pi];
        if (paused) { paused = false; deleting = true; setTimeout(tick, 1800); return; }
        if (!deleting) {
          ci++; el.textContent = curr.slice(0, ci); el.appendChild(cursor);
          if (ci === curr.length) { paused = true; setTimeout(tick, 100); }
          else setTimeout(tick, 60);
        } else {
          ci--; el.textContent = curr.slice(0, ci); el.appendChild(cursor);
          if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 400); }
          else setTimeout(tick, 35);
        }
      }
      setTimeout(tick, 1800);
    }

    /* ── Contact Form ── */
    function initContactForm() {
      const form = document.getElementById('contact-form');
      if (!form) return;
      form.addEventListener('submit', e => {
        e.preventDefault();
        form.style.display = 'none';
        document.getElementById('success-message').classList.remove('hidden');
      });
    }

    /* ── Book Scroll ── */
    function initBookScroll() {
      const wrapper = document.querySelector('.book-section-wrapper');
      const pages = document.querySelectorAll('.book-page');
      if (!wrapper || !pages.length) return;
      function onScroll() {
        const rect = wrapper.getBoundingClientRect();
        const total = wrapper.offsetHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, -rect.top / total));
        const pageIndex = Math.min(pages.length - 1, Math.floor(progress * pages.length));
        pages.forEach((p, i) => p.classList.toggle('active', i === pageIndex));
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* ── Blog System ── */
    const blogPosts = [
      { id: 'building-cosmic', title: 'Building a Cosmic Portfolio', preview: 'The process behind creating a dark, interactive space-themed personal site using vanilla JS and CSS.', fullContent: 'Building this portfolio was an experiment in restraint and drama. The challenge: how much animation is too much? Starting with a starfield background and custom cursor effects, I discovered that web animation must serve emotion.', date: '2026-03-10' },
      { id: 'css-grid-secrets', title: 'CSS Grid Secrets I Wish I Knew Earlier', preview: 'Implicit grids, auto-placement algorithms, and the power of minmax(). A deep dive.', fullContent: 'CSS Grid changed how I think about layout. The grid-template-areas property alone is worth learning — it lets you name regions and rearrange them for responsive layouts without media query rewrites.', date: '2026-02-16' },
      { id: 'cosmic-thoughts', title: 'Code, Coffee, and Cosmic Dreams', preview: 'A short narrative on the process of turning late-night ideas into deployable web experiments.', fullContent: 'Sometimes the best ideas arrive on the edge of sleep. This piece explores journaling, rapid prototyping, and capturing creative momentum with minimal dough.', date: '2026-01-28' }
    ];

    const BLOG_STORAGE_KEY = 'dayBlogLikes';
    const COMMENT_KEY = 'dayBlogComments';

    function getBlogLikes() { try { return JSON.parse(localStorage.getItem(BLOG_STORAGE_KEY)) || {}; } catch { return {}; } }
    function setBlogLikes(l) { localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(l)); }
    function getComments() { try { return JSON.parse(localStorage.getItem(COMMENT_KEY)) || {}; } catch { return {}; } }
    function setComments(c) { localStorage.setItem(COMMENT_KEY, JSON.stringify(c)); }

    function renderBlogCards() {
      const container = document.getElementById('blog-container');
      if (!container) return;
      const likes = getBlogLikes();
      container.innerHTML = '';
      blogPosts.forEach((post, i) => {
        const card = document.createElement('article');
        card.className = `blog-card reveal${i === 0 ? ' delay-100' : i === 1 ? ' delay-200' : ' delay-300'}`;
        card.innerHTML = `
          <span class="badge-date">${post.date}</span>
          <h3>${post.title}</h3>
          <p>${post.preview}</p>
          <div class="blog-actions">
            <button class="blog-btn" data-action="read" data-id="${post.id}">Read More</button>
            <button class="blog-like-btn" data-action="like" data-id="${post.id}">❤️ <span id="like-count-${post.id}">${likes[post.id] || 0}</span></button>
          </div>`;
        container.appendChild(card);
        card.querySelector('[data-action="read"]').addEventListener('click', () => openBlogModal(post));
        card.querySelector('[data-action="like"]').addEventListener('click', () => {
          const l = getBlogLikes(); l[post.id] = (l[post.id] || 0) + 1; setBlogLikes(l);
          document.getElementById(`like-count-${post.id}`).textContent = l[post.id];
        });
      });
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); } });
      }, { threshold: 0.15 });
      container.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    }

    function openBlogModal(post) {
      document.getElementById('blog-modal-title').textContent = post.title;
      document.getElementById('blog-modal-date').textContent = post.date;
      document.getElementById('blog-modal-body').textContent = post.fullContent;
      const list = document.getElementById('blog-comments-list');
      const comments = getComments()[post.id] || [];
      list.innerHTML = comments.length ? comments.map(c => `<div class="blog-comment-item"><strong>${c.timestamp}</strong><br><span>${c.text}</span></div>`).join('') : '<p style="color:var(--text-muted)">No comments yet. Be the first to share a thought.</p>';
      document.getElementById('blog-comment-form').onsubmit = e => {
        e.preventDefault();
        const val = document.getElementById('blog-comment-input').value.trim();
        if (!val) return;
        const all = getComments(); all[post.id] = all[post.id] || [];
        all[post.id].push({ text: val, timestamp: new Date().toLocaleString() });
        setComments(all); document.getElementById('blog-comment-input').value = '';
        openBlogModal(post);
      };
      document.getElementById('blog-modal').classList.remove('hidden');
    }

    function initBlogSystem() {
      renderBlogCards();
      document.getElementById('blog-modal-close').addEventListener('click', () => document.getElementById('blog-modal').classList.add('hidden'));
      document.getElementById('blog-modal-overlay').addEventListener('click', () => document.getElementById('blog-modal').classList.add('hidden'));
      document.addEventListener('keydown', e => { if (e.key === 'Escape') document.getElementById('blog-modal').classList.add('hidden'); });
    }

    /* ── Theme Toggle ── */
    function initThemeToggle() {
      const themeSwitch = document.getElementById('theme-switch');
      if (themeSwitch) {
        themeSwitch.addEventListener('change', () => {
          if (!themeSwitch.checked) {
            window.location.href = '../dark/index.html';
          }
        });
      }
    }

    /* ── Active Navigation ── */
    function initActiveNav() {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('nav a');

      // throttle nav highlighting with rAF and avoid repeated layout reads
      let lastNavScroll = 0;
      let navTicking = false;
      function onScrollNav() {
        lastNavScroll = window.pageYOffset;
        if (!navTicking) {
          navTicking = true;
          requestAnimationFrame(() => {
            let currentSection = '';
            sections.forEach(section => {
              const sectionTop = section.offsetTop;
              if (lastNavScroll >= (sectionTop - 300)) {
                currentSection = section.getAttribute('id');
              }
            });

            if (lastNavScroll < 300) {
              currentSection = 'home';
              navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === 'index-day.html') link.classList.add('active');
              });
            } else {
              navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(currentSection)) {
                  link.classList.add('active');
                }
              });
            }

            navTicking = false;
          });
        }
      }
      window.addEventListener('scroll', onScrollNav, { passive: true });
    }

    /* ── Horizontal lab orbit scroll (parity with dark index.js) ── */
    function initLabOrbitScroll() {
      const scrollSection = document.querySelector('.lab-scroll-section');
      const track = document.getElementById('lab-track');
      const cards = document.querySelectorAll('.lab-orbit-card');

      if (!scrollSection || !track || cards.length === 0) return;

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          scrollSection.classList.add('active');
        }
      }, { threshold: 0.1 });
      observer.observe(scrollSection);

      let isVisible = false;
      const visibilityObserver = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
      }, { rootMargin: '500px' });
      visibilityObserver.observe(scrollSection);

      let currentTargetX = 0;
      let currentX = 0;

      function lerp(start, end, factor) {
        return start + (end - start) * factor;
      }

      function updateTargetScroll() {
        const sectionTop = scrollSection.getBoundingClientRect().top;
        const maxScroll = scrollSection.offsetHeight - window.innerHeight;

        let progressRatio = 0;
        if (sectionTop <= 0) {
          progressRatio = Math.min(1, Math.abs(sectionTop) / (maxScroll * 0.75));
        }

        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const maxTranslate = Math.max(0, trackWidth - viewportWidth);

        currentTargetX = progressRatio * maxTranslate;
      }

      window.addEventListener('scroll', updateTargetScroll, { passive: true });
      window.addEventListener('resize', updateTargetScroll, { passive: true });

      function tick() {
        if (isVisible) {
          currentX = lerp(currentX, currentTargetX, 0.075);

          const viewportWidth = window.innerWidth;
          const trackWidth = track.scrollWidth;
          const maxTranslate = Math.max(0.1, trackWidth - viewportWidth);
          const smoothProgressRatio = currentX / maxTranslate;

          track.style.transform = `translate3d(-${currentX}px, 0, 0)`;

          const center = window.innerWidth / 2;

          cards.forEach((card, i) => {
            const speed = 0.5 + i * 0.08;
            const parallaxX = (smoothProgressRatio * 300) * (speed - 1);

            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + (rect.width / 2);
            const distance = Math.abs(center - cardCenter);

            const normDist = Math.min(1, distance / 900);
            const scale = Math.max(0.7, 1 - (normDist * normDist * normDist));
            const opacityVal = Math.max(0.1, 1 - distance / 1200);

            card.style.setProperty('--card-x', `${parallaxX}px`);
            card.style.setProperty('--card-scale', scale);
            card.style.setProperty('--card-opacity', opacityVal);

            if (distance < 280) {
              card.classList.add('focused');
            } else {
              card.classList.remove('focused');
            }
          });
        }

        requestAnimationFrame(tick);
      }

      const endIndicator = document.querySelector('.lab-end-indicator');
      if (endIndicator) {
        endIndicator.style.cursor = 'pointer';
        endIndicator.addEventListener('click', () => {
          const targetScrollPos = scrollSection.offsetTop + scrollSection.offsetHeight;
          window.scrollTo({
            top: targetScrollPos,
            behavior: 'smooth'
          });
        });
      }

      updateTargetScroll();
      requestAnimationFrame(tick);
    }