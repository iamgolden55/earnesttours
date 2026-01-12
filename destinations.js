document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Infinite Scroll Logic --- */
    const grid = document.getElementById('destinations-grid');
    // Get all cards currently in the DOM (initially hidden)
    const allCards = Array.from(document.querySelectorAll('.discovery-card'));
    const loader = document.getElementById('loader');

    // Configuration
    const BATCH_SIZE = 8; // Number of items to load at once
    let loadedCount = 0;

    // Function to show the next batch
    function loadNextBatch() {
        // Calculate end index
        const nextCount = Math.min(loadedCount + BATCH_SIZE, allCards.length);

        // If we have already loaded everything, hide loader and return
        if (loadedCount >= allCards.length) {
            loader.style.display = 'none';
            return;
        }

        // Show spinner
        loader.classList.add('active');

        // Simulate network delay (600ms) for better UX feel
        setTimeout(() => {
            for (let i = loadedCount; i < nextCount; i++) {
                const card = allCards[i];
                card.classList.remove('hidden');
                card.classList.add('fade-in');
            }

            loadedCount = nextCount;
            loader.classList.remove('active');

            // If we've reached the end, completely hide the loader container
            if (loadedCount >= allCards.length) {
                loader.style.display = 'none';
                observer.disconnect(); // Stop observing
            }
        }, 600);
    }

    // Initial Load
    // We want the first batch to appear immediately or very quickly
    loadNextBatch();

    // Setup Intersection Observer
    const observerOptions = {
        root: null, // viewport
        rootMargin: '100px', // Trigger 100px before bottom
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadNextBatch();
            }
        });
    }, observerOptions);

    // Observe the loader element
    if (loader) {
        observer.observe(loader);
    }


    /* --- 2. Fun Fact Toggle Logic --- */
    // Note: Since we are un-hiding elements, we can attach listeners to all of them upfront 
    // because they exist in the DOM, just hidden.

    allCards.forEach(card => {
        const toggleBtn = card.querySelector('.fact-toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Stop event bubbling

                if (card.classList.contains('show-fact')) {
                    // Close
                    card.classList.remove('show-fact');
                    toggleBtn.classList.remove('active');
                    toggleBtn.innerHTML = '?';
                } else {
                    // Open
                    card.classList.add('show-fact');
                    toggleBtn.classList.add('active');
                    toggleBtn.innerHTML = '&times;';
                }
            });
        }
    });

});
