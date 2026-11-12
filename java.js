document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const body = document.body;
  const nav = document.getElementById("mainNav");
  const menuToggle = document.getElementById("menuToggle");
  const logoButton = document.getElementById("logoButton");
  const halloweenButton = document.getElementById("accessibilityToggle");

  // =========================
  // MOBILES MENÜ
  // =========================

  function setMenu(open) {
    if (!nav || !menuToggle) return;

    nav.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");

    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars", !open);
      icon.classList.toggle("fa-times", open);
    }
  }

  const isMenuOpen = () => !!nav && nav.classList.contains("active");

  if (nav && menuToggle) {
    menuToggle.addEventListener("click", () => setMenu(!isMenuOpen()));

    // Logo öffnet/schließt ebenfalls das Menü
    if (logoButton) {
      logoButton.addEventListener("click", () => setMenu(!isMenuOpen()));
    }

    // Menü schließen: Klick auf Link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    // Menü schließen: Klick außerhalb
    document.addEventListener("click", (event) => {
      if (!isMenuOpen()) return;
      const clickedInside =
        nav.contains(event.target) ||
        menuToggle.contains(event.target) ||
        (logoButton && logoButton.contains(event.target));
      if (!clickedInside) setMenu(false);
    });

    // Menü schließen: Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isMenuOpen()) {
        setMenu(false);
        menuToggle.focus();
      }
    });

    // Menü zurücksetzen, wenn das Fenster wieder groß wird
    window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
      if (e.matches) setMenu(false);
    });
  }

  // =========================
  // SCROLL-ANIMATION
  // =========================

  const sections = document.querySelectorAll(".section");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    sections.forEach((section) => {
      section.classList.add("reveal");
      observer.observe(section);
    });
  }
});