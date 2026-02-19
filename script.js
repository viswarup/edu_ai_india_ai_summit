/* ═══════════════════════════════════════════════
   Edu AI — Interactive Scripts
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. Navbar scroll effect ───
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ─── 2. Mobile hamburger menu ───
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ─── 3. Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── 4. Fade-in on scroll (Intersection Observer) ───
  const fadeTargets = document.querySelectorAll(
    '.card, .why-item, .cohort-item, .syllabus-item, .contact-card, .why-quote, .form-embed'
  );

  fadeTargets.forEach(el => el.classList.add('fade-in'));

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeTargets.forEach(el => observer.observe(el));

});
