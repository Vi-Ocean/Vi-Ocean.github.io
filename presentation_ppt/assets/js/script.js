document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const navDotsContainer = document.getElementById('nav-dots');
    let currentSlideIndex = 0;
    let isAnimating = false;
    const totalSlides = slides.length;

    // Initialize Navigation Dots
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('nav-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        
        // Tooltip for dots (optional, can be added for project names)
        if (index === 1) dot.title = "Menu";
        else if (index === 2) dot.title = "Artemis";
        else if (index === 5) dot.title = "MATHEMETRIC";
        else if (index === 8) dot.title = "SymVAE";
        else if (index === 11) dot.title = "ViLoMem";
        
        navDotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.nav-dot');

    // Core Navigation Function
    window.goToSlide = (index) => {
        if (isAnimating || index === currentSlideIndex) return;
        if (index < 0 || index >= totalSlides) return;

        isAnimating = true;
        const direction = index > currentSlideIndex ? 'next' : 'prev';

        // Update Slides
        slides[currentSlideIndex].classList.remove('active');
        slides[currentSlideIndex].classList.add('previous'); // Optional styling for exit
        
        // Clean up 'previous' class from other slides
        slides.forEach(s => {
            if (s !== slides[currentSlideIndex] && s !== slides[index]) {
                s.classList.remove('previous');
            }
        });

        slides[index].classList.add('active');
        slides[index].classList.remove('previous');

        // Update Dots
        dots[currentSlideIndex].classList.remove('active');
        dots[index].classList.add('active');

        currentSlideIndex = index;

        // Reset animation lock
        setTimeout(() => {
            isAnimating = false;
        }, 800); // Match CSS transition time
    };

    const nextSlide = () => goToSlide(currentSlideIndex + 1);
    const prevSlide = () => goToSlide(currentSlideIndex - 1);

    // Keyboard Controls
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
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
        }
    });

    // Mouse Wheel Control (Throttled)
    let lastWheelTime = 0;
    const wheelCooldown = 1000; // ms

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
    }, { passive: false });

    // Touch Controls (Swipe)
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50;
        if (touchStartY - touchEndY > threshold) {
            nextSlide(); // Swipe Up -> Next
        } else if (touchEndY - touchStartY > threshold) {
            prevSlide(); // Swipe Down -> Prev
        }
    }
});