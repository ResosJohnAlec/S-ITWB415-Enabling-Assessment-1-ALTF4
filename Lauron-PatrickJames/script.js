const header = document.getElementById("site_header");
const toTopButton = document.getElementById("to_top");
const navToggle = document.getElementById("nav_toggle");
const siteNav = document.getElementById("site_nav");
const contactForm = document.getElementById("contact_form");
const expToggle = document.getElementById("exp_toggle");
const expList = document.getElementById("exp_list");
const carousel = document.getElementById("about_carousel");
const carouselDots = document.getElementById("carousel_dots");
const carouselCaption = document.getElementById("carousel_caption");

const carouselIntervalMs = 4000;
const scrollHeaderThreshold = 40;
const backToTopThreshold = 500;
const revealThreshold = 0.15;
const revealRootMargin = "0px 0px -40px 0px";
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
  navToggle.setAttribute("aria-expanded", isOpen);
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

function toggleExperience() {
  if (!expToggle || !expList) {
    return;
  }

  const isExpanded = expList.classList.toggle("expanded");

  expToggle.setAttribute(
    "aria-expanded",
    isExpanded
  );

  expToggle.firstChild.textContent = isExpanded
    ? "View less "
    : "View more ";
}

function goToCarouselSlide(carouselState, nextIndex) {
  carouselState.slides[
    carouselState.activeIndex
  ].classList.remove("is-active");

  carouselState.dots[
    carouselState.activeIndex
  ].classList.remove("is-active");

  carouselState.activeIndex = nextIndex;

  carouselState.slides[
    carouselState.activeIndex
  ].classList.add("is-active");

  carouselState.dots[
    carouselState.activeIndex
  ].classList.add("is-active");

  if (carouselState.caption) {
    carouselState.caption.textContent =
      carouselState.slides[
        carouselState.activeIndex
      ].dataset.label || "";
  }
}

function stopCarouselTimer(carouselState) {
  window.clearInterval(carouselState.timerId);
}

function restartCarouselTimer(carouselState) {
  stopCarouselTimer(carouselState);

  carouselState.timerId = window.setInterval(() => {
    const nextIndex =
      (carouselState.activeIndex + 1) %
      carouselState.slides.length;

    goToCarouselSlide(carouselState, nextIndex);
  }, carouselIntervalMs);
}

function createCarousel() {
  if (!carousel || !carouselDots) {
    return;
  }

  const slides = Array.from(
    carousel.querySelectorAll(".carousel-slide")
  );

  if (slides.length < 2) {
    return;
  }

  slides.forEach((_, index) => {
    const dot = document.createElement("span");

    if (!index) {
      dot.classList.add("is-active");
    }

    carouselDots.appendChild(dot);
  });

  const carouselState = {
    slides,
    dots: Array.from(carouselDots.children),
    caption: carouselCaption,
    activeIndex: 0
  };

  restartCarouselTimer(carouselState);

  carouselState.dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToCarouselSlide(carouselState, index);
      restartCarouselTimer(carouselState);
    });
  });

  carousel.addEventListener("mouseenter", () => {
    stopCarouselTimer(carouselState);
  });

  carousel.addEventListener("mouseleave", () => {
    restartCarouselTimer(carouselState);
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

  const mailtoUrl =
    `mailto:${contactEmail}?subject=${subject}&body=${body}`;

  window.location.href = mailtoUrl;
}

function createActiveNavigation() {
  if (!siteNav || !("IntersectionObserver" in window)) {
    return;
  }

  const navLinks = Array.from(siteNav.querySelectorAll("a[href^='#']"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => observer.observe(section));
}

window.addEventListener(
  "scroll",
  updateScrollState,
  { passive: true }
);

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

if (expToggle) {
  expToggle.addEventListener("click", toggleExperience);
}

if (contactForm) {
  contactForm.addEventListener(
    "submit",
    handleContactSubmit
  );
}

createRevealObserver();
createCarousel();
createActiveNavigation();
updateScrollState();  