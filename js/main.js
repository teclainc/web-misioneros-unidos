document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
            });
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

    // Countdown for Salta 2026
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const countdownDate = new Date('June 5, 2026 19:00:00').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            if (distance < 0) {
                countdownElement.innerHTML = '<h3>¡El viaje ha comenzado!</h3>';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minsEl = document.getElementById('minutes');
            const secsEl = document.getElementById('seconds');

            if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minsEl) minsEl.textContent = minutes.toString().padStart(2, '0');
            if (secsEl) secsEl.textContent = seconds.toString().padStart(2, '0');
        };

        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

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
        }, 3000);
    }
});
