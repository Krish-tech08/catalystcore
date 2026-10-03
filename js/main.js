// CatalystCore Studios — shared site behavior
// Mobile nav toggle, plus a single restrained scroll-reveal pass.

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close mobile menu when a nav link is tapped
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal: elements fade/rise into place once, the first time
  // they enter the viewport. Skipped entirely for reduced-motion users.
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var hero = document.querySelector(".hero");
  var dotField = document.querySelector(".hero-dot-field");
  var hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (hero && dotField && hasFinePointer && !prefersReducedMotion) {
    var pointerFrame = 0;
    var pointerX = 0;
    var pointerY = 0;
    var pointerActive = false;

    function updateDotField() {
      pointerFrame = 0;
      if (!pointerActive) return;

      dotField.style.setProperty("--dot-x", pointerX + "px");
      dotField.style.setProperty("--dot-y", pointerY + "px");
      dotField.classList.add("is-active");
    }

    function deactivateDotField() {
      pointerActive = false;
      if (pointerFrame) {
        window.cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
      }
      dotField.classList.remove("is-active");
    }

    hero.addEventListener("pointermove", function (event) {
      if (
        event.pointerType === "touch" ||
        (event.target.closest && event.target.closest(".hero__copy, .hero__visual"))
      ) {
        deactivateDotField();
        return;
      }

      var bounds = hero.getBoundingClientRect();
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
      pointerActive = true;

      if (!pointerFrame) {
        pointerFrame = window.requestAnimationFrame(updateDotField);
      }
    }, { passive: true });

    hero.addEventListener("pointerleave", deactivateDotField);
  }

  var revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (entry.target.matches(".catalog-page .grid--apps > .app-card:nth-child(2).reveal")) {
            window.setTimeout(function () {
              entry.target.classList.add("is-visible");
            }, 70);
          } else {
            entry.target.classList.add("is-visible");
          }

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
});


document.querySelectorAll(".app-card[data-link]").forEach((card) => {
  card.addEventListener("click", (event) => {
    // Don't redirect when clicking an existing button/link
    if (event.target.closest("a, button")) return;

    window.location.href = card.dataset.link;
  });

  // Allow keyboard users to open the card
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      card.click();
    }
  });
});

