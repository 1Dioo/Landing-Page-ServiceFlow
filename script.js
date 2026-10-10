"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector("#menuToggle");
  const navigation = document.querySelector("#navigation");
  const backToTop = document.querySelector("#backToTop");
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  function renderIcons() {
    if (
      window.lucide &&
      typeof window.lucide.createIcons === "function"
    ) {
      window.lucide.createIcons();
    }
  }

  renderIcons();

  function setMenuState(isOpen) {
    if (!menuToggle || !navigation) return;

    navigation.classList.toggle("open", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu" : "Abrir menu"
    );

    document.body.classList.toggle("menu-open", isOpen);

    const icon = menuToggle.querySelector("i");

    if (icon) {
      icon.setAttribute(
        "data-lucide",
        isOpen ? "x" : "menu"
      );

      renderIcons();
    }
  }

  function closeMenu() {
    setMenuState(false);
  }

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") !== "true";

      setMenuState(isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 780) {
        closeMenu();
      }
    });
  }

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    revealItems.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealItems.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  function updateBackToTop() {
    if (!backToTop) return;

    backToTop.classList.toggle(
      "visible",
      window.scrollY > 500
    );
  }

  if (backToTop) {
    window.addEventListener("scroll", updateBackToTop, {
      passive: true
    });

    backToTop.addEventListener("click", () => {
      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    });

    updateBackToTop();
  }
});
