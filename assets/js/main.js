// Scroll progress bar
(function () {
  const bar = document.getElementById("progressBar");

  function setProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${pct}%`;
  }

  window.addEventListener("scroll", setProgress, { passive: true });
  window.addEventListener("resize", setProgress);
  setProgress();
})();

// Reveal on scroll
(function () {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.15 }
  );

  els.forEach((el) => io.observe(el));
})();

// ScrollSpy active nav links
(function () {
  const sections = document.querySelectorAll("header[id], section[id], footer[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((a) => a.classList.remove("active"));
        const match = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (match) match.classList.add("active");
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((sec) => io.observe(sec));
})();

// Modals
(function () {
  const openButtons = document.querySelectorAll("[data-modal]");
  const closeSelectors = "[data-close]";
  const modals = document.querySelectorAll(".modal");

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  openButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(btn.getAttribute("data-modal"));
    });
  });

  modals.forEach((modal) => {
    modal.querySelectorAll(closeSelectors).forEach((el) => {
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

