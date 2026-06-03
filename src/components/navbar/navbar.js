// Navbar behaviour: language switch, burger menu, smooth-scroll nav links.
import { state, saveAllowed } from '../../core/state.js';
import { renderLang, setLang } from '../../core/i18n.js';
import { scrollToId, scrollToTop } from '../../core/scroll.js';

let onLangChange = null;
// Allow other modules (cookie) to react to a language change.
export function setLangChangeHandler(fn) { onLangChange = fn; }

export function closeMenu() {
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  burger && burger.classList.remove('open');
  navLinks && navLinks.classList.remove('open');
}

export function initNavbar() {
  const langSwitch = document.getElementById('langSwitch');
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  // language toggle
  langSwitch.querySelectorAll('.opt').forEach((o) =>
    o.addEventListener('click', () => {
      setLang(o.dataset.lang, (lang) => {
        langSwitch.classList.toggle('nl', lang === 'nl');
        langSwitch.querySelectorAll('.opt').forEach((x) => x.classList.toggle('active', x.dataset.lang === lang));
        if (onLangChange) onLangChange(lang);
      });
    })
  );

  // burger menu
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // in-page nav links
  document.querySelectorAll('[data-scroll]').forEach((a) => {
    a.style.cursor = 'pointer';
    a.addEventListener('click', (e) => { e.preventDefault(); closeMenu(); scrollToId(a.dataset.scroll); });
  });
  document.querySelectorAll('[data-link-top]').forEach((el) => {
    el.addEventListener('click', () => { closeMenu(); scrollToTop(); });
  });
}

// Programmatic language change used at init (keeps the switch UI in sync).
export function applyLangUI(lang) {
  const langSwitch = document.getElementById('langSwitch');
  if (lang === state.lang) { renderLang(lang, false); return; }
  setLang(lang, (l) => {
    langSwitch.classList.toggle('nl', l === 'nl');
    langSwitch.querySelectorAll('.opt').forEach((x) => x.classList.toggle('active', x.dataset.lang === l));
    if (onLangChange) onLangChange(l);
  });
}
