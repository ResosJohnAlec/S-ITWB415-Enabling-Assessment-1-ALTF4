// DYNAMIC PROJECTS ARRAY (requirement: use JS array to display projects dynamically)
const PROJECTS = [
    {
        title: "PassedAway",
        tag: "Web Design",
        desc: "A website for a computer shipping company.",
        img: "assets/1.png",
        displayAnchor: "#passed_away",
        tech: ["HTML", "CSS", "Bootstrap"],
        longDesc: "PassedAway is a fully designed website built for a computer shipping/logistics company."
    },
    {
        title: "KofiCompass",
        tag: "App",
        desc: "Website made for locating cafes near campus.",
        img: "assets/k1.png",
        displayAnchor: "#kofi_compass",
        tech: ["HTML", "CSS", "JavaScript", "Maps API"],
        longDesc: "KofiCompass helps students find nearby coffee shops and cafes around the campus area."
    },
    {
        title: "ItadakiMasu",
        tag: "Web Design",
        desc: "Simple website for a few Japanese Dishes.",
        img: "assets/I2.png",
        displayAnchor: "#itadaki_masu",
        tech: ["HTML", "CSS"],
        longDesc: "ItadakiMasu is a styled webpage showcasing a selection of Japanese cuisine."
    },
    {
        title: "Monthsary Gift",
        tag: "Personal",
        desc: "A very simple website for a monthsary gift.",
        img: "assets/m3.png",
        displayAnchor: "#monthsary_gift",
        tech: ["HTML", "CSS", "JavaScript"],
        longDesc: "A personal project made as a digital monthsary gift."
    }
];

// SCROLL REVEAL
const REVEAL_THRESHOLD = 0.12;
const NAVBAR_SCROLL_THRESHOLD = 50;
const BACK_TO_TOP_THRESHOLD = 400;
const TYPING_SPEED = 110;
const CAN_TYPING_SPEED = 85;
const CAN_DELETE_SPEED = 50;
const CAN_PAUSE_MS = 800;
const CAN_DELETE_PAUSE = 250;

const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: REVEAL_THRESHOLD });

// Observe all existing reveal elements
document.querySelectorAll('.reveal').forEach(function(el) {
    revealObserver.observe(el);
});

// DYNAMIC PROJECT CARDS
function renderProjects() {
    const grid = document.getElementById('project_list');

    if (!grid) {
        return;
    }

    PROJECTS.forEach(function(project, index) {
        const card = document.createElement('div');

        card.className = 'project-card reveal';
        card.setAttribute('data-index', index);

        card.innerHTML = `
            <div class="project-img-wrap">
                <img src="${project.img}" alt="${project.title}">
                <div class="project-overlay">
                    <button class="project-link-btn open-modal-btn" data-index="${index}">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            </div>
            <div class="project-body">
                <span class="project-tag">${project.tag}</span>
                <h5>${project.title}</h5>
                <p>${project.desc}</p>
                <button class="project-btn open-modal-btn" data-index="${index}">
                    <i class="fas fa-arrow-right"></i> See Details
                </button>
            </div>
        `;

        grid.appendChild(card);
    });

    const newReveals = grid.querySelectorAll('.reveal');

    newReveals.forEach(function(el) {
        revealObserver.observe(el);
    });

    document.querySelectorAll('.open-modal-btn').forEach(function(btn) {
        btn.addEventListener('click', handleModalButtonClick);
    });
}

function handleModalButtonClick(event) {
    event.preventDefault();

    const index = parseInt(this.getAttribute('data-index'), 10);

    openProjectModal(index);
}

// BACK TO TOP BUTTON
function handleBackToTopScroll() {
    const btn = document.getElementById('back_to_top');

    if (!btn) {
        return;
    }

    if (window.scrollY > BACK_TO_TOP_THRESHOLD) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
}

window.addEventListener('scroll', handleBackToTopScroll);

// TYPING ANIMATION
// TYPING ANIMATION
let typingIndex = 0;
let typingIsTyping = true;
let typingNameEl = null;

const CAN_PHRASES = [
    'build clean websites',
    'make your frontend shine',
    'create responsive UI',
    'turn ideas into pages'
];

let canEl = null;
let canPhraseIndex = 0;
let canCharIndex = 0;
let canIsDeleting = false;

function typeName() {
    if (!typingIsTyping || !typingNameEl) {
        return;
    }

    const fullText = 'Eunice Grace';

    if (typingIndex <= fullText.length) {
        typingNameEl.innerHTML = fullText.slice(0, typingIndex) + '<span class="cursor">|</span>';
        typingIndex++;
        setTimeout(typeName, TYPING_SPEED);
    }
}

function tickCan() {
    if (!canEl) {
        return;
    }

    const current = CAN_PHRASES[canPhraseIndex];

    if (!canIsDeleting) {
        canCharIndex++;
        canEl.innerHTML = current.slice(0, canCharIndex) + '<span class="cursor">|</span>';

        if (canCharIndex >= current.length) {
            canIsDeleting = true;
            setTimeout(tickCan, CAN_PAUSE_MS);
            return;
        }

        setTimeout(tickCan, CAN_TYPING_SPEED);
    } else {
        canCharIndex--;
        canEl.innerHTML = current.slice(0, canCharIndex) + '<span class="cursor">|</span>';

        if (canCharIndex < 0) {
            canIsDeleting = false;
            canPhraseIndex = (canPhraseIndex + 1) % CAN_PHRASES.length;
            setTimeout(tickCan, CAN_DELETE_PAUSE);
            return;
        }

        setTimeout(tickCan, CAN_DELETE_SPEED);
    }
}

function initTypingAnimation() {
    typingNameEl = document.getElementById('typing_name');

    if (!typingNameEl) {
        return;
    }

    typeName();

    canEl = document.getElementById('typing_can');

    if (canEl) {
        tickCan();
    }
}

initTypingAnimation();

// DARK MODE TOGGLE
function handleDarkModeToggle() {
    const icon = document.getElementById('dark-mode-icon');

    document.body.classList.toggle('light-mode');

    const isLight = document.body.classList.contains('light-mode');

    if (isLight) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
}

const darkToggleBtn = document.getElementById('dark-mode-toggle');
const darkModeIcon = document.getElementById('dark-mode-icon');

// Load saved preference
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    darkModeIcon.classList.replace('fa-moon', 'fa-sun');
}

darkToggleBtn.addEventListener('click', handleDarkModeToggle);

// NAVBAR SCROLL EFFECT
function handleNavbarScroll() {
    const nav = document.getElementById('main_nav');

    if (!nav) {
        return;
    }

    if (window.scrollY > NAVBAR_SCROLL_THRESHOLD) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ACTIVE NAV HIGHLIGHT
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('#nav_links .nav-link[data-section]');

const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            navLinkEls.forEach(function(link) {
                link.classList.remove('nav-active');

                if (link.getAttribute('data-section') === id) {
                    link.classList.add('nav-active');
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(function(sec) {
    sectionObserver.observe(sec);
});

// FORM VALIDATION
function validateForm(event) {
    event.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const msgInput = document.getElementById('contact-message');
    const formMsg = document.getElementById('form-msg');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const msgError = document.getElementById('msg-error');

    // Clear previous errors
    [nameInput, emailInput, msgInput].forEach(function(el) {
        el.classList.remove('input-error');
    });

    [nameError, emailError, msgError].forEach(function(el) {
        el.textContent = '';
    });

    formMsg.textContent = '';
    formMsg.className = 'form-msg';

    let isValid = true;

    // Validate name (no numbers)
    const nameVal = nameInput.value.trim();
    const hasNumbers = /\d/.test(nameVal);

    if (!nameVal) {
        nameInput.classList.add('input-error');
        nameError.textContent = 'Name is required.';
        isValid = false;
    } else if (hasNumbers) {
        nameInput.classList.add('input-error');
        nameError.textContent = 'Name should not contain numbers.';
        isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailInput.value.trim()) {
        emailInput.classList.add('input-error');
        emailError.textContent = 'Email is required.';
        isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
        emailInput.classList.add('input-error');
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Validate message - use falsy check
    if (!msgInput.value.trim()) {
        msgInput.classList.add('input-error');
        msgError.textContent = 'Message cannot be empty.';
        isValid = false;
    }

    // Guard clause for invalid form
    if (!isValid) {
        formMsg.textContent = 'Please fix the errors above.';
        formMsg.classList.add('error');
        return;
    }

    // Success
    formMsg.textContent = 'Message sent successfully! I\'ll get back to you soon.';
    formMsg.classList.add('success');

    const contactForm = document.getElementById('contact-form');
    contactForm.reset();
}

const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', validateForm);

// MODAL POPUP
function openProjectModal(index) {
    const project = PROJECTS[index];

    if (!project) {
        return;
    }

    const modalImg = document.getElementById('modal_img');
    const modalTag = document.getElementById('modal_tag');
    const modalTitle = document.getElementById('modal_title');
    const modalDesc = document.getElementById('modal_desc');
    const modalViewBtn = document.getElementById('modal_view_btn');
    const techContainer = document.getElementById('modal_tech');
    const modalOverlay = document.getElementById('project_modal_overlay');

    modalImg.src = project.img;
    modalImg.alt = project.title;
    modalTag.textContent = project.tag;
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.longDesc;
    modalViewBtn.href = project.displayAnchor;

    // Remove any existing event listeners by cloning
    const newViewBtn = modalViewBtn.cloneNode(true);
    modalViewBtn.parentNode.replaceChild(newViewBtn, modalViewBtn);

    newViewBtn.addEventListener('click', function(event) {
        event.preventDefault();

        const id = (project.displayAnchor || '').replace('#', '');

        if (window.openPreviewModalFromId) {
            window.openPreviewModalFromId(id);
        }
    });

    techContainer.innerHTML = project.tech.map(function(tech) {
        return '<span>' + tech + '</span>';
    }).join('');

    modalOverlay.classList.add('open');
    document.body.classList.add('body-no-scroll');
}

function closeProjectModal() {
    const modalOverlay = document.getElementById('project_modal_overlay');

    modalOverlay.classList.remove('open');
    document.body.classList.remove('body-no-scroll');
}

function handleModalOverlayClick(event) {
    const modalOverlay = document.getElementById('project_modal_overlay');

    if (event.target === modalOverlay) {
        closeProjectModal();
    }
}

function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeProjectModal();
    }
}

const modalClose = document.getElementById('modal_close');
const modalOverlay = document.getElementById('project_modal_overlay');

modalClose.addEventListener('click', closeProjectModal);
modalOverlay.addEventListener('click', handleModalOverlayClick);
document.addEventListener('keydown', handleEscapeKey);

// INITIALISE: render projects after page loads
document.addEventListener('DOMContentLoaded', renderProjects);