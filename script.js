// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle with persistence
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const stored = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const initial = stored || (prefersLight ? 'light' : 'dark');
if (initial === 'light') root.setAttribute('data-theme', 'light');

themeToggle.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';
  if (isLight) {
    root.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

// Nav border on scroll
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 8) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// Hero typing effect — rotates phrases describing what ardi builds
const typingEl = document.querySelector('.hero-title .typing-text');
if (typingEl) {
  const phrases = [
    'I build software from PCB to product.',
    'Delivering impactful landing pages.',
    'Shipping cross-platform desktop apps.',
    'Crafting firmware that survives the real world.',
    'Engineering Android apps that feel right.',
    'Designing embedded systems end-to-end.',
    'Wiring sensors to dashboards.',
    'Building beautiful interfaces for hard problems.',
    'Turning data into insight.',
    'Connecting devices to the cloud.',
    'Modernizing legacy desktop systems.',
    'Bringing hardware to life with software.',
  ];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    typingEl.textContent = phrases[0];
  } else {
    let pIdx = 0;
    let cIdx = 0;
    let mode = 'type'; // type | hold | delete | gap

    const tick = () => {
      const phrase = phrases[pIdx];
      if (mode === 'type') {
        cIdx++;
        typingEl.textContent = phrase.slice(0, cIdx);
        if (cIdx === phrase.length) {
          mode = 'hold';
          setTimeout(tick, 1700);
        } else {
          setTimeout(tick, 55 + Math.random() * 45);
        }
      } else if (mode === 'hold') {
        mode = 'delete';
        setTimeout(tick, 0);
      } else if (mode === 'delete') {
        cIdx--;
        typingEl.textContent = phrase.slice(0, cIdx);
        if (cIdx === 0) {
          mode = 'gap';
          setTimeout(tick, 220);
        } else {
          setTimeout(tick, 28);
        }
      } else if (mode === 'gap') {
        pIdx = (pIdx + 1) % phrases.length;
        mode = 'type';
        setTimeout(tick, 0);
      }
    };

    typingEl.textContent = '';
    tick();
  }
}

// Reveal-on-scroll
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('visible'));
}
