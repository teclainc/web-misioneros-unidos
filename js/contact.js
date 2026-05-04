document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');

            inputs.forEach(input => {
                const group = input.parentElement;
                if (!input.value.trim()) {
                    group.classList.add('error');
                    isValid = false;
                } else if (input.type === 'email' && !validateEmail(input.value)) {
                    group.classList.add('error');
                    isValid = false;
                } else {
                    group.classList.remove('error');
                }
            });

            if (isValid) {
                // Simulate API call
                formResponse.textContent = 'Enviando mensaje...';
                formResponse.className = 'form-response success';
                formResponse.style.display = 'block';

                setTimeout(() => {
                    formResponse.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        formResponse.style.display = 'none';
                    }, 5000);
                }, 1500);
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
