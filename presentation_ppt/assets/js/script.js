/**
 * reveal.js-style Presentation Controller
 * Fixed design size (1920x1080) with viewport scaling
 */

document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const DESIGN_WIDTH = 1920;
    const DESIGN_HEIGHT = 1080;
    const MIN_SCALE = 0.2;
    const MAX_SCALE = 2.0;

    // DOM Elements
    const slidesContainer = document.getElementById('slides-container');
    const slideWrapper = document.querySelector('.slide-wrapper');
    const slides = document.querySelectorAll('.slide');
    const navDotsContainer = document.getElementById('nav-dots');
    const currentPageEl = document.getElementById('current-page');
    const totalPagesEl = document.getElementById('total-pages');

    let currentSlideIndex = 0;
    let isAnimating = false;
    const totalSlides = slides.length;

    // ========== Viewport Scaling ==========
    function updateScale() {
        if (!slideWrapper) return;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate scale to fit viewport while maintaining aspect ratio
        const scaleX = viewportWidth / DESIGN_WIDTH;
        const scaleY = viewportHeight / DESIGN_HEIGHT;
        let scale = Math.min(scaleX, scaleY);

        // Clamp scale within bounds
        scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale));

        // Apply scale transform
        slideWrapper.style.transform = `scale(${scale})`;

        // Calculate actual dimensions after scaling
        const scaledWidth = DESIGN_WIDTH * scale;
        const scaledHeight = DESIGN_HEIGHT * scale;

        // Update CSS custom properties for any dependent calculations
        document.documentElement.style.setProperty('--current-scale', scale);
    }

    // Initial scale and update on resize
    updateScale();
    window.addEventListener('resize', updateScale);

    // ========== Page Number Display ==========
    if (totalPagesEl) totalPagesEl.textContent = totalSlides;
    if (currentPageEl) currentPageEl.textContent = 1;

    // ========== Navigation Dots ==========
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('nav-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));

        // Tooltips
        const tooltips = {
            0: 'Cover',
            1: 'Agenda',
            2: 'Artemis',
            5: 'MATHEMETRIC',
            8: 'SymVAE',
            11: 'ViLoMem',
            14: 'Thank You'
        };
        if (tooltips[index]) dot.title = tooltips[index];

        navDotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.nav-dot');

    // ========== Slide Navigation ==========
    window.goToSlide = (index) => {
        if (isAnimating || index === currentSlideIndex) return;
        if (index < 0 || index >= totalSlides) return;

        isAnimating = true;

        // Update slides
        slides[currentSlideIndex].classList.remove('active');
        slides[currentSlideIndex].classList.add('previous');

        slides.forEach(s => {
            if (s !== slides[currentSlideIndex] && s !== slides[index]) {
                s.classList.remove('previous');
            }
        });

        slides[index].classList.add('active');
        slides[index].classList.remove('previous');

        // Update dots
        dots[currentSlideIndex].classList.remove('active');
        dots[index].classList.add('active');

        // Update page number
        if (currentPageEl) currentPageEl.textContent = index + 1;

        currentSlideIndex = index;

        // Reset animation lock
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    };

    const nextSlide = () => goToSlide(currentSlideIndex + 1);
    const prevSlide = () => goToSlide(currentSlideIndex - 1);

    // ========== Keyboard Controls ==========
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowDown':
            case 'ArrowRight':
            case ' ':
            case 'PageDown':
            case 'Enter':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowUp':
            case 'ArrowLeft':
            case 'PageUp':
            case 'Backspace':
                e.preventDefault();
                prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides - 1);
                break;
            case 'f':
            case 'F':
                // Toggle fullscreen
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen?.();
                } else {
                    document.exitFullscreen?.();
                }
                break;
        }
    });

    // ========== Mouse Wheel Control ==========
    let lastWheelTime = 0;
    const wheelCooldown = 800;

    document.addEventListener('wheel', (e) => {
        const now = Date.now();
        if (now - lastWheelTime < wheelCooldown) return;

        if (e.deltaY > 0) {
            nextSlide();
            lastWheelTime = now;
        } else if (e.deltaY < 0) {
            prevSlide();
            lastWheelTime = now;
        }
    }, { passive: true });

    // ========== Touch Controls ==========
    let touchStartY = 0;
    let touchStartX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].screenY;
        const touchEndX = e.changedTouches[0].screenX;
        const deltaY = touchStartY - touchEndY;
        const deltaX = touchStartX - touchEndX;
        const threshold = 50;

        // Determine if swipe is more vertical or horizontal
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            if (deltaY > threshold) {
                nextSlide();
            } else if (deltaY < -threshold) {
                prevSlide();
            }
        } else {
            if (deltaX > threshold) {
                nextSlide();
            } else if (deltaX < -threshold) {
                prevSlide();
            }
        }
    }, { passive: true });

    // ========== Fullscreen Change Handler ==========
    document.addEventListener('fullscreenchange', () => {
        // Recalculate scale after fullscreen change
        setTimeout(updateScale, 100);
    });
});
