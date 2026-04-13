(function () {
  const grid = document.getElementById('blog-archive-grid');
  const posts = window.BLOG_POSTS;
  if (!grid || !posts || !posts.length) return;

  const postBase = grid.getAttribute('data-post-base') || '';

  function cardClass(post, i) {
    if (post.title && post.title.length < 22 && post.category === 'thoughts') return 'blog-archive-card card-micro';
    if (post.featured && i < 4) return 'blog-archive-card card-wide';
    if (post.category === 'thoughts' && i % 3 === 1) return 'blog-archive-card card-quote';
    return 'blog-archive-card';
  }

  posts.forEach(function (post, i) {
    const a = document.createElement('a');
    a.href = postBase + 'post-' + post.id + '.html';
    a.className = cardClass(post, i);
    a.dataset.category = post.category || 'all';
    if (post.category === 'thoughts' && i % 3 === 1) {
      a.innerHTML =
        '<span class="bac-meta">' +
        post.date +
        ' · ' +
        post.category +
        '</span><p class="bac-hook">“' +
        (post.hook || post.preview) +
        '”</p>';
    } else {
      a.innerHTML =
        '<span class="bac-meta">' +
        post.date +
        ' · ' +
        (post.category || '') +
        '</span><h2>' +
        post.title +
        '</h2><p class="bac-hook">' +
        (post.hook || post.preview) +
        '</p>';
    }
    grid.appendChild(a);
  });

  const buttons = document.querySelectorAll('.blog-filter-btn');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const cat = btn.getAttribute('data-filter') || 'all';
      buttons.forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
      });
      grid.querySelectorAll('.blog-archive-card').forEach(function (card) {
        const c = card.dataset.category || '';
        const show = cat === 'all' || c === cat;
        card.classList.toggle('hidden', !show);
      });
    });
  });
})();
