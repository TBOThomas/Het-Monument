const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const brandSlider = document.querySelector("[data-brand-slider]");

if (brandSlider) {
  const track = brandSlider.querySelector("[data-brand-track]");
  const prevButton = brandSlider.querySelector("[data-brand-prev]");
  const nextButton = brandSlider.querySelector("[data-brand-next]");
  let autoTimer = null;

  const getScrollAmount = () => {
    const item = track.querySelector(".brand-item");
    if (!item) {
      return 200;
    }
    const gap = parseFloat(getComputedStyle(track).gap || "0");
    return item.getBoundingClientRect().width + gap;
  };

  const scrollNext = () => {
    const amount = getScrollAmount();
    const maxScroll = track.scrollWidth - track.clientWidth - 1;
    if (track.scrollLeft >= maxScroll) {
      track.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  const scrollPrev = () => {
    const amount = getScrollAmount();
    if (track.scrollLeft <= 0) {
      track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
      return;
    }
    track.scrollBy({ left: -amount, behavior: "smooth" });
  };

  const stopAuto = () => {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  };

  const startAuto = () => {
    stopAuto();
    autoTimer = setInterval(scrollNext, 3500);
  };

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      stopAuto();
      scrollPrev();
      startAuto();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      stopAuto();
      scrollNext();
      startAuto();
    });
  }

  track.addEventListener("pointerenter", stopAuto);
  track.addEventListener("pointerleave", startAuto);

  startAuto();
}
