/**
 * Personal Introduction Presentation Controller
 * Light theme - Fixed 1920x1080 with viewport scaling
 */

document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const DESIGN_WIDTH = 1920;
    const DESIGN_HEIGHT = 1080;
    const MIN_SCALE = 0.1;
    const MAX_SCALE = 2.0;
    const MARGIN = 20;

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
        if (!slideWrapper || !slidesContainer) return;

        const viewport = window.visualViewport || {
            width: window.innerWidth,
            height: window.innerHeight,
            scale: 1
        };

        let viewportWidth = viewport.width;
        let viewportHeight = viewport.height;

        if (!window.visualViewport) {
            viewportWidth = document.documentElement.clientWidth;
            viewportHeight = document.documentElement.clientHeight;
        }

        const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement);
        const margin = isFullscreen ? 0 : MARGIN;

        const availableWidth = viewportWidth - (margin * 2);
        const availableHeight = viewportHeight - (margin * 2);

        const scaleX = availableWidth / DESIGN_WIDTH;
        const scaleY = availableHeight / DESIGN_HEIGHT;
        let scale = Math.min(scaleX, scaleY);

        scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale));

        slideWrapper.style.transform = `scale(${scale})`;
        slideWrapper.style.transformOrigin = 'center center';
        slideWrapper.style.width = DESIGN_WIDTH + 'px';
        slideWrapper.style.height = DESIGN_HEIGHT + 'px';

        document.documentElement.style.setProperty('--current-scale', scale);
    }

    // Initial scale
    updateScale();

    // Resize handlers
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateScale, 16);
    });

    window.addEventListener('orientationchange', () => {
        setTimeout(updateScale, 100);
        setTimeout(updateScale, 300);
    });

    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', updateScale);
        window.visualViewport.addEventListener('scroll', updateScale);
    }

    // ========== Page Number Display ==========
    if (totalPagesEl) totalPagesEl.textContent = totalSlides;
    if (currentPageEl) currentPageEl.textContent = 1;

    // ========== Navigation Dots ==========
    const tooltips = {
        0: '封面',
        1: '教育背景',
        2: '科研经历',
        3: '研究成果',
        4: '代表论文',
        5: '发展愿景',
        6: '结束'
    };

    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('nav-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        if (tooltips[index]) dot.title = tooltips[index];
        navDotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.nav-dot');

    // ========== Slide Navigation ==========
    window.goToSlide = (index) => {
        if (isAnimating || index === currentSlideIndex) return;
        if (index < 0 || index >= totalSlides) return;

        isAnimating = true;

        slides[currentSlideIndex].classList.remove('active');
        slides[currentSlideIndex].classList.add('previous');

        slides.forEach(s => {
            if (s !== slides[currentSlideIndex] && s !== slides[index]) {
                s.classList.remove('previous');
            }
        });

        slides[index].classList.add('active');
        slides[index].classList.remove('previous');

        dots[currentSlideIndex].classList.remove('active');
        dots[index].classList.add('active');

        if (currentPageEl) currentPageEl.textContent = index + 1;

        currentSlideIndex = index;

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
        setTimeout(updateScale, 100);
    });
});
