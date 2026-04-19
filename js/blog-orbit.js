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
  // Make all bubbles equal size for a tidy, consistent frame
  const uniformSize = 56;
  const bubbleSizes = list.map(function () {
    return uniformSize;
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

  // Keep the spin wrapper but freeze it so the cluster is a static frame
  const spin = document.createElement('div');
  spin.className = 'orbit-spin static';
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

    const inner = document.createElement('span');
    inner.className = 'orbit-bubble-inner';
    const words = (post.title || '').split(' ').filter(Boolean);
    inner.textContent = words.slice(0, 3).join(' ') + (words.length > 3 ? '…' : '');

    a.appendChild(inner);
    arm.appendChild(a);
    spin.appendChild(arm);
  });

  field.appendChild(spin);

  // Create a side preview panel (if not present) and wire bubble clicks
  function ensurePanel() {
    let panel = document.getElementById('blog-preview-panel');
    if (panel) return panel;
    panel = document.createElement('aside');
    panel.id = 'blog-preview-panel';
    panel.className = 'blog-preview-panel hidden';
    panel.innerHTML = `
      <button class="panel-close" aria-label="Close preview">✕</button>
      <div class="panel-content">
        <h3 class="panel-title"></h3>
        <p class="panel-date"></p>
        <p class="panel-preview"></p>
        <a class="panel-link" href="#">Read full post →</a>
      </div>
    `;
    document.body.appendChild(panel);
    panel.querySelector('.panel-close').addEventListener('click', function () {
      panel.classList.add('hidden');
    });
    panel.addEventListener('click', function (e) {
      if (e.target === panel) panel.classList.add('hidden');
    });
    return panel;
  }

  const panel = ensurePanel();

  field.querySelectorAll('.orbit-bubble').forEach(function (bubble, idx) {
    // make static visual behavior
    bubble.classList.add('orbit-static');
    // prevent navigation — open preview panel instead
    bubble.addEventListener('click', function (ev) {
      ev.preventDefault();
      const post = list[idx];
      if (!post) return (panel.classList.add('hidden'), null);
      panel.querySelector('.panel-title').textContent = post.title || '';
      panel.querySelector('.panel-date').textContent = post.date || '';
      panel.querySelector('.panel-preview').textContent = post.preview || post.hook || '';
      panel.querySelector('.panel-link').href = (basePath || '') + 'post-' + post.id + '.html';
      panel.classList.remove('hidden');
    });
  });
})();

