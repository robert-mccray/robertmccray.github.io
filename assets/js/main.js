/* =========================================================
   Scroll Progress Bar
   ========================================================= */
(function () {
  const bar = document.getElementById("progressBar");
  if (!bar) return;

  function setProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${pct}%`;
  }

  window.addEventListener("scroll", setProgress, { passive: true });
  window.addEventListener("resize", setProgress);
  setProgress();
})();

/* =========================================================
   Reveal-on-Scroll Animations
   ========================================================= */
(function () {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target); // reveal once (performance)
        }
      });
    },
    { threshold: 0.15 }
  );

  els.forEach((el) => io.observe(el));
})();

/* =========================================================
   ScrollSpy (Active Nav Highlighting)
   - Safe for index + subpages
   ========================================================= */
(function () {
  const sections = document.querySelectorAll(
    "header[id], section[id], footer[id]"
  );
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const linkMap = new Map();
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      linkMap.set(href.slice(1), link);
    }
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((a) => a.classList.remove("active"));

        const match = linkMap.get(entry.target.id);
        if (match) match.classList.add("active");
      });
    },
    {
      rootMargin: "-30% 0px -55% 0px",
      threshold: 0.01,
    }
  );

  sections.forEach((sec) => io.observe(sec));
})();

/* =========================================================
   Modal System
   ========================================================= */
(function () {
  const openButtons = document.querySelectorAll("[data-modal]");
  const modals = document.querySelectorAll(".modal");
  if (!modals.length) return;

  let lastFocusedElement = null;

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    lastFocusedElement = document.activeElement;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const focusable = modal.querySelector(
      "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])"
    );
    if (focusable) focusable.focus();
  }

  function closeModal(modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (lastFocusedElement) lastFocusedElement.focus();
  }

  openButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(btn.getAttribute("data-modal"));
    });
  });

  modals.forEach((modal) => {
    modal.querySelectorAll("[data-close]").forEach((el) => {
      el.addEventListener("click", () => closeModal(modal));
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    modals.forEach((m) => {
      if (m.classList.contains("open")) closeModal(m);
    });
  });
})();
