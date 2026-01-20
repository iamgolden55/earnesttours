document.addEventListener('DOMContentLoaded', () => {
    /* --- Lightbox Logic --- */
    const lightboxModal = document.createElement('div');
    lightboxModal.className = 'lightbox-modal';
    lightboxModal.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="" alt="Lightbox Image" class="lightbox-image">
        </div>
    `;
    document.body.appendChild(lightboxModal);

    const lightboxImage = lightboxModal.querySelector('.lightbox-image');
    const lightboxClose = lightboxModal.querySelector('.lightbox-close');

    function openLightbox(imgSrc) {
        lightboxImage.src = imgSrc;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImage.src = '';
        }, 300);
    }

    // Delegation to handle dynamically loaded images
    document.body.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG' && e.target.closest('.masonry-item, .card-img-container')) {
            openLightbox(e.target.src);
        }
    });

    lightboxClose.addEventListener('click', closeLightbox);

    // Close on background click
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
            closeLightbox();
        }
    });
});

/* --- Navigation Logic --- */
/* --- Navigation Logic --- */
function navigate(event, url) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    // Optional: Add a small delay for any exit animations if needed
    // For now, direct navigation
    window.location.href = url;
}

// Mobile Menu Toggle
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        // Toggle Menu
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = mainNav.classList.toggle('active');

            // Toggle body scroll
            document.body.style.overflow = isActive ? 'hidden' : '';

            // Toggle Icon force rerender
            if (isActive) {
                menuToggle.innerHTML = '<span class="iconify" data-icon="lucide:x" data-width="24"></span>';
            } else {
                menuToggle.innerHTML = '<span class="iconify" data-icon="lucide:menu" data-width="24"></span>';
            }
        });

        // Close on Link Click
        const navLinks = mainNav.querySelectorAll('a, button');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
                menuToggle.innerHTML = '<span class="iconify" data-icon="lucide:menu" data-width="24"></span>';
            });
        });

        // Close on Click Outside
        document.addEventListener('click', (e) => {
            if (mainNav.classList.contains('active') &&
                !mainNav.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
                menuToggle.innerHTML = '<span class="iconify" data-icon="lucide:menu" data-width="24"></span>';
            }
        });
    }
});

// Sticky Header Effect (Optional shadow on scroll if not already in CSS)
const header = document.querySelector('.site-header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none'; // Or '0 2px 20px rgba(0,0,0,0.03)' default
        }
    });
}

/* --- Scroll Animations --- */
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px' // Offset slightly so it doesn't trigger too early at very bottom
    });

    revealElements.forEach(el => revealObserver.observe(el));
});

/* --- Typewriter Effect --- */
document.addEventListener('DOMContentLoaded', () => {
    const titleEl = document.getElementById('typing-title');
    const subtitleEl = document.getElementById('typing-subtitle');

    if (!titleEl || !subtitleEl) return;

    // Structured content for H1
    const h1Segments = [
        { text: "Discover the world's most ", type: 'text' },
        { html: '<br class="hidden md:block">', type: 'html' },
        { text: "breathtaking", type: 'text', wrapper: 'span', wrapperClass: 'italic font-light' },
        { text: " hidden gems.", type: 'text' }
    ];

    // Structured content for P
    const pText = "Curated travel experiences designed for the modern explorer. From the peaks of the Alps to the coasts of Bali.";

    let currentSegment = 0;
    let currentChar = 0;
    let currentWrapper = null; // To hold the span while typing inside it

    // Add cursor initially
    titleEl.classList.add('typing-cursor');

    function typeTitle() {
        if (currentSegment >= h1Segments.length) {
            // Title Done
            titleEl.classList.remove('typing-cursor');
            subtitleEl.classList.add('typing-cursor');
            setTimeout(typeSubtitle, 500); // Pause before subtitle
            return;
        }

        const segment = h1Segments[currentSegment];

        if (segment.type === 'html') {
            // Append HTML immediately
            titleEl.insertAdjacentHTML('beforeend', segment.html);
            currentSegment++;
            setTimeout(typeTitle, 50); // Small pause
        } else if (segment.type === 'text') {
            // Create wrapper if needed and not already created
            if (segment.wrapper && !currentWrapper) {
                currentWrapper = document.createElement(segment.wrapper);
                if (segment.wrapperClass) currentWrapper.className = segment.wrapperClass;
                titleEl.appendChild(currentWrapper);
            }

            const targetNode = currentWrapper || titleEl;
            const textToType = segment.text;

            if (currentChar < textToType.length) {
                // Type one char
                targetNode.innerHTML += textToType.charAt(currentChar); // InnerHTML safe here as char is simpler
                // Or: targetNode.appendChild(document.createTextNode(textToType.charAt(currentChar)));
                currentChar++;
                setTimeout(typeTitle, 40 + Math.random() * 30); // Random typing speed
            } else {
                // Segment Done
                currentSegment++;
                currentChar = 0;
                currentWrapper = null;
                setTimeout(typeTitle, 50);
            }
        }
    }

    let pIndex = 0;
    function typeSubtitle() {
        if (pIndex < pText.length) {
            subtitleEl.textContent += pText.charAt(pIndex);
            pIndex++;
            setTimeout(typeSubtitle, 20 + Math.random() * 20); // Faster for subtitle
        } else {
            subtitleEl.classList.remove('typing-cursor');
        }
    }

    // Start delay
    setTimeout(typeTitle, 800);
});
