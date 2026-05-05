document.addEventListener('DOMContentLoaded', () => {
    // Initialize Supabase client
    const SUPABASE_URL = 'https://nqrufknquzzebxvzxibc.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcnVma25xdXp6ZWJ4dnp4aWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMTEwMzQsImV4cCI6MjA5MzU4NzAzNH0.6GByYJW_jDQl2fYlhm8Qo6hk94cpvkrfjcfIQQw4gSY';
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
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
                // Collect form data
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value,
                };

                // Update UI to sending state
                formResponse.textContent = 'Enviando mensaje...';
                formResponse.className = 'form-response success';
                formResponse.style.display = 'block';

                try {
                    // Send data to Supabase
                    const { error } = await supabaseClient
                        .from('contact_messages')
                        .insert([formData]);

                    if (error) throw error;

                    // Success response
                    formResponse.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        formResponse.style.display = 'none';
                    }, 5000);

                } catch (error) {
                    console.error('Error sending message:', error);
                    formResponse.textContent = 'Hubo un error al enviar el mensaje. Por favor, intenta más tarde.';
                    formResponse.className = 'form-response error';
                }
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
