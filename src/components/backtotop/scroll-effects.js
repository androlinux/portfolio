// Scroll-driven UI: progress bar, navbar state, active link, back-to-top.
// One rAF-throttled listener keeps it smooth.
import { scrollToTop } from '../../core/scroll.js';

export function initScrollEffects() {
  const nav = document.getElementById('nav');
  const progress = document.getElementById('progress');
  const toTop = document.getElementById('toTop');
  const sections = ['profile', 'projects', 'experience', 'skills', 'contact'];
  const navLinkEls = [].slice.call(document.querySelectorAll('.nav-links a'));

  let ticking = false;
  let lastY = -1;
  const readNavH = () => parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 74;
  let navH = readNavH();
  window.addEventListener('resize', () => { navH = readNavH(); }, { passive: true });

  function render() {
    ticking = false;
    const st = window.pageYOffset;
    if (st === lastY) return;
    lastY = st;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (st / h) * 100 : 0) + '%';
    nav.classList.toggle('scrolled', st > 30);
    toTop.classList.toggle('show', st > 500);
    let cur = '';
    for (let i = 0; i < sections.length; i++) {
      const el = document.getElementById(sections[i]);
      if (el && el.getBoundingClientRect().top <= navH + 80) cur = sections[i];
    }
    for (let i = 0; i < navLinkEls.length; i++) {
      navLinkEls[i].classList.toggle('active', navLinkEls[i].dataset.scroll === cur);
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(render); } }

  window.addEventListener('scroll', onScroll, { passive: true });
  toTop.addEventListener('click', scrollToTop);
  onScroll();
}

// Reveal-on-scroll for [.reveal] elements.
export function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((x) => {
        if (x.isIntersecting) {
          const t = x.target;
          t.classList.add('show');
          io.unobserve(t);
          setTimeout(() => t.classList.add('done'), 1000);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 3 * 0.08) + 's';
    io.observe(el);
  });
}
