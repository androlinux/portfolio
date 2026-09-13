// Admin panel: hidden, opens via Ctrl+Shift+A with login screen.
import { state, persist, saveAllowed, showToast, STORAGE } from '../../core/state.js';
import { renderLang } from '../../core/i18n.js';
import { applyLinks } from '../projects/projects.js';
import { applyPhoto, processPhotoFile } from '../hero/hero.js';
import { DEFAULT_PHOTO } from '../../data/photo.js';

async function getSupabase() {
  return (await import('../../core/supabase.js')).supabase;
}

// Credentials key
const AL_KEY  = 'admin_auth';

function isAuthed() {
  try { return sessionStorage.getItem(AL_KEY) === '1'; } catch(e) { return false; }
}

const fieldGroups = [
  { title: 'Navigation',        keys: ['logo','nav1','nav2','nav3','nav4','nav5'] },
  { title: 'Hero',              keys: ['eyebrow','heroName1','heroName2','heroRole','heroBtn1','heroBtn2','downloadCV','badge'] },
  { title: 'Profile',           keys: ['profileNum','profileTitle','profileText'] },
  { title: 'Projects',          keys: ['projectsNum','projectsTitle','p1tag','p1title','p1text','p1details','p2tag','p2title','p2text','p2details','p3tag','p3title','p3text','p3details','liveDemo','projectDetails'] },
  { title: 'Experience & Education', keys: ['expNum','expTitle','e1when','e1title','e1l1','e1l2','e1l3','e1l4','e1l5','e1l6','e2when','e2title','e2l1','e2l2','e2l3','e3when','e3title','e3l1','e4when','e4title','e4l1','e4l2','e4l3','e4l4','e4l5','eduTitle','eduSchool','eduDegree','eduYears'] },
  { title: 'Skills & languages',keys: ['skillsNum','skillsTitle','skillsSub1','skillsSub2','sdp1','sdp2','sdp3','sdp4','sdp5','sdp6','sdp7','sit1','sit2','sit3','sit4','sit5','sit6','sit7','sit8','langSub','l1n','l1v','l2n','l2v','l3n','l3v','l4n','l4v','l5n','l5v'] },
  { title: 'Contact',           keys: ['contactNum','contactTitle','contactSub','phoneLabel','phoneText','emailLabel','emailText','footer'] },
  { title: 'Legal (footer)',    keys: ['footPrivacy','footImprint','footCookies','cookieText','cookieAccept','cookieDecline'] },
];
const longFields = ['heroRole','profileText','p1text','p2text','p3text','p1details','p2details','p3details','cookieText'];

function buildAdmin() {
  ['en','nl'].forEach((lang) => {
    const pane = document.getElementById('pane-' + lang);
    pane.innerHTML = '';
    fieldGroups.forEach((g) => {
      const grp = document.createElement('div');
      grp.className = 'admin-group';
      grp.innerHTML = '<strong>' + g.title + '</strong>';
      g.keys.forEach((key) => {
        const val = state.DATA[lang][key] || '';
        const f = document.createElement('div'); f.className = 'field';
        const safe = String(val).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
        const input = longFields.includes(key)
          ? '<textarea data-lang="'+lang+'" data-key="'+key+'" rows="4">'+safe+'</textarea>'
          : '<input data-lang="'+lang+'" data-key="'+key+'" value="'+safe+'">';
        f.innerHTML = '<label>' + key + '</label>' + input;
        grp.appendChild(f);
      });
      pane.appendChild(grp);
    });
  });
  document.querySelectorAll('[data-link]').forEach((inp) => (inp.value = state.LINKS[inp.dataset.link] || ''));
}

async function save(closeFn) {
  document.querySelectorAll('[data-key][data-lang]').forEach((inp) => { state.DATA[inp.dataset.lang][inp.dataset.key] = inp.value; });
  document.querySelectorAll('[data-link]').forEach((inp) => { state.LINKS[inp.dataset.link] = inp.value; });
  renderLang(state.lang, false);
  applyLinks();
  applyPhoto();
  
  showToast('Saving to database...');
  const ok = await persist();
  if (ok) {
    showToast('Saved to database ✓');
  } else {
    showToast('Failed to save. Are you logged in?');
  }
  closeFn();
}

export function initAdmin() {
  const panel   = document.getElementById('adminPanel');
  const overlay = document.getElementById('overlay');
  const loginEl = document.getElementById('adminLogin');

  function showLogin() {
    document.getElementById('alUser').value = '';
    document.getElementById('alPass').value = '';
    document.getElementById('alErr').classList.remove('show');
    loginEl.classList.remove('hidden');
  }
  function hideLogin() { loginEl.classList.add('hidden'); }

  function openAdmin() {
    panel.classList.add('open');
    overlay.classList.add('show');
    if (isAuthed()) {
      hideLogin();
      buildAdmin();
      const pv = document.getElementById('photoPreview');
      if (pv) pv.src = state.PHOTO;
    } else {
      showLogin();
    }
  }
  function closeAdmin() {
    panel.classList.remove('open');
    overlay.classList.remove('show');
  }

  // Login submit
  document.getElementById('alSubmit').addEventListener('click', async () => {
    const u = document.getElementById('alUser').value.trim();
    const p = document.getElementById('alPass').value;
    
    const btn = document.getElementById('alSubmit');
    const oldText = btn.textContent;
    btn.textContent = 'Logging in...';
    btn.disabled = true;
    
    // Direct admin login: allow any non-empty username and password
    if (u.length > 0 && p.length > 0) {
      try { sessionStorage.setItem(AL_KEY, '1'); } catch(e) {}
      hideLogin();
      buildAdmin();
      const pv = document.getElementById('photoPreview');
      if (pv) pv.src = state.PHOTO;
      btn.textContent = oldText;
      btn.disabled = false;
      return;
    }

    document.getElementById('alErr').textContent = 'Please enter your login and password';
    document.getElementById('alErr').classList.add('show');
    btn.textContent = oldText;
    btn.disabled = false;
  });
  document.getElementById('alUser').addEventListener('keydown', (e) => { if (e.key === 'Enter') document.getElementById('alPass').focus(); });
  document.getElementById('alPass').addEventListener('keydown', (e) => { if (e.key === 'Enter') document.getElementById('alSubmit').click(); });

  // Panel controls
  document.getElementById('adminClose').addEventListener('click', closeAdmin);
  overlay.addEventListener('click', closeAdmin);
  document.getElementById('saveBtn').addEventListener('click', () => save(closeAdmin));

  // Photo upload
  document.getElementById('photoPickBtn').addEventListener('click', () => document.getElementById('photoInput').click());
  document.getElementById('photoInput').addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0]; if (!f) return;
    processPhotoFile(f, (dataUrl) => { state.PHOTO = dataUrl; applyPhoto(); showToast('Photo updated — press Save'); });
    e.target.value = '';
  });
  document.getElementById('photoResetBtn').addEventListener('click', () => {
    state.PHOTO = DEFAULT_PHOTO; applyPhoto(); showToast('Default photo restored — press Save');
  });

  // Reset all
  document.getElementById('resetBtn').addEventListener('click', () => {
    try { localStorage.removeItem(STORAGE); } catch(e) {}
    location.reload();
  });

  // EN/NL tabs
  document.querySelectorAll('.admin-lang-tabs button').forEach((b) =>
    b.addEventListener('click', () => {
      document.querySelectorAll('.admin-lang-tabs button').forEach((x) => x.classList.remove('active'));
      document.querySelectorAll('.admin-pane').forEach((p) => p.classList.remove('active'));
      b.classList.add('active');
      document.getElementById('pane-' + b.dataset.pane).classList.add('active');
    })
  );

  // Hotkey Ctrl+Shift+A + Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeAdmin(); }
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      e.preventDefault();
      panel.classList.contains('open') ? closeAdmin() : openAdmin();
    }
  });

  return { closeAdmin };
}
