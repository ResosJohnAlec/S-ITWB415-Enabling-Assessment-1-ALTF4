(function () {
  // Bigger “pop-up” carousel for Live Previews section
  const OVERLAY_ID = 'previewModalOverlay';
  const OVERLAY = document.getElementById(OVERLAY_ID);
  if (!OVERLAY) return;

  const modal = OVERLAY.querySelector('#previewModal');
  const closeBtn = OVERLAY.querySelector('#previewModalClose');
  const titleEl = OVERLAY.querySelector('#previewModalTitle');
  const carouselEl = OVERLAY.querySelector('#previewCarousel');
  const carouselInner = OVERLAY.querySelector('#previewCarouselInner');

  function buildSlidesFromSource(sourceCarouselId) {
    const src = document.getElementById(sourceCarouselId);
    if (!src) return [];

    const slides = Array.from(src.querySelectorAll('.carousel-item'));
    return slides.map((item) => {
      const img = item.querySelector('img');
      return {
        src: img ? img.getAttribute('src') : '',
        alt: img ? img.getAttribute('alt') : sourceCarouselId
      };
    }).filter(s => s.src);
  }

  function openPreviewModal(sourceCarouselId) {
    if (!OVERLAY) return;

    const slides = buildSlidesFromSource(sourceCarouselId);
    carouselInner.innerHTML = '';

    const titleMap = {
      PassedAway: 'PassedAway',
      KofiCompass: 'Kofi Compass',
      ItadakiMasu: 'ItadakiMasu',
      Motmot: 'Monthsary Gift'
    };

    const title = titleMap[sourceCarouselId] || sourceCarouselId;
    if (titleEl) titleEl.textContent = title;

    slides.forEach((s, idx) => {
      const wrap = document.createElement('div');
      wrap.className = 'carousel-item' + (idx === 0 ? ' active' : '');
      wrap.innerHTML = `<img src="${s.src}" class="d-block w-100" alt="${s.alt}">`;
      carouselInner.appendChild(wrap);
    });

    OVERLAY.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Show first slide state
    if (carouselEl) {
      carouselEl.classList.add('show');
    }

    // Focus for accessibility
    closeBtn && closeBtn.focus();
  }

  function closePreviewModal() {
    OVERLAY.classList.remove('open');
    document.body.style.overflow = '';

    // Clear slides to avoid stale DOM
    if (carouselInner) carouselInner.innerHTML = '';

    if (carouselEl) carouselEl.classList.remove('show');
  }

  closeBtn && closeBtn.addEventListener('click', closePreviewModal);
  OVERLAY.addEventListener('click', (e) => {
    if (e.target === OVERLAY) closePreviewModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePreviewModal();
  });

// Wire up buttons inside the Live Previews carousel blocks
  // Ensure buttons exist before binding
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-carousel]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute('data-carousel');
        if (id) openPreviewModal(id);
      });
    });
  });

  // Allow other scripts to open the big preview modal by id
  window.openPreviewModalFromId = (id) => {
    if (!id) return;
    openPreviewModal(id);
  };
})();


