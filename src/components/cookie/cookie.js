// Cookie consent bar + legal modals (privacy / imprint / cookie settings).
import { state, CONSENT, STORAGE, consentGiven, showToast } from '../../core/state.js';
import { LEGAL } from '../../data/legal.js';

export function acceptConsent() {
  try {
    localStorage.setItem(CONSENT, 'accepted');
    const pl = { DATA: state.DATA, LINKS: state.LINKS };
    // PHOTO persisted by core.persist elsewhere; mirror minimal save here
    localStorage.setItem(STORAGE, JSON.stringify(pl));
    localStorage.setItem('myrat_lang', state.lang);
  } catch (e) {}
  const cookie = document.getElementById('cookie');
  if (cookie) cookie.classList.remove('show');
}

export function declineConsent() {
  try {
    localStorage.removeItem(CONSENT);
    localStorage.removeItem(STORAGE);
    localStorage.removeItem('myrat_lang');
  } catch (e) {}
  const cookie = document.getElementById('cookie');
  if (cookie) cookie.classList.remove('show');
}

export function setConsentStatusText() {
  const txt = consentGiven()
    ? (state.lang === 'nl' ? 'Geaccepteerd' : 'Accepted')
    : (state.lang === 'nl' ? 'Niet geaccepteerd (alleen tijdelijk)' : 'Not accepted (session only)');
  document.querySelectorAll('#consentStatus').forEach((el) => (el.textContent = txt));
}

export function initCookie() {
  const cookie = document.getElementById('cookie');
  document.getElementById('cookieAccept').addEventListener('click', acceptConsent);
  document.getElementById('cookieDecline').addEventListener('click', declineConsent);
  // show bar after a beat if no choice stored yet
  if (!localStorage.getItem(CONSENT)) setTimeout(() => cookie.classList.add('show'), 900);
}

export function initModals(closeAdmin) {
  const modalWrap = document.getElementById('modalWrap');
  const modalBody = document.getElementById('modalBody');

  function openModal(type) {
    if (state.DATA[state.lang] && state.DATA[state.lang][type] !== undefined) {
      modalBody.innerHTML = state.DATA[state.lang][type];
    } else if (LEGAL[state.lang] && LEGAL[state.lang][type] !== undefined) {
      modalBody.innerHTML = LEGAL[state.lang][type];
    } else {
      modalBody.innerHTML = '';
    }
    const ph = 'tel:' + state.LINKS.__phone.replace(/\s/g, '');
    const em = 'mailto:' + state.LINKS.__email;
    ['lgEmail', 'lgEmail2', 'lgEmail3'].forEach((id) => {
      const a = modalBody.querySelector('#' + id);
      if (a) { a.href = em; a.textContent = state.LINKS.__email; }
    });
    const p = modalBody.querySelector('#lgPhone');
    if (p) { p.href = ph; p.textContent = state.LINKS.__phone; }
    if (type === 'cookies') {
      setConsentStatusText();
      const ma = modalBody.querySelector('#mAccept');
      const md = modalBody.querySelector('#mDecline');
      if (ma) ma.addEventListener('click', () => { acceptConsent(); setConsentStatusText(); });
      if (md) md.addEventListener('click', () => { declineConsent(); setConsentStatusText(); });
    }
    modalWrap.classList.add('show');
    document.body.classList.add('locked');
  }
  function closeModal() {
    modalWrap.classList.remove('show');
    document.body.classList.remove('locked');
  }

  document.querySelectorAll('[data-modal]').forEach((b) => b.addEventListener('click', () => openModal(b.dataset.modal)));
  document.querySelectorAll('[data-close-modal]').forEach((b) => b.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeModal(); if (closeAdmin) closeAdmin(); } });
}
