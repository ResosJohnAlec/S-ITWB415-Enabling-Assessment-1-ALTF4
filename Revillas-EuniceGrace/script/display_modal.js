// Bigger "pop-up" carousel for Live Previews section
const PREVIEW_OVERLAY_ID = 'preview_modal_overlay';

const PREVIEW_TITLE_MAP = {
    PassedAway: 'PassedAway',
    KofiCompass: 'Kofi Compass',
    ItadakiMasu: 'ItadakiMasu',
    Motmot: 'Monthsary Gift'
};

let previewOverlay = null;
let previewCloseBtn = null;
let previewTitleEl = null;
let previewCarouselEl = null;
let previewCarouselInner = null;

function buildSlidesFromSource(sourceCarouselId) {
    const source = document.getElementById(sourceCarouselId);

    if (!source) {
        return [];
    }

    const slides = Array.from(source.querySelectorAll('.carousel-item'));

    return slides.map(function(item) {
        const img = item.querySelector('img');

        return {
            src: img ? img.getAttribute('src') : '',
            alt: img ? img.getAttribute('alt') : sourceCarouselId
        };
    }).filter(function(slide) {
        return slide.src;
    });
}

function openPreviewModal(sourceCarouselId) {
    if (!previewOverlay) {
        return;
    }

    const slides = buildSlidesFromSource(sourceCarouselId);

    if (previewCarouselInner) {
        previewCarouselInner.innerHTML = '';
    }

    const title = PREVIEW_TITLE_MAP[sourceCarouselId] || sourceCarouselId;

    if (previewTitleEl) {
        previewTitleEl.textContent = title;
    }

    slides.forEach(function(slide, index) {
        const wrapper = document.createElement('div');
        const isActive = index === 0 ? ' active' : '';

        wrapper.className = 'carousel-item' + isActive;
        wrapper.innerHTML = '<img src="' + slide.src + '" class="d-block w-100" alt="' + slide.alt + '">';

        if (previewCarouselInner) {
            previewCarouselInner.appendChild(wrapper);
        }
    });

    previewOverlay.classList.add('open');
    document.body.classList.add('body-no-scroll');

    if (previewCarouselEl) {
        previewCarouselEl.classList.add('show');
    }

    if (previewCloseBtn) {
        previewCloseBtn.focus();
    }
}

function closePreviewModal() {
    if (!previewOverlay) {
        return;
    }

    previewOverlay.classList.remove('open');
    document.body.classList.remove('body-no-scroll');

    if (previewCarouselInner) {
        previewCarouselInner.innerHTML = '';
    }

    if (previewCarouselEl) {
        previewCarouselEl.classList.remove('show');
    }
}

function handlePreviewOverlayClick(event) {
    if (event.target === previewOverlay) {
        closePreviewModal();
    }
}

function handlePreviewKeydown(event) {
    if (event.key === 'Escape') {
        closePreviewModal();
    }
}

function handlePreviewButtonClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const id = this.getAttribute('data-carousel');

    if (id) {
        openPreviewModal(id);
    }
}

function bindCarouselButtons() {
    const buttons = document.querySelectorAll('[data-carousel]');

    buttons.forEach(function(button) {
        button.addEventListener('click', handlePreviewButtonClick);
    });
}

function initPreviewModal() {
    previewOverlay = document.getElementById(PREVIEW_OVERLAY_ID);

    if (!previewOverlay) {
        return;
    }

    previewCloseBtn = previewOverlay.querySelector('#preview_modal_close');
    previewTitleEl = previewOverlay.querySelector('#preview_modal_title');
    previewCarouselEl = previewOverlay.querySelector('#preview_carousel');
    previewCarouselInner = previewOverlay.querySelector('#preview_carousel_inner');

    if (previewCloseBtn) {
        previewCloseBtn.addEventListener('click', closePreviewModal);
    }

    previewOverlay.addEventListener('click', handlePreviewOverlayClick);
    document.addEventListener('keydown', handlePreviewKeydown);

    bindCarouselButtons();
}

// Allow other scripts to open the big preview modal by id
window.openPreviewModalFromId = function(id) {
    if (id) {
        openPreviewModal(id);
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreviewModal);
} else {
    initPreviewModal();
}