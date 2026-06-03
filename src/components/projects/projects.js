// Projects + contact links: wire hrefs from state.LINKS, hide "visit" on '#'.
import { state } from '../../core/state.js';

export function applyLinks() {
  const L = state.LINKS;
  const phone = document.getElementById('phoneLink');
  const email = document.getElementById('emailLink');
  const insta = document.getElementById('instaLink');
  const tg = document.getElementById('tgLink');
  if (phone) phone.setAttribute('href', 'tel:' + L.__phone.replace(/\s/g, ''));
  if (email) email.setAttribute('href', 'mailto:' + L.__email);
  if (insta) insta.setAttribute('href', L.__insta);
  if (tg) tg.setAttribute('href', L.__tg);
  const linkedin = document.getElementById('linkedinLink');
  if (linkedin) linkedin.setAttribute('href', L.__linkedin || 'https://linkedin.com/in/');

  [['proj1', '__proj1'], ['proj2', '__proj2'], ['proj3', '__proj3']].forEach((p) => {
    const el = document.getElementById(p[0]);
    if (!el) return;
    const url = (L[p[1]] || '').trim();
    const go = el.querySelector('.card-go');
    if (!el.dataset.bound) {
      el.dataset.bound = '1';
      el.addEventListener('click', function (e) { if (this.getAttribute('href') === '#') e.preventDefault(); });
    }
    if (!url || url === '#') {
      el.setAttribute('href', '#');
      el.removeAttribute('target');
      el.style.cursor = 'default';
      if (go) go.style.display = 'none';
    } else {
      el.setAttribute('href', url);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
      el.style.cursor = 'pointer';
      if (go) go.style.display = 'inline-flex';
    }
  });
}
