const navToggle = document.getElementById("nav_toggle");
const siteNav = document.getElementById("site_nav");
const toTopButton = document.getElementById("to_top");
const backToTopThreshold = 400;
const revealThreshold = 0.15;

function toggleNavigation() {
  if (!navToggle || !siteNav) {
    return;
  }
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeNavigation() {
  if (!navToggle || !siteNav) {
    return;
  }
  siteNav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

function updateToTopVisibility() {
  if (!toTopButton) {
    return;
  }
  toTopButton.classList.toggle("show", window.scrollY > backToTopThreshold);
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function revealElement(entry, observer) {
  if (!entry.isIntersecting) {
    return;
  }
  entry.target.classList.add("in");
  observer.unobserve(entry.target);
}

function createRevealObserver() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("in");
    });
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        revealElement(entry, observer);
      });
    },
    { threshold: revealThreshold }
  );
  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

if (navToggle) {
  navToggle.addEventListener("click", toggleNavigation);
}

if (siteNav) {
  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });
}

if (toTopButton) {
  toTopButton.addEventListener("click", scrollToTop);
}

window.addEventListener("scroll", updateToTopVisibility, { passive: true });

createRevealObserver();
updateToTopVisibility();