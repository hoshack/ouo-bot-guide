/* ─── Particles Generation ─── */
(function () {
  const container = document.getElementById('particles');
  const colors = ['#7c3aed', '#06b6d4', '#4f46e5', '#9d5ff3', '#22d3ee'];
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 8;
    const delay = Math.random() * 10;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      background:${color};
      left:${left}%;
      bottom:0;
      animation-duration:${duration}s;
      animation-delay:${delay}s;
      box-shadow: 0 0 ${size * 3}px ${color};
    `;
    container.appendChild(p);
  }
})();

/* ─── Header scroll effect ─── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}, { passive: true });

/* ─── Smooth nav links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── Code tab switching ─── */
function switchTab(lang) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.getElementById('tab-' + lang).classList.add('active');
  document.getElementById('content-' + lang).classList.add('active');
}

/* ─── Copy code ─── */
function copyCode(id) {
  const el = document.getElementById(id);
  const text = el.innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = el.closest('.code-block').querySelector('.copy-btn');
    const original = btn.innerHTML;
    btn.innerHTML = '✅ Copied!';
    btn.style.background = 'rgba(16,185,129,0.2)';
    btn.style.borderColor = 'rgba(16,185,129,0.4)';
    btn.style.color = '#34d399';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
    }, 2000);
  });
}

/* ─── FAQ toggle ─── */
function toggleFaq(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

/* ─── Reveal on scroll ─── */
const revealEls = document.querySelectorAll(
  '.card, .step, .faq-item, .reward-card, .section-header, .hero-stats'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

/* ─── Animated counter ─── */
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, 20);
}

/* ─── Active nav highlight ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 150) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = '';
    link.style.background = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#e2e8f0';
      link.style.background = 'rgba(255,255,255,0.07)';
    }
  });
}, { passive: true });

/* ─── Flow diagram animated arrows ─── */
(function () {
  const lines = document.querySelectorAll('.arrow-line');
  lines.forEach((line, i) => {
    line.style.animation = `arrowFlow 1.5s ease-in-out ${i * 0.3}s infinite`;
  });
  const style = document.createElement('style');
  style.textContent = `
    @keyframes arrowFlow {
      0%   { opacity: 0.5; }
      50%  { opacity: 1; box-shadow: 0 0 8px rgba(6,182,212,0.6); }
      100% { opacity: 0.5; }
    }
  `;
  document.head.appendChild(style);
})();

/* ─── Typing effect for hero title ─── */
(function () {
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;
  badge.style.opacity = '0';
  badge.style.transform = 'translateY(10px)';
  setTimeout(() => {
    badge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    badge.style.opacity = '1';
    badge.style.transform = 'translateY(0)';
  }, 300);
})();

console.log('%c🤖 OUOBot Guide loaded!', 'color:#7c3aed;font-size:16px;font-weight:bold;');
