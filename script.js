document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("primary-menu");
  const navAnchors = navLinks ? navLinks.querySelectorAll("a") : [];
  const faqButtons = document.querySelectorAll(".faq-question");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile menu management
  const setMenuState = (isOpen) => {
    if (!hamburger || !navLinks) return;
    hamburger.classList.toggle("active", isOpen);
    navLinks.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  };

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      setMenuState(!isExpanded);
    });

    navAnchors.forEach((link) => {
      link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (
        navLinks.classList.contains("active") &&
        target instanceof Node &&
        !navLinks.contains(target) &&
        !hamburger.contains(target)
      ) {
        setMenuState(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenuState(false);
      }
    });
  }

  // Sticky Navbar Scroll Behavior
  const handleScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Smooth Scrolling for internal hash links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });

  // Accordion FAQ Handling (Single-open pattern)
  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = button.getAttribute("aria-expanded") === "true";

      faqButtons.forEach((otherButton) => {
        otherButton.setAttribute("aria-expanded", "false");
        otherButton.closest(".faq-item")?.classList.remove("open");
      });

      if (!isOpen && item) {
        button.setAttribute("aria-expanded", "true");
        item.classList.add("open");
      }
    });
  });

  // Intersection Observer for Smooth Fade-in Animations
  if (!prefersReducedMotion) {
    const fadeTargets = document.querySelectorAll(
      ".journey-card, .feature-pill, .capstone-card-dark, .audience-card-light, .skill-card, .instructor-card, .poster-pricing-banner, .faq-item, .m-feat-item, .table-responsive"
    );

    fadeTargets.forEach((element) => element.classList.add("fade-in"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    fadeTargets.forEach((element) => observer.observe(element));
  }
});
