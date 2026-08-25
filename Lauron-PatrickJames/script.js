const header = document.getElementById("site_header");
const toTopButton = document.getElementById("to_top");
const navToggle = document.getElementById("nav_toggle");
const siteNav = document.getElementById("site_nav");
const contactForm = document.getElementById("contact_form");

const scrollHeaderThreshold = 40;
const backToTopThreshold = 500;
const revealThreshold = 0.15;
const revealRootMargin = "0px 0px -60px 0px";
const contactEmail = "pjameslauron@gmail.com";

function updateScrollState() {
  if (!header || !toTopButton) {
    return;
  }

  header.classList.toggle(
    "scrolled",
    window.scrollY > scrollHeaderThreshold
  );

  toTopButton.classList.toggle(
    "show",
    window.scrollY > backToTopThreshold
  );
}

function toggleNavigation() {
  if (!navToggle || !siteNav) {
    return;
  }

  const isOpen = siteNav.classList.toggle("open");

  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeNavigation() {
  if (!navToggle || !siteNav) {
    return;
  }

  siteNav.classList.remove("open");
  navToggle.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
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
    {
      threshold: revealThreshold,
      rootMargin: revealRootMargin
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

function handleContactSubmit(event) {
  event.preventDefault();

  if (!contactForm) {
    return;
  }

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const subject = encodeURIComponent(`Hello from ${name}`);
  const body = encodeURIComponent(
    `${message}\n\n— ${name} (${email})`
  );

  window.location.href =
    `mailto:${contactEmail}?subject=${subject}&body=${body}`;
}

window.addEventListener("scroll", updateScrollState, {
  passive: true
});

if (toTopButton) {
  toTopButton.addEventListener("click", scrollToTop);
}

if (navToggle) {
  navToggle.addEventListener("click", toggleNavigation);
}

if (siteNav) {
  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", handleContactSubmit);
}

createRevealObserver();
updateScrollState();