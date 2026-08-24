// DYNAMIC PROJECTS ARRAY (requirement: use JS array to display projects dynamically)
const projects = [
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


//DYNAMIC PROJECT CARDS
function renderProjects() {
    const grid = document.getElementById("projectList");
    if (!grid) return;

    projects.forEach((p, index) => {
        const card = document.createElement("div");
        card.className = "project-card reveal";
        card.setAttribute("data-index", index);
        card.innerHTML = `
            <div class="project-img-wrap">
                <img src="${p.img}" alt="${p.title}">
                <div class="project-overlay">
                    <button class="project-link-btn open-modal-btn" data-index="${index}">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            </div>
            <div class="project-body">
                <span class="project-tag">${p.tag}</span>
                <h5>${p.title}</h5>
                <p>${p.desc}</p>
                <button class="project-btn open-modal-btn" data-index="${index}">
                    <i class="fas fa-arrow-right"></i> See Details
                </button>
            </div>
        `;
        grid.appendChild(card);
    });

    const newReveals = grid.querySelectorAll('.reveal');
    newReveals.forEach(el => revealObserver.observe(el));

    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const idx = parseInt(btn.getAttribute('data-index'));
            openProjectModal(idx);
        });
    });
}


// SCROLL REVEAL
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

// Observe all existing reveal elements
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// BACK TO TOP BUTTON
const btn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
});


// TYPING ANIMATION
(function startTyping() {
    const nameEl = document.getElementById('typingName');
    if (!nameEl) return;

    const fullText = "Eunice Grace";
    let i = 0;
    let typing = true;

    function typeName() {
        if (!typing) return;

        if (i <= fullText.length) {
            nameEl.innerHTML = fullText.slice(0, i) + '<span class="cursor">|</span>';
            i++;
            setTimeout(typeName, 110);
        }
    }

    typeName();

    // Subtitle typing: "I can" + cycling phrases
    const canEl = document.getElementById('typingCan');
    if (canEl) {
        const canPhrases = [
            "build clean websites",
            "make your frontend shine",
            "create responsive UI",
            "turn ideas into pages"
        ];


        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeSpeed = 85;
        const deleteSpeed = 50;
        const pauseMs = 800;

        function tickCan() {
            const current = canPhrases[phraseIndex];

            if (!isDeleting) {
                charIndex++;
                canEl.innerHTML = current.slice(0, charIndex) + '<span class="cursor">|</span>';

                if (charIndex >= current.length) {
                    isDeleting = true;
                    setTimeout(tickCan, pauseMs);
                    return;
                }

                setTimeout(tickCan, typeSpeed);
            } else {
                charIndex--;
                canEl.innerHTML = current.slice(0, charIndex) + '<span class="cursor">|</span>';

                if (charIndex < 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % canPhrases.length;
                    setTimeout(tickCan, 250);
                    return;
                }

                setTimeout(tickCan, deleteSpeed);
            }
        }

        tickCan();
    }
})();




// DARK MODE TOGGLE
const darkToggleBtn = document.getElementById('darkModeToggle');
const darkModeIcon  = document.getElementById('darkModeIcon');

// Load saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    darkModeIcon.classList.replace('fa-moon', 'fa-sun');
}

darkToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');

    // Swap icon
    if (isLight) {
        darkModeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        darkModeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});


// NAVBAR SCROLL EFFECT
window.addEventListener('scroll', () => {
    document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 50);
});


// ACTIVE NAV HIGHLIGHT
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('#navLinks .nav-link[data-section]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinkEls.forEach(link => {
                link.classList.remove('nav-active');
                if (link.getAttribute('data-section') === id) {
                    link.classList.add('nav-active');
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));


// FORM VALIDATION
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput  = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const msgInput   = document.getElementById('contactMessage');
    const formMsg    = document.getElementById('formMsg');

    const nameError  = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const msgError   = document.getElementById('msgError');

    // Clear previous errors
    [nameInput, emailInput, msgInput].forEach(el => el.classList.remove('input-error'));
    [nameError, emailError, msgError].forEach(el => el.textContent = '');
    formMsg.textContent = '';
    formMsg.className = 'form-msg';

    let valid = true;

    // Validate name (no numbers)
    const nameVal = nameInput.value.trim();
    const hasNumbers = /\d/.test(nameVal);

    if (nameVal === '') {
        nameInput.classList.add('input-error');
        nameError.textContent = 'Name is required.';
        valid = false;
    } else if (hasNumbers) {
        nameInput.classList.add('input-error');
        nameError.textContent = 'Name should not contain numbers.';
        valid = false;
    }

    // Validate email (email-only, no numbers requirement is not applied here)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        emailInput.classList.add('input-error');
        emailError.textContent = 'Email is required.';
        valid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
        emailInput.classList.add('input-error');
        emailError.textContent = 'Please enter a valid email address.';
        valid = false;
    }

    // Validate message
    if (msgInput.value.trim() === '') {
        msgInput.classList.add('input-error');
        msgError.textContent = 'Message cannot be empty.';
        valid = false;
    }

    if (!valid) {
        formMsg.textContent = 'Please fix the errors above.';
        formMsg.classList.add('error');
        return;
    }

    // Success
    formMsg.textContent = 'Message sent successfully! I\'ll get back to you soon.';
    formMsg.classList.add('success');
    contactForm.reset();
});


// MODAL POPUP
const modalOverlay = document.getElementById('projectModalOverlay');
const modalClose   = document.getElementById('modalClose');

function openProjectModal(index) {
    const p = projects[index];
    if (!p) return;

    document.getElementById('modalImg').src   = p.img;
    document.getElementById('modalImg').alt   = p.title;
    document.getElementById('modalTag').textContent  = p.tag;
    document.getElementById('modalTitle').textContent = p.title;
    document.getElementById('modalDesc').textContent  = p.longDesc;

    const modalViewBtn = document.getElementById('modalViewBtn');
    modalViewBtn.href = p.displayAnchor;
modalViewBtn.addEventListener('click', (e) => {
        const id = (p.displayAnchor || '').replace('#', '');

        e.preventDefault();
        if (window.openPreviewModalFromId) {
            window.openPreviewModalFromId(id);
        }
    }, { once: true });



    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = p.tech.map(t => `<span>${t}</span>`).join('');

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeProjectModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeProjectModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
});


// INITIALISE: render projects after page loads
document.addEventListener('DOMContentLoaded', renderProjects);
