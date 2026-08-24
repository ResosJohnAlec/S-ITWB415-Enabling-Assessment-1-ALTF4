// DYNAMIC PROJECTS ARRAY (requirement: use JS array to display projects dynamically)
const PROJECTS = [
    {
        title: "PassedAway",
        tag: "Web Design",
        desc: "A website for a computer shipping company.",
        img: "assets/1.png",
        displayAnchor: "#PassedAway",
        tech: ["HTML", "CSS", "Bootstrap"],
        longDesc: "PassedAway is a fully designed website built for a computer shipping/logistics company. It features a clean layout with product listings, shipping info, and a contact form."
    },
    {
        title: "KofiCompass",
        tag: "App",
        desc: "Website made for locating cafes near campus.",
        img: "assets/k1.png",
        displayAnchor: "#KofiCompass",
        tech: ["HTML", "CSS", "JavaScript", "Maps API"],
        longDesc: "KofiCompass helps students find nearby coffee shops and cafes around the campus area. Features an interactive map and filter system for quick discovery."
    },
    {
        title: "ItadakiMasu",
        tag: "Web Design",
        desc: "Simple website for a few Japanese Dishes.",
        img: "assets/I2.png",
        displayAnchor: "#ItadakiMasu",
        tech: ["HTML", "CSS"],
        longDesc: "ItadakiMasu is a beautifully styled webpage showcasing a selection of Japanese cuisine, complete with dish descriptions and appetizing imagery."
    },
    {
        title: "Monthsary Gift",
        tag: "Personal",
        desc: "A very simple website for a monthsary gift.",
        img: "assets/m3.png",
        displayAnchor: "#Motmot",
        tech: ["HTML", "CSS", "JavaScript"],
        longDesc: "A personal project made as a digital monthsary gift. Features a heartfelt message, photo gallery, and a custom interactive surprise element."
    }
];

// SCROLL REVEAL
const REVEAL_THRESHOLD = 0.12;
const SCROLL_OFFSET = 400;
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
    const grid = document.getElementById('project-list');
    
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
    const btn = document.getElementById('back-to-top');
    
    if (!btn) {
        return;
    }
    
    if (window.scrollY > SCROLL_OFFSET) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
}

window.addEventListener('scroll', handleBackToTopScroll);

// TYPING ANIMATION
(function startTyping() {
    const nameEl = document.getElementById('typing-name');
    
    if (!nameEl) {
        return;
    }

    const fullText = 'Eunice Grace';
    let index = 0;
    let isTyping = true;

    function typeName() {
        if (!isTyping) {
            return;
        }

        if (index <= fullText.length) {
            nameEl.innerHTML = fullText.slice(0, index) + '<span class="cursor">|</span>';
            index++;
            setTimeout(typeName, TYPING_SPEED);
        }
    }

    typeName();

    // Subtitle typing: "I can" + cycling phrases
    const canEl = document.getElementById('typing-can');
    
    if (canEl) {
        const canPhrases = [
            'build clean websites',
            'make your frontend shine',
            'create responsive UI',
            'turn ideas into pages'
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function tickCan() {
            const current = canPhrases[phraseIndex];

            if (!isDeleting) {
                charIndex++;
                canEl.innerHTML = current.slice(0, charIndex) + '<span class="cursor">|</span>';

                if (charIndex >= current.length) {
                    isDeleting = true;
                    setTimeout(tickCan, CAN_PAUSE_MS);
                    return;
                }

                setTimeout(tickCan, CAN_TYPING_SPEED);
            } else {
                charIndex--;
                canEl.innerHTML = current.slice(0, charIndex) + '<span class="cursor">|</span>';

                if (charIndex < 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % canPhrases.length;
                    setTimeout(tickCan, CAN_DELETE_PAUSE);
                    return;
                }

                setTimeout(tickCan, CAN_DELETE_SPEED);
            }
        }

        tickCan();
    }
})();

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
    const nav = document.getElementById('main-nav');
    
    if (!nav) {
        return;
    }
    
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ACTIVE NAV HIGHLIGHT
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('#nav-links .nav-link[data-section]');

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

    if (nameVal === '') {
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
    
    if (emailInput.value.trim() === '') {
        emailInput.classList.add('input-error');
        emailError.textContent = 'Email is required.';
        isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
        emailInput.classList.add('input-error');
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Validate message
    if (msgInput.value.trim() === '') {
        msgInput.classList.add('input-error');
        msgError.textContent = 'Message cannot be empty.';
        isValid = false;
    }

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

    const modalImg = document.getElementById('modal-img');
    const modalTag = document.getElementById('modal-tag');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalViewBtn = document.getElementById('modal-view-btn');
    const techContainer = document.getElementById('modal-tech');
    const modalOverlay = document.getElementById('project-modal-overlay');

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
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modalOverlay = document.getElementById('project-modal-overlay');
    
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

function handleModalOverlayClick(event) {
    const modalOverlay = document.getElementById('project-modal-overlay');
    
    if (event.target === modalOverlay) {
        closeProjectModal();
    }
}

function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeProjectModal();
    }
}

const modalClose = document.getElementById('modal-close');
const modalOverlay = document.getElementById('project-modal-overlay');

modalClose.addEventListener('click', closeProjectModal);
modalOverlay.addEventListener('click', handleModalOverlayClick);
document.addEventListener('keydown', handleEscapeKey);

// INITIALISE: render projects after page loads
document.addEventListener('DOMContentLoaded', renderProjects);