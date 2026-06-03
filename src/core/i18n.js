// Internationalisation: render all [data-i18n] nodes for the active language.
import { state, saveAllowed } from './state.js';

// Re-render every translatable node. `withFade` does the soft cross-fade.
export function renderLang(lang, withFade) {
  const apply = () => {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const k = el.dataset.i18n;
      if (state.DATA[lang][k] !== undefined) {
        if (k === 'logo') el.innerHTML = state.DATA[lang][k].replace('.', '<span>.</span>');
        else el.textContent = state.DATA[lang][k];
      }
    });
    document.documentElement.lang = lang;
  };
  if (withFade) {
    document.body.classList.add('lang-fading');
    setTimeout(() => {
      apply();
      document.body.classList.remove('lang-fading');
    }, 350);
  } else {
    apply();
  }
}

// Switch language (called by the navbar toggle). onAfter lets the navbar
// refresh dependent UI (e.g. cookie status text) without a circular import.
export function setLang(lang, onAfter) {
  if (lang === state.lang) return;
  state.lang = lang;
  renderLang(lang, true);
  if (typeof onAfter === 'function') onAfter(lang);
  if (saveAllowed()) localStorage.setItem('myrat_lang', lang);
}
