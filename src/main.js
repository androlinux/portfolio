// ─────────────────────────────────────────────────────────────
//  Myrat Daniyarov — Portfolio
//  Entry point: imports every component's styles + behaviour and
//  wires them together once the DOM is ready.
// ─────────────────────────────────────────────────────────────

// styles (order matters: base first, then components)
import './styles/base.css';
import './components/navbar/navbar.css';
import './components/hero/hero.css';
import './components/profile/profile.css';
import './components/projects/projects.css';
import './components/experience/experience.css';
import './components/skills/skills.css';
import './components/contact/contact.css';
import './components/footer/footer.css';
import './components/backtotop/backtotop.css';
import './components/admin/admin.css';
import './components/modal/modal.css';
import './components/cookie/cookie.css';
import './styles/print.css';

// core
import { state, loadSaved, CONSENT } from './core/state.js';
import { renderLang } from './core/i18n.js';

// components
import { initNavbar, applyLangUI, setLangChangeHandler } from './components/navbar/navbar.js';
import { applyLinks } from './components/projects/projects.js';
import { applyPhoto } from './components/hero/hero.js';
import { initSkillBars } from './components/skills/skills.js';
import { initAdmin } from './components/admin/admin.js';
import { initCookie, initModals, setConsentStatusText } from './components/cookie/cookie.js';
import { initScrollEffects, initReveal } from './components/backtotop/scroll-effects.js';

function boot() {
  // footer year
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // download CV button print handler
  const dlBtn = document.getElementById('downloadCVBtn');
  if (dlBtn) {
    dlBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // load saved edits into shared state
  loadSaved(() => {
    renderLang(state.lang, false);
    applyLinks();
    applyPhoto();
  });

  // wire components
  initNavbar();
  setLangChangeHandler(() => setConsentStatusText());
  const { closeAdmin } = initAdmin();
  initCookie();
  initModals(closeAdmin);
  initSkillBars();
  initReveal();
  initScrollEffects();

  // decide initial language (URL param, then saved pref, else Dutch browsers default to NL)
  let lang = 'en';
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam === 'en' || langParam === 'nl') {
      lang = langParam;
      localStorage.setItem('myrat_lang', lang);
    } else {
      const saved = localStorage.getItem('myrat_lang'); 
      if (saved) lang = saved;
      else if ((navigator.language || '').toLowerCase().startsWith('nl')) lang = 'nl';
    }
  } catch (e) {}

  state.lang = 'en';
  renderLang('en', false);
  if (lang !== 'en') applyLangUI(lang); else renderLang('en', false);

  applyLinks();
  applyPhoto();
  setConsentStatusText();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
