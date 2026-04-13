/**
 * Single source of truth for blog orbit + archive + post metadata.
 * Paths: /blog/index.html , /blog/post-{id}.html
 */
window.BLOG_POSTS = [
  {
    id: 'intro-to-nova',
    title: 'Navigating the Nova UI',
    hook: 'A walkthrough of glow, depth, and restraint.',
    preview: 'A walkthrough of the space-inspired visual system, handling animation sequences and accessible glow effects.',
    date: '2026-03-01',
    category: 'tech',
    orbitSpeed: 52,
    orbitRadius: 118,
    featured: true,
    fullContent:
      'In this post, we dive into the design decisions behind the Nova theme: star field depth, glassmorphism overlays, and subtle performance-safe animations. You will learn how to prioritize visual richness without harming accessibility or responsiveness.'
  },
  {
    id: 'async-constellations',
    title: 'Async Constellations in Vanilla JS',
    hook: 'requestAnimationFrame as choreography.',
    preview: 'Building performance-friendly constellation systems using requestAnimationFrame and scroll-linked parallax effects.',
    date: '2026-02-16',
    category: 'tech',
    orbitSpeed: 64,
    orbitRadius: 138,
    featured: false,
    fullContent:
      'This post explains how requestAnimationFrame can be used to sync visual effects and avoid janky motion. It also covers how to keep event listeners clean, avoid memory leaks, and create skip/prefers-reduced-motion fallbacks.'
  },
  {
    id: 'cosmic-thoughts',
    title: 'Code, Coffee, and Cosmic Dreams',
    hook: 'Late nights, deployable sparks.',
    preview: 'A short narrative on the process of turning late-night ideas into deployable web experiments.',
    date: '2026-01-28',
    category: 'thoughts',
    orbitSpeed: 71,
    orbitRadius: 158,
    featured: false,
    fullContent:
      'Sometimes the best ideas arrive on the edge of sleep. This piece explores journaling, rapid prototyping, and capturing creative momentum with minimal dough. Learn how to implement a low-friction notes loop as you build.'
  },
  {
    id: 'building-cosmic',
    title: 'Building a Cosmic Portfolio',
    hook: 'Restraint versus drama in motion design.',
    preview: 'The process behind creating a dark, interactive space-themed personal site using vanilla JS and CSS.',
    date: '2026-03-10',
    category: 'experiments',
    orbitSpeed: 48,
    orbitRadius: 128,
    featured: true,
    fullContent:
      'Building this portfolio was an experiment in restraint and drama. The challenge: how much animation is too much? Starting with a starfield background and custom cursor effects, I discovered that web animation must serve emotion.'
  },
  {
    id: 'css-grid-secrets',
    title: 'CSS Grid Secrets I Wish I Knew Earlier',
    hook: 'Implicit grids and named areas.',
    preview: 'Implicit grids, auto-placement algorithms, and the power of minmax(). A deep dive.',
    date: '2026-02-20',
    category: 'tech',
    orbitSpeed: 58,
    orbitRadius: 148,
    featured: false,
    fullContent:
      'CSS Grid changed how I think about layout. The grid-template-areas property alone is worth learning — it lets you name regions and rearrange them for responsive layouts without media query rewrites.'
  },
  {
    id: 'experiment-failure',
    title: 'I built something that failed.',
    hook: 'The version you never ship still teaches.',
    preview: 'On abandoning a renderer that fought the browser — and what I kept from the wreckage.',
    date: '2026-01-15',
    category: 'thoughts',
    orbitSpeed: 76,
    orbitRadius: 168,
    featured: true,
    fullContent:
      'I spent weeks on a canvas-heavy star renderer before admitting the bottleneck was my own loop. I shelved it, kept the math notes, and rebuilt smaller. Failure here meant clarity: ship the story, not the ego.'
  },
  {
    id: 'lab-field-notes',
    title: 'Notes from the Lab Field',
    hook: 'Micro-interactions that survived testing.',
    preview: 'Scratchpad entries from orbit scroll prototypes, sticky sections, and theme bridges.',
    date: '2025-12-08',
    category: 'experiments',
    orbitSpeed: 67,
    orbitRadius: 178,
    featured: false,
    fullContent:
      'Sticky lab sections taught me that scroll distance is a design choice. Theme bridges between dark and light taught me that shared HTML beats duplicated stories. These are field notes, not tutorials.'
  },
  {
    id: 'midnight-fragments',
    title: 'Midnight Fragments',
    hook: 'Half sentences worth keeping.',
    preview: 'Short fragments on focus, boredom, and why side projects need deadlines.',
    date: '2025-11-22',
    category: 'thoughts',
    orbitSpeed: 55,
    orbitRadius: 108,
    featured: false,
    fullContent:
      'Focus is finite. Boredom is data. Deadlines turn sketches into files. This is a small list of beliefs I return to when a side project starts eating the week.'
  }
];

window.getBlogPostById = function (id) {
  return window.BLOG_POSTS.find(function (p) {
    return p.id === id;
  });
};
