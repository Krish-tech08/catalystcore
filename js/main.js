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

  var statsRail = document.querySelector(".studio-stats__rail");

  if (statsRail) {
    var gauges = Array.from(statsRail.querySelectorAll(".studio-stat")).map(function (stat) {
      return {
        target: Number(stat.dataset.target),
        minDigits: Number(stat.dataset.minDigits) || 0,
        value: stat.querySelector(".studio-stat__value"),
        arc: stat.querySelector(".studio-stat__arc"),
        trail: stat.querySelector(".studio-stat__trail"),
        indicator: stat.querySelector(".studio-stat__indicator")
      };
    });

    function formatStatValue(gauge) {
      return String(gauge.target).padStart(gauge.minDigits, "0");
    }

    function setGaugeProgress(gauge, progress) {
      gauge.arc.style.strokeDashoffset = String(100 - progress);
      gauge.trail.style.strokeDashoffset = String(9 - progress);

      var point = gauge.arc.getPointAtLength(
        gauge.arc.getTotalLength() * progress / 100
      );
      gauge.indicator.setAttribute("cx", point.x);
      gauge.indicator.setAttribute("cy", point.y);
      gauge.indicator.style.opacity = progress > 0 ? "1" : "0";
    }

    function showFinalStats() {
      gauges.forEach(function (gauge) {
        gauge.value.textContent = formatStatValue(gauge);
        setGaugeProgress(gauge, 100);
      });
    }

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      showFinalStats();
    } else {
      gauges.forEach(function (gauge) {
        gauge.value.textContent = "0";
        setGaugeProgress(gauge, 0);
      });

      var statsObserver = new IntersectionObserver(function (entries) {
        if (entries.some(function (entry) { return entry.isIntersecting; })) {
          statsObserver.disconnect();
          var startTime = null;
          var duration = 1800;

          function animateStats(timestamp) {
            if (startTime === null) startTime = timestamp;
            var linearProgress = Math.min((timestamp - startTime) / duration, 1);
            var easedProgress = 1 - Math.pow(1 - linearProgress, 3);

            gauges.forEach(function (gauge) {
              var progress = easedProgress * 100;
              gauge.value.textContent = String(Math.round(gauge.target * easedProgress));
              setGaugeProgress(gauge, progress);
            });

            if (linearProgress < 1) {
              window.requestAnimationFrame(animateStats);
            } else {
              gauges.forEach(function (gauge) {
                gauge.value.textContent = formatStatValue(gauge);
                setGaugeProgress(gauge, 100);
              });
            }
          }

          window.requestAnimationFrame(animateStats);
        }
      }, { threshold: 0.2 });

      statsObserver.observe(statsRail);
    }
  }

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

