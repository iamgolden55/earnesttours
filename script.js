document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');

            // Optional: Animate hamburger to X
            const bars = menuToggle.querySelectorAll('.bar');
            // Logic for animation can go here or be handled by CSS classes
        });
    }

    // Sticky Header Effect (Optional shadow on scroll if not already in CSS)
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none'; // Or '0 2px 20px rgba(0,0,0,0.03)' default
        }
    });
});
