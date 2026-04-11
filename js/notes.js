// ── Notes Page JavaScript ──────────────────────────────────────

// Full note content data — keyed by card data-id
const noteData = [
  {
    id: 0,
    type: '🧪 Learning',
    tag: 'Tech',
    tagClass: 'tech-tag',
    title: 'How CSS Grid Actually Works',
    date: 'Apr 1, 2026',
    readTime: '4 min read',
    body: `I spent two embarrassing days confused about implicit vs explicit grids before something finally clicked. Here's the mental model that made it make sense.

The explicit grid is what you define. When you write grid-template-columns: repeat(3, 1fr), you're drawing the columns. The implicit grid is what the browser creates automatically when your items overflow that definition.

The confusion arises here: grid-auto-rows controls how tall those auto-generated rows are. Most tutorials skip this or bury it. If you've ever had grid items with no height, you've hit this silently.

A clean way to think about it:
— Explicit = your blueprint.
— Implicit = the browser filling in the blanks.

Once I started thinking of the grid as a two-part system — what I declare, and what gets generated — everything else clicked into place. The auto-placement algorithm, the dense keyword, the reason minmax(0, 1fr) matters.

The real lesson: CSS Grid gives you a lot of rope. Understanding which rope is yours and which belongs to the browser saves hours.`
  },
  {
    id: 1,
    type: '💭 Reflection',
    tag: 'Films',
    tagClass: 'films-tag',
    title: 'Everything Everywhere All at Once',
    date: 'Mar 22, 2026',
    readTime: '3 min read',
    body: `I expected a fun sci-fi comedy. I did not expect to sit with the film for three weeks afterward.

There's a version of this film that's just a clever multiverse romp. But the Daniels aren't interested in that. What they're building is a meditation on grief, on mothers who couldn't say what they meant, on daughters who spent years waiting.

The absurdism isn't decoration. It's the film's argument. When everything is possible everywhere all at once — when every door is open, every path taken — meaning should collapse. And it almost does, for Jobu Tupaki. But the film's answer isn't nihilism's defeat of the self, it's presence. It's choosing this life, this laundry, this difficult woman who is your mother.

I cried at the googly eyes. I think that means it worked.

What stays with me: the idea that the hardest act isn't doing something extraordinary — it's returning home and being kind.`
  },
  {
    id: 2,
    type: '🎧 Recommendation',
    tag: 'Books',
    tagClass: 'books-tag',
    title: 'Meditations by Marcus Aurelius',
    date: 'Mar 14, 2026',
    readTime: '5 min read',
    body: `These weren't written to be published. Marcus Aurelius wrote them to himself — a private notebook, a Roman emperor reminding himself, daily, to be decent.

That's what makes them different from every philosophy book I've read. There's no audience being persuaded. No argument being constructed for posterity. Just a man in his tent, on campaign, writing: you have power over your mind, not outside events. You've known this. Why are you forgetting it again?

The repetition in Meditations used to bother me. He comes back to the same lessons across all twelve books. Then I understood: that's the point. The Stoic practice isn't a one-time revelation. It's a daily returning. Like stretching. You don't do it once and become flexible forever.

The entries I return to most are the ones about impermanence. The cities that seemed permanent are dust. The emperors that seemed immortal are forgotten. This will happen to you too — and that's not tragedy, it's permission to put down the weight of importance.

Read it slowly. One entry a day. Argue with it. It holds up.`
  },
  {
    id: 3,
    type: '🎧 Recommendation',
    tag: 'Music',
    tagClass: 'music-tag',
    title: "The Album I Can't Stop Returning To",
    date: 'Mar 5, 2026',
    readTime: '3 min read',
    body: `Frank Ocean's Blonde doesn't behave like an album. It behaves like a place you go.

There's almost no percussion for the first half. Just voice, texture, half-finished thoughts. It was deliberately engineered to resist radio, streaming algorithms, easy consumption. You can't have it as background music. It demands you sit with it.

The production choice that changed how I hear music: the deliberate tape hiss on Seigfried. The slight pitch imperfection on the harmonies throughout. These aren't accidents — they're choices that say: this is human. This is not perfect. That's the point.

What Blonde taught me about design (yes, I'm going there): restraint is a form of communication. The absence of the hi-hat is saying something. The silence after the line is saying something. Sometimes what you leave out is the loudest part.

Track recommendation if you've never listened: start with Self Control. Then Godspeed. Then go back to the beginning.`
  },
  {
    id: 4,
    type: '📘 Concept',
    tag: 'Design',
    tagClass: 'design-tag',
    title: 'Why White Space Is Not Empty',
    date: 'Feb 28, 2026',
    readTime: '4 min read',
    body: `There's a kind of design anxiety that wants to fill every corner. Blank space feels unfinished. Like you forgot something. Like you're not working hard enough.

This is wrong, and it costs.

White space — or negative space — is an active ingredient in composition. It controls where attention goes. It tells the eye what's important by telling it what to ignore. The margin isn't outside the design; it's part of the design.

When I look at interfaces that feel calm and trustworthy, they almost always have generous spacing. The content isn't competing with itself. There's room to breathe before the next thing arrives.

Some practical things I've noticed:
— Increasing line-height from 1.5 to 1.8 makes body text feel more considered.
— Padding that feels "too big" in Figma often feels right in the browser.
— The space between a heading and its paragraph communicates their relationship.

The hardest part of working with white space isn't adding it — it's defending it when someone says "can we make this bigger" or "can we fit one more thing here."

Sometimes you can't. The space is load-bearing.`
  },
  {
    id: 5,
    type: '🧪 Learning',
    tag: 'Tech',
    tagClass: 'tech-tag',
    title: 'JavaScript Closures, Demystified',
    date: 'Feb 18, 2026',
    readTime: '6 min read',
    body: `Every tutorial says: closures "capture" or "close over" the outer scope. This is true but useless if you don't know what it means in practice.

Here's what actually happens: when a function is defined inside another function, the inner function retains a reference to the outer function's variable environment — not a copy of the values at that moment, but the actual environment object. This is why the classic loop-counter bug exists.

function makeAdders() {
  const adders = [];
  for (var i = 0; i < 3; i++) {
    adders.push(function(x) { return x + i; });
  }
  return adders;
}

All three adders return x + 3, not x + 0, x + 1, x + 2. Because they all close over the same i variable, which has finished the loop at 3.

The fix with let works because let creates a new binding per iteration — a new environment object — so each function closes over its own i.

Why does this matter beyond the bug? Because it means closures are a memory story. The outer scope lives as long as something references it. This is both the power (persistent private state, module pattern) and the risk (unintended retention, memory leaks in long-lived event listeners).

Once you see closures as scope lifetimes rather than variable copies, a lot of confusing JavaScript behavior becomes obvious.`
  },
  {
    id: 6,
    type: '💭 Reflection',
    tag: 'Films',
    tagClass: 'films-tag',
    title: 'Arrival & the Shape of Time',
    date: 'Feb 10, 2026',
    readTime: '4 min read',
    body: `Arrival hides what it is until almost the end. You think you're watching a first-contact thriller — alien ships, military pressure, a linguist racing to decode a language. You are, but that's not what the film is about.

What the film is about: if you knew exactly how much something would cost you, would you still choose it?

The twist doesn't work as a surprise. It works as a question. Louise knows. She has always known. The chronology isn't a trick Villeneuve plays on us — it's the logic the film is building toward. Time, in the alien language, isn't linear. Once you understand it, you can't unlearn it.

There's a Stoic idea buried here: amor fati. Love of fate. Not resignation, but genuine embrace of what comes, including the hard parts, because they are part of what makes the whole.

The scene I keep returning to: Hannah's name, and why it was chosen. Palindromic. The same forwards and backwards. Time, looping.

I've watched Arrival four times. Each time I understand the beginning differently than I did before.`
  },
  {
    id: 7,
    type: '📘 Concept',
    tag: 'Design',
    tagClass: 'design-tag',
    title: 'Typography as Voice',
    date: 'Jan 30, 2026',
    readTime: '3 min read',
    body: `Before a user reads a single word, the typeface has already said something. It's happened below conscious attention — a texture, a mood, a first impression of who made this and whether to trust them.

Serif typefaces carry historical weight. They were designed for print, for setting long texts that needed guidance at small sizes. They signal tradition, editorial care, permanence. A serif says: this is meant to last.

Sans-serif typefaces emerged from modernism. They were clean breaks — neutral, functional, efficient. They signal clarity, directness, the present tense.

Neither is better. Both are choices.

Where designers go wrong: treating type selection as aesthetics instead of communication. Picking a display font because it looks interesting without asking what that interest means in context. Using a whimsical script on a fintech product. Using a rigid geometric on an artisan goods page. The type is sending a message that contradicts the content.

The practice I've adopted: describe the product in three adjectives. Then find a typeface that embodies those adjectives. Test it against: does this feel like the company? Does it feel like what the user came here to do?

Type is voice. Choose yours deliberately.`
  }
];

// ── Filter Tabs ──────────────────────────────────────────────

function initNotesFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.note-card');
  const countEl = document.getElementById('visible-count');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.dataset.filter;
      let visible = 0;

      cards.forEach((card, i) => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          card.classList.remove('note-hidden');
          // Staggered re-reveal
          card.style.transitionDelay = `${visible * 0.06}s`;
          // Force reflow for re-animation
          card.classList.remove('active');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.classList.add('active');
            });
          });
          visible++;
        } else {
          card.classList.add('note-hidden');
          card.style.transitionDelay = '0s';
        }
      });

      if (countEl) countEl.textContent = visible;
    });
  });
}

// ── Scroll Reveal for cards ───────────────────────────────────

function initCardReveal() {
  const cards = document.querySelectorAll('.note-card.reveal');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  cards.forEach(card => observer.observe(card));
}

// ── Full Page View ────────────────────────────────────────────

function openNote(id) {
  const note = noteData.find(n => n.id === id);
  if (!note) return;

  const fp = document.getElementById('note-fullpage');
  const fpTitle = document.getElementById('fp-title');
  const fpType = document.getElementById('fp-type');
  const fpTag = document.getElementById('fp-tag');
  const fpMeta = document.getElementById('fp-meta');
  const fpBody = document.getElementById('fp-body');

  if (!fp) return;

  fpTitle.textContent = note.title;
  fpType.textContent = note.type;
  fpTag.textContent = note.tag;
  // Apply tag colour class
  fpTag.className = 'fp-tag-label ' + note.tagClass;
  fpMeta.textContent = note.date + ' · ' + note.readTime;
  fpBody.innerHTML = note.body
    .split('\n\n')
    .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
    .join('');

  fp.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  // Scroll full-page to top
  fp.scrollTop = 0;
}

function closeNote() {
  const fp = document.getElementById('note-fullpage');
  if (!fp) return;
  fp.classList.add('hidden');
  document.body.style.overflow = '';
}

function initNotesCardClick() {
  const cards = document.querySelectorAll('.note-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id, 10);
      openNote(id);
    });
  });

  const closeBtn = document.getElementById('fp-close');
  const overlay = document.getElementById('note-fp-overlay');
  if (closeBtn) closeBtn.addEventListener('click', closeNote);
  if (overlay) overlay.addEventListener('click', closeNote);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNote();
  });
}

// ── Notes Scroll Progress ─────────────────────────────────────

function initNotesScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = docHeight > 0 ? (scrollTop / docHeight) * 100 + '%' : '0%';
  }, { passive: true });
}

// ── Notes Sticky Nav ──────────────────────────────────────────

function initNotesStickyNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── Boot ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initNotesFilter();
  initCardReveal();
  initNotesCardClick();
  initNotesScrollProgress();
  initNotesStickyNav();
});
