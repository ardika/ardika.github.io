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
  const rawPhrases = [
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
    // Domain-flavored capability lines
    'Replacing dangerous switches with Wi-Fi.',
    'Counting shoppers with computer vision.',
    'Tracking fleets in cellular dead zones.',
    'Synchronizing dual hydraulic rams.',
    'Holding precise temperatures with PID.',
    'Cutting steel with voltage feedback.',
    'Building cross-platform security clients.',
    'Engineering healthcare privacy pipelines.',
    'Logging IMU motion to the millisecond.',
    'Bridging BLE devices to Android apps.',
    'Rebranding open-source into shipped apps.',
    'Stitching multi-vendor sensors into one stream.',
    'Generating audit-ready reports at a click.',
    'Engineering radio links for off-grid sites.',
    // Skills + credibility
    'Drawing PCBs in KiCAD and Eagle.',
    'Speaking MQTT, SNMP, and raw TCP.',
    'Porting firmware across AVR, ARM, and ESP32.',
    'Top Rated Plus on Upwork.',
    '11K+ hours of shipped work.',
    'Showing up year after year for clients.',
    // Embedded & hardware
    'Designing custom PCBs from scratch.',
    'Squeezing performance from 8-bit MCUs.',
    'Reading sensors over noisy buses.',
    'Wiring up nine-axis IMU rigs.',
    'Hardening firmware for the field.',
    'Pushing telemetry over LoRa.',
    'Talking to motor controllers over CAN.',
    'Serializing sensor data to SD cards.',
    'Speaking Modbus to legacy PLCs.',
    'Reading datasheets so you don’t have to.',
    'Closing the loop with PID controllers.',
    'Bringing up boards from cold metal.',
    // Desktop & native
    'Shipping signed native installers.',
    'Building Qt UIs that don’t fight you.',
    'Writing C++ that doesn’t leak.',
    'Wrapping legacy DLLs in modern UIs.',
    'Replacing terminal commands with GUIs.',
    // Mobile
    'Shipping Android apps to the Play Store.',
    'Pairing phones to hardware over BLE.',
    'Building Flutter UIs that feel native.',
    'Hooking phones into MQTT brokers.',
    // Web & backend
    'Designing APIs that age well.',
    'Building admin panels engineers love.',
    'Wiring React UIs to Postgres backends.',
    'Shipping bilingual web platforms.',
    'Streaming live data into the browser.',
    'Writing FastAPI services that scale.',
    'Caching the right things at the edge.',
    'Speaking gRPC, WebSocket, and HTTP.',
    // AI / ML / computer vision
    'Running OpenCV on embedded boards.',
    'Wrapping ML models in production APIs.',
    'Tuning detectors for specific cameras.',
    'Stitching ML models into web apps.',
    'Detecting people, faces, and objects.',
    // Networking & security
    'Hardening clients with TLS.',
    'Wiring SSO into legacy desktop apps.',
    'Securing channels with mTLS.',
    'Auditing what crosses the network.',
    // Process & approach
    'Asking ‘why’ until the spec gets honest.',
    'Killing scope before scope kills the project.',
    'Reading code more than I write it.',
    'Saying no to features that don’t earn it.',
    'Writing tests because future-me will forget.',
    'Picking boring tools that ship.',
    'Refactoring as I go, not after.',
    'Shipping small. Shipping often.',
    // Outcomes
    'Saving operators from energized gear.',
    'Replacing spreadsheets with software.',
    'Bringing legacy hardware online.',
    'Making auditors happy without late nights.',
  ];

  // Greedy word-boundary wrap at a 26-char-per-line target. Joining with \n
  // means each character (including \n) is typed one step at a time, so the
  // cursor naturally jumps to a new line mid-phrase via white-space: pre-wrap.
  const wrapAt = (text, max) => {
    const words = text.split(' ');
    const lines = [];
    let line = '';
    for (const word of words) {
      if (!line) line = word;
      else if (line.length + 1 + word.length <= max) line += ' ' + word;
      else { lines.push(line); line = word; }
    }
    if (line) lines.push(line);
    return lines.join('\n');
  };
  const phrases = rawPhrases.map(p => wrapAt(p, 35));

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
