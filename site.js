// Agentopia preview page. No dependencies, no tracking.
(() => {
  'use strict';

  // Looping videos play only while visible, and not at all if the visitor prefers reduced motion.
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loops = Array.from(document.querySelectorAll('video[data-loop]'));
  if (reduce) {
    loops.forEach(v => { v.removeAttribute('autoplay'); v.pause(); v.controls = true; });
  } else if ('IntersectionObserver' in window) {
    const watcher = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { const p = e.target.play(); if (p && p.catch) p.catch(() => {}); }
        else e.target.pause();
      });
    }, { threshold: 0.25 });
    loops.forEach(v => watcher.observe(v));
  }

})();
