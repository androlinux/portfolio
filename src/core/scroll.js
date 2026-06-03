// Shared scroll helpers used by navbar links and the back-to-top button.
export function navHeight() {
  return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 74;
}

// Smooth-scroll to a section id, offsetting for the fixed navbar.
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - navHeight() + 1;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
