(function() {
  // Bigger "pop-up" carousel for Live Previews section
  const OVERLAY_ID = 'preview_modal_overlay';
  const OVERLAY = document.getElementById(OVERLAY_ID);

  if (!OVERLAY) {
    return;
  }

  const MODAL = OVERLAY.querySelector('#preview_modal');
  const CLOSE_BTN = OVERLAY.querySelector('#preview_modal_close');
  const TITLE_EL = OVERLAY.querySelector('#preview_modal_title');
  const CAROUSEL_EL = OVERLAY.querySelector('#preview_carousel');
  const CAROUSEL_INNER = OVERLAY.querySelector('#preview_carousel_inner');

  const TITLE_MAP = {
    PassedAway: 'PassedAway',
    KofiCompass: 'Kofi Compass',
    ItadakiMasu: 'ItadakiMasu',
    Motmot: 'Monthsary Gift'
  };

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
    if (!OVERLAY) {
      return;
    }

    const slides = buildSlidesFromSource(sourceCarouselId);

    if (CAROUSEL_INNER) {
      CAROUSEL_INNER.innerHTML = '';
    }

    const title = TITLE_MAP[sourceCarouselId] || sourceCarouselId;

    if (TITLE_EL) {
      TITLE_EL.textContent = title;
    }

    slides.forEach(function(slide, index) {
      const wrapper = document.createElement('div');
      const isActive = index === 0 ? ' active' : '';

      wrapper.className = 'carousel-item' + isActive;
      wrapper.innerHTML = '<img src="' + slide.src + '" class="d-block w-100" alt="' + slide.alt + '">';

      if (CAROUSEL_INNER) {
        CAROUSEL_INNER.appendChild(wrapper);
      }
    });

    OVERLAY.classList.add('open');
    document.body.classList.add('body-no-scroll');

    if (CAROUSEL_EL) {
      CAROUSEL_EL.classList.add('show');
    }

    if (CLOSE_BTN) {
      CLOSE_BTN.focus();
    }
  }

  function closePreviewModal() {
    OVERLAY.classList.remove('open');
    document.body.classList.remove('body-no-scroll');

    if (CAROUSEL_INNER) {
      CAROUSEL_INNER.innerHTML = '';
    }

    if (CAROUSEL_EL) {
      CAROUSEL_EL.classList.remove('show');
    }
  }

  function handleOverlayClick(event) {
    if (event.target === OVERLAY) {
      closePreviewModal();
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closePreviewModal();
    }
  }

  function handleButtonClick(event) {
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
      button.addEventListener('click', handleButtonClick);
    });
  }

  // Set up event listeners
  if (CLOSE_BTN) {
    CLOSE_BTN.addEventListener('click', closePreviewModal);
  }

  OVERLAY.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleKeydown);

  // Wire up buttons inside the Live Previews carousel blocks
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindCarouselButtons);
  } else {
    bindCarouselButtons();
  }

  // Allow other scripts to open the big preview modal by id
  window.openPreviewModalFromId = function(id) {
    if (id) {
      openPreviewModal(id);
    }
  };
})();