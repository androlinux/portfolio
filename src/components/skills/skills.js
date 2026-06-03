// Skills: animate language proficiency bars when they scroll into view.
export function initSkillBars() {
  const barIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((x) => {
        if (x.isIntersecting) {
          x.target.style.width = x.target.dataset.w + '%';
          barIO.unobserve(x.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll('.bar i').forEach((b) => barIO.observe(b));
}
