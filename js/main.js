document.addEventListener('DOMContentLoaded', () => {
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

    if (carouselSlides && prevBtn && nextBtn) {
        let currentIndex = 0;
        const totalSlides = carouselSlides.children.length;

        const updateCarousel = () => {
            carouselSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });

        // Auto-slide every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    }
});
