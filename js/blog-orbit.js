(function () {
  const posts = window.BLOG_POSTS;
  if (!posts || !posts.length) return;

  const root = document.getElementById('thought-orbit-root');
  if (!root) return;

  const field = root.querySelector('.orbit-field');
  const core = root.querySelector('.orbit-core');
  if (!field || !core) return;

  const basePath = root.getAttribute('data-blog-base') || '../blog/';
  const list = posts.slice(0, 8);
  const n = list.length;
  const gapPx = 16;
  const bubbleSizes = list.map(function (post, i) {
    return post.featured ? 68 : 52 + (i % 3) * 4;
  });
  const maxBubble = Math.max.apply(null, bubbleSizes);
  const minRadius =
    (maxBubble + gapPx) / (2 * Math.sin(Math.PI / Math.max(n, 1)));
  const fieldSize = Math.min(field.clientWidth || 640, 640);
  const fieldHalf = fieldSize / 2;
  const coreHalf = (core.offsetWidth || 170) / 2;
  const pad = 10;
  const maxRadius = Math.max(
    minRadius,
    fieldHalf - coreHalf - maxBubble / 2 - pad
  );
  const radiusPx = Math.min(Math.max(minRadius, 118), maxRadius);

  const spin = document.createElement('div');
  spin.className = 'orbit-spin';
  const orbitDurSec = 72;
  spin.style.setProperty('--orbit-dur', orbitDurSec + 's');
  field.style.setProperty('--orbit-r', radiusPx + 'px');

  list.forEach(function (post, i) {
    const arm = document.createElement('div');
    arm.className = 'orbit-arm';
    arm.style.setProperty('--arm-angle', (360 * i) / n + 'deg');

    const bubbleSize = bubbleSizes[i];

    const a = document.createElement('a');
    a.className = 'orbit-bubble';
    a.href = basePath + 'post-' + post.id + '.html';
    a.setAttribute('aria-label', post.title);
    a.style.setProperty('--rx', radiusPx + 'px');
    a.style.setProperty('--bubble-size', bubbleSize + 'px');

    const tip = document.createElement('span');
    tip.className = 'orbit-tooltip';
    tip.textContent = post.hook || post.preview;

    const inner = document.createElement('span');
    inner.className = 'orbit-bubble-inner';
    const words = (post.title || '').split(' ').filter(Boolean);
    inner.textContent =
      words.slice(0, 3).join(' ') + (words.length > 3 ? '…' : '');

    a.appendChild(inner);
    a.appendChild(tip);
    arm.appendChild(a);
    spin.appendChild(arm);
  });

  field.appendChild(spin);

  field.querySelectorAll('.orbit-bubble').forEach(function (bubble) {
    bubble.addEventListener('mouseenter', function () {
      spin.classList.add('paused-slow');
    });
    bubble.addEventListener('mouseleave', function () {
      spin.classList.remove('paused-slow');
    });
  });
})();

