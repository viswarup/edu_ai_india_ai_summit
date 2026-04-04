document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("primary-menu");
  const navAnchors = navLinks ? navLinks.querySelectorAll("a") : [];
  const faqButtons = document.querySelectorAll(".faq-question");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setMenuState = (isOpen) => {
    if (!hamburger || !navLinks) return;

    hamburger.classList.toggle("active", isOpen);
    navLinks.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  };

  const handleScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 32);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

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

  if (!prefersReducedMotion) {
    const fadeTargets = document.querySelectorAll(
      ".feature-card, .card, .outcome-item, .outcomes-panel, .mentor-card, .cohort-item, .syllabus-item, .pricing-card, .faq-item, .blog-card, .contact-card, .mini-card"
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
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    fadeTargets.forEach((element) => observer.observe(element));
  }
});
