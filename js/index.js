// Helper to generate random star box-shadows with Van Gogh colors
function generateStarBoxShadow(count) {
  let shadows = [];
  const colors = ['#ffffff', '#f4e04d', '#7ee7ff', '#a5d8ff']; // White, Gold, Cyan, Soft Blue

  for (let i = 0; i < count; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const color = colors[Math.floor(Math.random() * colors.length)];
    // x y blur color
    shadows.push(`${x}vw ${y}vh 0px ${color}`);
  }
  return shadows.join(', ');
}

window.addEventListener('load', function () {
  // Generate dynamic stars for "enchanting" density
  const stars1 = document.getElementById('stars');
  const stars2 = document.getElementById('stars2');
  const stars3 = document.getElementById('stars3');

  // Use box-shadow to create multiple instances of the star shape from a single element
  if (stars1) stars1.style.boxShadow = generateStarBoxShadow(500); // Small
  if (stars2) stars2.style.boxShadow = generateStarBoxShadow(200); // Medium
  if (stars3) stars3.style.boxShadow = generateStarBoxShadow(100); // Large

  // Persistent Background Stars (Floating Sparks)
  createFloatingStars();
  createSmallPlanets();
  createNebulas();
  startShootingStars();
  initStarParallax();
  initLabOrbitScroll();

  // Mark page as loaded for animations
  document.body.classList.add('loaded');
});

// Helper to create larger floating background stars
// Helper to create larger floating background stars with DISTINCT placement & SCROLL VISUALS
function createFloatingStars() {
  const container = document.getElementById('star-background');
  if (!container) return;

  const colors = ['#ffffff', '#f4e04d', '#7ee7ff', '#c2b3ff']; // White, Gold, Cyan, Soft Purple

  // Calculate grid based on full page height
  const pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

  // Force container to match full page height
  container.style.height = `${pageHeight}px`;

  // We want roughly 1 row every ~150px of height for good density
  const rowHeight = 150;
  const rows = Math.ceil(pageHeight / rowHeight);
  const cols = 6; // slightly wider spread

  const stepX = 100 / cols;
  const stepY = 100 / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() > 0.8) continue; // Skip 20%


      // 1. WRAPPER for Parallax Position
      const wrapper = document.createElement('div');
      wrapper.classList.add('star-wrapper');

      // Random Position
      const x = (c * stepX) + (Math.random() * (stepX - 10)) + 5;
      const y = (r * stepY) + (Math.random() * (stepY - 10)) + 5;

      // Random Size
      const size = Math.random() * 8 + 4;

      wrapper.style.left = `${x}%`;
      wrapper.style.top = `${y}%`;
      wrapper.style.width = `${size}px`;
      wrapper.style.height = `${size}px`;

      // Assign parallax speeds. Set to 0 to lock stars in place and avoid
      // cursor/scroll-driven jitter. If you want subtle depth later, use
      // small values like 0.02.
      const speedY = 0;
      const speedX = 0;

      wrapper.dataset.speedY = speedY;
      wrapper.dataset.speedX = speedX;

      // 2. INNER STAR for Visuals & Local Float Animation
      const star = document.createElement('div');
      star.classList.add('floating-star');
      const color = colors[Math.floor(Math.random() * colors.length)];
      star.style.backgroundColor = color;

      // Animation timings — keep a slow pulse and add a long, randomized
      // shine/fade so stars sometimes brighten then fade out.
      const pulseDuration = Math.random() * 6 + 6; // 6s - 12s
      const pulseDelay = Math.random() * 8;

      const shineDuration = Math.random() * 20 + 20; // 20s - 40s
      const shineDelay = Math.random() * 30;

      star.style.animation = `pulseGlow ${pulseDuration}s infinite alternate ease-in-out ${pulseDelay}s, shineFade ${shineDuration}s infinite linear ${shineDelay}s`;

      wrapper.appendChild(star);
      container.appendChild(wrapper);
    }
  }

}

// Helper to create small colorful planets
function createSmallPlanets() {
  const container = document.getElementById('star-background');
  if (!container) return;

  const colors = [
    { bg: '#ff6b6b', glow: '#ff8787' }, // Red
    { bg: '#a29bfe', glow: '#6c5ce7' }, // Purple
    { bg: '#ffeaa7', glow: '#fdcb6e' }, // Gold
    { bg: '#55efc4', glow: '#00cec9' }  // Teal
  ];

  const count = 4; // Number of small planets

  for (let i = 0; i < count; i++) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('planet-wrapper');

    // Random Position (avoid top-right where main planet is)
    let x = Math.random() * 90;
    let y = Math.random() * 90;

    // Simple check to keep away from main planet (approx top 10%, right 10%)
    if (x > 60 && y < 40) {
      x = 20; // Move to left if falls in that zone
    }

    // Size (30-60px)
    const size = Math.random() * 30 + 30;

    wrapper.style.left = `${x}%`;
    wrapper.style.top = `${y}%`;
    wrapper.style.width = `${size}px`;
    wrapper.style.height = `${size}px`;

    // Parallax Speed (keep planets static to avoid jitter)
    wrapper.dataset.speedY = 0;
    wrapper.dataset.speedX = 0;

    const planet = document.createElement('div');
    planet.classList.add('small-planet');

    // Gradient styling
    const color = colors[i % colors.length];
    planet.style.background = `radial-gradient(circle at 30% 30%, ${color.bg} 0%, #050a14 80%)`;
    planet.style.boxShadow = `inset -4px -4px 10px rgba(0,0,0,0.8), 0 0 10px ${color.glow}`;

    wrapper.appendChild(planet);
    container.appendChild(wrapper);
  }
}

// Handle the scroll movement for stars, planet, and warp speed
function initStarParallax() {
  const wrappers = document.querySelectorAll('.star-wrapper, .planet-wrapper');
  const planet = document.getElementById('planet-container');
  let warpFactor = 1;
  let currentWarp = 1;
  let lastScrollY = window.scrollY;
  let lastT = performance.now();

  // expose current warp globally so other systems (like constellations) can read it
  window._currentWarp = currentWarp;

  // Controlled warp: derived from scroll velocity (removes "hold to inflate" behavior)
  function updateWarpTarget(now, scrollY) {
    const dt = Math.max(1, now - lastT);
    const dy = scrollY - lastScrollY;
    const speedPxPerS = Math.abs(dy) / dt * 1000;
    // Reduce sensitivity: 0..1 intensity once you scroll ~3000px/s
    const intensity = Math.min(speedPxPerS / 3000, 1);
    // smaller added warp so stars don't visibly stretch or jump
    warpFactor = 1 + (intensity * 1.0); // 1..2
    lastT = now;
    lastScrollY = scrollY;
  }

  // Cache origin positions for wrappers (used by constellation logic)
  function cacheOrigins() {
    wrappers.forEach(w => {
      const rect = w.getBoundingClientRect();
      w.dataset.origX = rect.left + rect.width / 2;
      w.dataset.origY = rect.top + rect.height / 2;
    });
  }
  cacheOrigins();

  // Re-cache origins on resize (layout changes)
  let resizeTicking = false;
  window.addEventListener('resize', () => {
    if (resizeTicking) return;
    resizeTicking = true;
    requestAnimationFrame(() => {
      cacheOrigins();
      resizeTicking = false;
    });
  }, { passive: true });

  // Use a single animation loop for everything
  function animate(now) {
    const scrollY = window.scrollY;
    updateWarpTarget(now, scrollY);

    // Smooth warp transition
    currentWarp += (warpFactor - currentWarp) * 0.05;
    window._currentWarp = currentWarp;

    // 1. Planet Parallax (Slow, disconnected from warp)
    if (planet) {
      planet.style.transform = `translate3d(0, ${scrollY * 0.05}px, 0)`;
    }

    // 2. Stars Parallax + Warp — with reduced impact. If dataset speeds are
    // zero, this will be a no-op and stars remain locked.
    wrappers.forEach(wrapper => {
      const speedY = parseFloat(wrapper.dataset.speedY || 0);
      const speedX = parseFloat(wrapper.dataset.speedX || 0);

      const yOffset = scrollY * speedY * currentWarp;
      const xOffset = scrollY * speedX * 0.2 * currentWarp;

      // Subtle scale during warp (very small)
      const scale = 1 + (currentWarp - 1) * 0.12;

      wrapper.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) scale(${scale})`;
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}



// Feature 7: Custom Comet Cursor
(function () {
  // Removed touch check because many Windows laptops are hybrid
  // const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  // if (isTouch) return;

  const cursor = document.createElement('div');
  cursor.id = 'cursor-comet';
  document.body.appendChild(cursor);

  // Hide default cursor only when custom one is ready
  document.body.classList.add('custom-cursor-active');

  let lastTrail = 0;

  // Smooth cursor motion (eased towards target)
  let targetX = -1000, targetY = -1000;
  let curX = targetX, curY = targetY;
  let cursorRAF = false;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  // Single rAF loop for cursor + trail spawn (less work per mouse event)
  const maxTrails = 48;
  const trailNodes = [];

  function spawnTrail(x, y) {
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    trail.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    document.body.appendChild(trail);
    trailNodes.push(trail);
    // Cap DOM size to avoid lag on long sessions
    if (trailNodes.length > maxTrails) {
      const old = trailNodes.shift();
      if (old) old.remove();
    }
    trail.addEventListener('animationend', () => {
      const idx = trailNodes.indexOf(trail);
      if (idx !== -1) trailNodes.splice(idx, 1);
      trail.remove();
    }, { once: true });
  }

  function tick(now) {
    // Ease towards target (critically damped-ish)
    curX += (targetX - curX) * 0.22;
    curY += (targetY - curY) * 0.22;

    cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;

    // Spawn Trail (Throttle ~25fps)
    if (now - lastTrail > 40) {
      lastTrail = now;
      spawnTrail(curX, curY);
    }

    requestAnimationFrame(tick);
  }

  if (!cursorRAF) {
    cursorRAF = true;
    requestAnimationFrame((now) => {
      cursorRAF = false;
      tick(now);
    });
  }

  // Hover states - simpler event delegation
  document.body.addEventListener('mouseover', (e) => {
    if (e.target.matches('a, button, input, .clickable, .project-card, .logo, .nav-links a, h1')) {
      cursor.classList.add('hovering');
    }
  });

  document.body.addEventListener('mouseout', (e) => {
    if (e.target.matches('a, button, input, .clickable, .project-card, .logo, .nav-links a, h1')) {
      cursor.classList.remove('hovering');
    }
  });
})();


// Cool & Exciting Features (Tilt, Reveal, Active Nav)
document.addEventListener('DOMContentLoaded', () => {
  initTiltEffect();
  initScrollReveal();
  initActiveNav();
  initThemeToggle();
  initBookScroll();
});

// Feature 1: Cosmic Nebula Glows
function createNebulas() {
  const container = document.getElementById('nebula-container');
  if (!container) return;

  // Colors: Deep Blue, Purple, faint Gold
  const colors = ['rgba(10, 20, 40, 0.6)', 'rgba(80, 40, 100, 0.3)', 'rgba(20, 50, 80, 0.4)', 'rgba(100, 100, 50, 0.1)'];
  const count = 4;

  for (let i = 0; i < count; i++) {
    const nebula = document.createElement('div');
    nebula.classList.add('nebula-cloud');

    // Large sizes (40-60vw)
    const size = Math.random() * 20 + 40;
    nebula.style.width = `${size}vw`;
    nebula.style.height = `${size}vw`;

    // Random Positions
    nebula.style.left = `${Math.random() * 80 - 10}%`;
    nebula.style.top = `${Math.random() * 80}%`;

    nebula.style.background = colors[i % colors.length];

    // Random Animation Delays
    nebula.style.animationDelay = `${Math.random() * -20}s`;

    container.appendChild(nebula);
  }
}

// Feature 2: Shooting Stars
function startShootingStars() {
  const container = document.getElementById('shooting-star-container');
  if (!container) return;

  // Spawn a shooting star every 10-25 seconds
  function spawn() {
    const star = document.createElement('div');
    star.classList.add('shooting-star');

    // Random start position (mostly top right area to shoot down-left)
    const startX = Math.random() * 100 + 50; // 50% to 150% (off screen right)
    const startY = Math.random() * 50 - 50; // -50% to 0% (off screen top)
    const length = Math.random() * 150 + 100; // 100-250px tail width

    star.style.left = `${startX}%`;
    star.style.top = `${startY}%`;
    star.style.width = `${length}px`;

    // Animation duration random (Faster, 0.8s - 1.5s)
    const duration = Math.random() * 0.7 + 0.8;
    star.style.animationDuration = `${duration}s`;

    container.appendChild(star);

    // Remove after animation
    setTimeout(() => {
      star.remove();
    }, duration * 1000);

    // Schedule next (rarer)
    const nextSpawn = Math.random() * 30000 + 15000; // 15-45s
    setTimeout(spawn, nextSpawn);
  }

  // Initial delay (longer to avoid immediate motion)
  setTimeout(spawn, 8000);
}

// Feature 3: Constellations (Mouse Connections)
function initConstellations() {
  const canvas = document.getElementById('constellation-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let mouse = { x: -1000, y: -1000 };
  let wrappers = [];
  let dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Cache the wrappers once logic is ready (wait a bit for stars to exist)
  setTimeout(() => {
    wrappers = Array.from(document.querySelectorAll('.star-wrapper'));
  }, 1000);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    if (mouse.x > 0 && mouse.y > 0) {
      const connectDistance = 150;
      const scrollY = window.scrollY;
      const warp = window._currentWarp || 1;

      wrappers.forEach(wrapper => {
        // derive projected star center using cached origin and parallax logic
        const speedY = parseFloat(wrapper.dataset.speedY || 0);
        const speedX = parseFloat(wrapper.dataset.speedX || 0);
        const origX = parseFloat(wrapper.dataset.origX) || 0;
        const origY = parseFloat(wrapper.dataset.origY) || 0;

        const yOffset = scrollY * speedY * warp;
        const xOffset = scrollY * speedX * 0.5 * warp;

        const starX = origX + xOffset;
        const starY = origY + yOffset;

        const dx = mouse.x - starX;
        const dy = mouse.y - starY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectDistance) {
          const opacity = 1 - (dist / connectDistance);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
          ctx.lineWidth = 1;
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(starX, starY);
          ctx.stroke();
        }
      });
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// 1. 3D Tilt Effect for Cards
function initTiltEffect() {
  const cards = document.querySelectorAll('.project-card, .header-content');

  if (window.matchMedia('(hover: none)').matches) return; // Disable on touch

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate rotation (center is 0)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Limit max rotation (e.g. +/- 5 deg)
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// 2. Scroll Reveal Animation
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  });

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));
}

// 3. Active Navigation Highlighting
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
          //const sectionHeight = section.clientHeight; // not used
          if (lastNavScroll >= (sectionTop - 300)) {
            currentSection = section.getAttribute('id');
          }
        });

        if (lastNavScroll < 300) {
          currentSection = 'home';
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === 'index.html') link.classList.add('active');
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

// Theme Toggle
function initThemeToggle() {
  const themeSwitch = document.getElementById('theme-switch');
  if (themeSwitch) {
    themeSwitch.addEventListener('change', () => {
      if (themeSwitch.checked) {
        window.location.href = '../light/index-day.html';
      }
    });
  }
}

// 4. Mature Book Scroll Interaction
function initBookScroll() {
  const wrapper = document.querySelector('.book-section-wrapper');
  const stickyContainer = document.querySelector('.book-sticky-container');
  const pages = document.querySelectorAll('.book-page');

  if (!wrapper || !stickyContainer || pages.length === 0) return;

  // If we are on mobile (height: auto), don't run the scroll logic
  if (getComputedStyle(wrapper).height === 'auto') return;

  // wrap book scroll logic in rAF throttling
  let bookTicking = false;
  function updateBookScroll() {
    if (window.innerWidth <= 900) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const totalScrollDistance = wrapperRect.height - stickyContainer.offsetHeight;
    let scrollYWithinSection = (viewportHeight * 0.15) - wrapperRect.top;
    if (scrollYWithinSection < 0) scrollYWithinSection = 0;
    const progress = Math.min(Math.max(scrollYWithinSection / totalScrollDistance, 0), 1);

    pages.forEach((page, index) => {
      const rangeStart = index * 0.33;
      const rangeEnd = (index + 1) * 0.33;

      if (index === pages.length - 1 && progress > rangeStart) {
        page.classList.add('active');
        page.classList.remove('scroll-out');
      }
      else if (progress >= rangeStart && progress < rangeEnd) {
        page.classList.add('active');
        page.classList.remove('scroll-out');
      } else if (progress >= rangeEnd) {
        page.classList.remove('active');
        page.classList.add('scroll-out');
      } else {
        page.classList.remove('active');
        page.classList.remove('scroll-out');
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (!bookTicking) {
      bookTicking = true;
      requestAnimationFrame(() => {
        updateBookScroll();
        bookTicking = false;
      });
    }
  }, { passive: true });
}

// 5. Timeline Animation
function initTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => observer.observe(item));
}

// Initialize new features
document.addEventListener('DOMContentLoaded', () => {
  initTimeline();
  initOrbitSystem();
  initContactForm();
});

// 6. Orbit Controls
function initOrbitSystem() {
  const rings = document.querySelectorAll('.orbit-ring');
  rings.forEach(ring => {
    ring.addEventListener('mouseenter', () => {
      ring.style.animationPlayState = 'paused';
    });
    ring.addEventListener('mouseleave', () => {
      ring.style.animationPlayState = 'running';
    });
  });
}

// 7. Event Horizon Contact Form
function initContactForm() {
  const form = document.getElementById('contact-form');
  const container = document.querySelector('.contact-content');
  const blackHole = document.querySelector('.black-hole');
  const successMsg = document.getElementById('success-message');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Don't actually submit

    // 1. Trigger "Suck In" animation
    form.style.transition = "all 1s cubic-bezier(0.7,0,0.3,1)";
    form.style.transform = "scale(0) rotate(360deg)";
    form.style.opacity = "0";

    // Enlarge black hole momentarily
    if (blackHole) blackHole.classList.add('eating');

    // 2. Wait for animation, then show success
    setTimeout(() => {
      form.style.display = 'none';
      if (blackHole) blackHole.classList.remove('eating');

      if (successMsg) {
        successMsg.classList.remove('hidden');
        // Reset transform for container if we animated specific parts, 
        // but here we just hid the form.
      }
    }, 1200);
  });
}

// ---- Blog System (posts from ../js/blog-data.js — window.BLOG_POSTS) ----
const BLOG_STORAGE_KEY = 'cosmicBlogLikes';
const COMMENT_STORAGE_KEY = 'cosmicBlogComments';

function getBlogLikes() {
  try {
    return JSON.parse(localStorage.getItem(BLOG_STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function setBlogLikes(likes) {
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(likes));
}

function getBlogComments() {
  try {
    return JSON.parse(localStorage.getItem(COMMENT_STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function setBlogComments(comments) {
  localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(comments));
}

function renderBlogCards() {
  const container = document.getElementById('blog-container');
  if (!container) return;

  const blogPosts = window.BLOG_POSTS;
  if (!blogPosts || !blogPosts.length) return;

  const likes = getBlogLikes();

  container.innerHTML = '';

  blogPosts.forEach((post, index) => {
    const card = document.createElement('article');
    card.className = 'blog-card reveal';
    if (index === 0) card.classList.add('delay-100');
    if (index === 1) card.classList.add('delay-200');
    if (index === 2) card.classList.add('delay-300');
    
    card.innerHTML = `
      <span class="badge-date">${post.date}</span>
      <h3>${post.title}</h3>
      <p>${post.preview}</p>
      <div class="blog-actions">
        <button class="blog-btn" data-action="read" data-id="${post.id}">Read More</button>
        <button class="blog-like-btn" data-action="like" data-id="${post.id}">❤️ <span id="like-count-${post.id}">${likes[post.id] || 0}</span></button>
      </div>
    `;

    container.appendChild(card);

    card.querySelector('[data-action="read"]').addEventListener('click', () => openBlogModal(post));
    card.querySelector('[data-action="like"]').addEventListener('click', () => {
      const currentLikes = getBlogLikes();
      currentLikes[post.id] = (currentLikes[post.id] || 0) + 1;
      setBlogLikes(currentLikes);
      document.getElementById(`like-count-${post.id}`).textContent = currentLikes[post.id];
    });
  });

  // Re-observe newly created cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  });

  const revealElements = container.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));
}

function openBlogModal(post) {
  const modal = document.getElementById('blog-modal');
  const body = document.getElementById('blog-modal-body');
  const title = document.getElementById('blog-modal-title');
  const date = document.getElementById('blog-modal-date');
  const commentsList = document.getElementById('blog-comments-list');
  const commentForm = document.getElementById('blog-comment-form');
  const commentInput = document.getElementById('blog-comment-input');

  if (!modal || !body || !title || !date || !commentsList || !commentForm || !commentInput) return;

  title.textContent = post.title;
  date.textContent = post.date;
  body.textContent = post.fullContent;

  const comments = getBlogComments();
  const postComments = comments[post.id] || [];

  commentsList.innerHTML = '';

  if (postComments.length === 0) {
    commentsList.innerHTML = '<p style="color: var(--text-muted);">No comments yet. Be the first traveler to write one.</p>';
  } else {
    postComments.forEach(c => {
      const item = document.createElement('div');
      item.className = 'blog-comment-item';
      item.innerHTML = `<strong>${c.timestamp}</strong><br><span>${c.text}</span>`;
      commentsList.appendChild(item);
    });
  }

  commentForm.onsubmit = (event) => {
    event.preventDefault();
    const value = commentInput.value.trim();
    if (!value) return;

    const currentComments = getBlogComments();
    currentComments[post.id] = currentComments[post.id] || [];
    currentComments[post.id].push({
      text: value,
      timestamp: new Date().toLocaleString()
    });
    setBlogComments(currentComments);
    commentInput.value = '';
    openBlogModal(post); // refresh comments display
  };

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

function closeBlogModal() {
  const modal = document.getElementById('blog-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

function initBlogSystem() {
  renderBlogCards();

  const closeBtn = document.getElementById('blog-modal-close');
  const overlay = document.getElementById('blog-modal-overlay');

  if (closeBtn) closeBtn.addEventListener('click', closeBlogModal);
  if (overlay) overlay.addEventListener('click', closeBlogModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBlogModal();
  });
}

// Wire into existing setup
document.addEventListener('DOMContentLoaded', () => {
  initTimeline();
  initOrbitSystem();
  initContactForm();
  initBlogSystem();
  initScrollProgress();
  initStickyNav();
  initTypingEffect();
});

// ── Scroll Progress Bar ──
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ── Sticky Nav glass effect ──
function initStickyNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── Typing Effect for hero subtitle ──
function initTypingEffect() {
  const el = document.getElementById('hero-subtitle');
  if (!el) return;

  const phrases = ['Code • Words • Curiosity', 'Builder • Dreamer • Explorer', 'Student of the Cosmos'];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let paused = false;

  // Create cursor
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  el.textContent = '';
  el.appendChild(cursor);

  function tick() {
    const current = phrases[phraseIndex];

    if (paused) {
      paused = false;
      deleting = true;
      setTimeout(tick, 1800);
      return;
    }

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      el.appendChild(cursor);
      if (charIndex === current.length) {
        paused = true;
        setTimeout(tick, 100);
      } else {
        setTimeout(tick, 60);
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      el.appendChild(cursor);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 400);
      } else {
        setTimeout(tick, 35);
      }
    }
  }

  // Start after hero animation delay
  setTimeout(tick, 2600);
}

// ── Horizontal Orbit Scroll Logic ──
function initLabOrbitScroll() {
  const scrollSection = document.querySelector('.lab-scroll-section');
  const track = document.getElementById('lab-track');
  const cards = document.querySelectorAll('.lab-orbit-card');
  
  if (!scrollSection || !track || cards.length === 0) return;

  // Add scroll reveal for the section itself
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      scrollSection.classList.add('active');
    }
  }, { threshold: 0.1 });
  observer.observe(scrollSection);

  // Visibility Check to save CPU on RAF
  let isVisible = false;
  const visibilityObserver = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { rootMargin: "500px" });
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
      // Complete the horizontal slide by 75% of the vertical scroll depth.
      // This leaves 25% of "dead space" locking the view perfectly at the end indicator.
      progressRatio = Math.min(1, Math.abs(sectionTop) / (maxScroll * 0.75));
    }
    
    // Exact mapping for Track width so we reach the end perfectly 
    const trackWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxTranslate = Math.max(0, trackWidth - viewportWidth);
    
    currentTargetX = progressRatio * maxTranslate;
  }

  window.addEventListener('scroll', updateTargetScroll, { passive: true });
  window.addEventListener('resize', updateTargetScroll, { passive: true });
  
  function tick() {
    if (isVisible) {
      // 7.5% per frame lerp for buttery inertia
      currentX = lerp(currentX, currentTargetX, 0.075);

      const viewportWidth = window.innerWidth;
      const trackWidth = track.scrollWidth;
      const maxTranslate = Math.max(0.1, trackWidth - viewportWidth);
      let smoothProgressRatio = currentX / maxTranslate;
      
      // Master track movement
      track.style.transform = `translate3d(-${currentX}px, 0, 0)`;

      const center = window.innerWidth / 2;
      
      cards.forEach((card, i) => {
        // Per-card parallax depth
        const speed = 0.5 + i * 0.08;
        const parallaxX = (smoothProgressRatio * 300) * (speed - 1); 
        
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + (rect.width / 2);
        const distance = Math.abs(center - cardCenter);
        
        // Cubic falloff (t * t * t) for smoother organic scale curve
        const normDist = Math.min(1, distance / 900);
        const scale = Math.max(0.7, 1 - (normDist * normDist * normDist));
        const opacityVal = Math.max(0.1, 1 - distance / 1200);

        // Applying dynamic styling without CSS transition interference!
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
  
  // Click to continue arrow logic
  const endIndicator = document.querySelector('.lab-end-indicator');
  if (endIndicator) {
    endIndicator.style.cursor = 'pointer';
    endIndicator.addEventListener('click', () => {
      // Find the end of this current scroll section and smoothly jump past it
      const targetScrollPos = scrollSection.offsetTop + scrollSection.offsetHeight;
      window.scrollTo({
        top: targetScrollPos,
        behavior: 'smooth'
      });
    });
  }

  // Trigger initially to set positions
  updateTargetScroll();
  requestAnimationFrame(tick);
}