document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll-triggered animations ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (revealElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        revealElements.forEach(el => observer.observe(el));
    }

    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger) {
        burger.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            burger.classList.toggle('active');
            burger.setAttribute('aria-expanded', isActive);
            burger.setAttribute('aria-label', isActive ? 'Cerrar menú' : 'Abrir menú');
        });
    }

    // Close menu when clicking a link
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                burger.setAttribute('aria-label', 'Abrir menú');
            });
        });
    }

    // Copy CVU Logic for Donations Page
    const copyCvuBtn = document.getElementById('copy-cvu-btn');
    const cvuTextEl = document.getElementById('cvu-text');

    if (copyCvuBtn && cvuTextEl) {
        copyCvuBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const cvuValue = cvuTextEl.textContent.replace('CVU: ', '').trim();
            try {
                await navigator.clipboard.writeText(cvuValue);
                const originalText = copyCvuBtn.textContent;
                copyCvuBtn.textContent = '¡Copiado!';
                copyCvuBtn.style.backgroundColor = 'var(--success-color)';
                
                setTimeout(() => {
                    copyCvuBtn.textContent = originalText;
                    copyCvuBtn.style.backgroundColor = '';
                }, 2000);
            } catch (err) {
                console.error('Error copying CVU:', err);
                alert('No se pudo copiar el CVU automáticamente.');
            }
        });
    }

    // Mark active link based on current path
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath === linkPath || (currentPath === '/' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Carousel Logic for Media Page
    const carouselSlides = document.getElementById('carouselSlides');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pauseBtn = document.getElementById('pauseBtn');

    if (carouselSlides && prevBtn && nextBtn) {
        let currentIndex = 0;
        let autoSlideInterval = null;
        let isPaused = false;
        const totalSlides = carouselSlides.children.length;

        const updateCarousel = () => {
            carouselSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        const startAutoSlide = () => {
            autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel();
            }, 5000);
        };

        const stopAutoSlide = () => {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        };

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });

        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                if (isPaused) {
                    startAutoSlide();
                    pauseBtn.setAttribute('aria-label', 'Pausar carrusel');
                    pauseBtn.innerHTML = '⏸';
                } else {
                    stopAutoSlide();
                    pauseBtn.setAttribute('aria-label', 'Reanudar carrusel');
                    pauseBtn.innerHTML = '▶';
                }
                isPaused = !isPaused;
            });

            // Pause on hover
            carouselSlides.parentElement.addEventListener('mouseenter', () => {
                if (!isPaused) stopAutoSlide();
            });

            carouselSlides.parentElement.addEventListener('mouseleave', () => {
                if (!isPaused) startAutoSlide();
            });

            // Pause when focus enters the carousel
            carouselSlides.parentElement.addEventListener('focusin', () => {
                if (!isPaused) stopAutoSlide();
            });

            carouselSlides.parentElement.addEventListener('focusout', () => {
                if (!isPaused) startAutoSlide();
            });
        }

        startAutoSlide();
    }
});
