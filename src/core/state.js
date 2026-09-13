// Shared application state + persistence helpers.
// All components import from here so they read/write the same data.
import { DEFAULTS } from '../data/translations.js';
import { LINK_DEFAULTS } from '../data/links.js';
import { DEFAULT_PHOTO } from '../data/photo.js';

let supabaseInstance = null;
async function getSupabase() {
  if (!supabaseInstance) {
    supabaseInstance = (await import('./supabase.js')).supabase;
  }
  return supabaseInstance;
}

export const STORAGE = 'myrat_portfolio_v4';
export const CONSENT = 'myrat_cookie_consent';

// mutable state — kept on a single object so imports stay live
export const state = {
  lang: 'en',
  DATA: JSON.parse(JSON.stringify(DEFAULTS)),
  LINKS: { ...LINK_DEFAULTS },
  PHOTO: DEFAULT_PHOTO,
};

export function consentGiven() {
  return localStorage.getItem(CONSENT) === 'accepted';
}
export function saveAllowed() {
  return consentGiven();
}

// Load any previously saved edits from localStorage into state, then fetch from Supabase.
export async function loadSaved(onUpdate) {
  // 1. Sync load from local cache as instant fallback/cache
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) {
      const p = JSON.parse(raw);
      if (p.DATA) {
        if (p.DATA.en) state.DATA.en = { ...DEFAULTS.en, ...p.DATA.en };
        if (p.DATA.nl) state.DATA.nl = { ...DEFAULTS.nl, ...p.DATA.nl };
      }
      if (p.LINKS) state.LINKS = Object.assign({}, LINK_DEFAULTS, p.LINKS);
      if (p.PHOTO) state.PHOTO = p.PHOTO;
    }
  } catch (e) {}

  // 2. Async load from Supabase via Native Fetch REST API!
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const response = await fetch(`${supabaseUrl}/rest/v1/portfolio_state?id=eq.1&select=*`, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const rows = await response.json();
      if (rows && rows.length > 0) {
        const row = rows[0];
        if (row.data) {
          if (row.data.en) state.DATA.en = { ...DEFAULTS.en, ...row.data.en };
          if (row.data.nl) state.DATA.nl = { ...DEFAULTS.nl, ...row.data.nl };
        }
        if (row.links) state.LINKS = Object.assign({}, LINK_DEFAULTS, row.links);
        if (row.photo) state.PHOTO = row.photo;
        
        // Update local storage cache (if consent given) to speed up next load
        if (saveAllowed()) {
          try {
            const payload = { DATA: state.DATA, LINKS: state.LINKS };
            if (state.PHOTO !== DEFAULT_PHOTO) payload.PHOTO = state.PHOTO;
            localStorage.setItem(STORAGE, JSON.stringify(payload));
          } catch (e) {}
        }

        if (typeof onUpdate === 'function') {
          onUpdate();
        }
      }
    } else {
      console.error('Failed to load from Supabase REST API:', response.statusText);
    }
  } catch (err) {
    console.error('Failed to load from Supabase:', err);
  }
}

// Persist current state to local storage and Supabase database. Returns true on success.
export async function persist() {
  // 1. Save to local storage cache if allowed
  if (saveAllowed()) {
    try {
      const payload = { DATA: state.DATA, LINKS: state.LINKS };
      if (state.PHOTO !== DEFAULT_PHOTO) payload.PHOTO = state.PHOTO;
      localStorage.setItem(STORAGE, JSON.stringify(payload));
    } catch (e) {}
  }

  // 2. Save to Supabase!
  try {
    const s = await getSupabase();
    const payload = {
      id: 1,
      data: state.DATA,
      links: state.LINKS,
      photo: state.PHOTO
    };

    const { error } = await s
      .from('portfolio_state')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.error('Failed to save to Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saving to Supabase:', err);
    return false;
  }
}

// Tiny toast helper (shared across components).
export function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}
