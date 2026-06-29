async function updateLanguage(lang) {
    try {
        const path = window.location.pathname.includes('/pages/') ? '../locales/' : './locales/';
        const response = await fetch(`${path}${lang}.json`);
        if (!response.ok) throw new Error('Could not load translation file');
        const translations = await response.json();

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');
            
            let translation = translations;
            for (const k of keys) {
                translation = translation ? translation[k] : null;
            }

            if (translation) {
                if (element.tagName === 'INPUT' && element.getAttribute('placeholder')) {
                    element.setAttribute('placeholder', translation);
                } else if (element.tagName === 'OPTION') {
                    element.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        document.documentElement.lang = lang;
        localStorage.setItem('preferredLang', lang);
        
        document.querySelectorAll('.lang-switch').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function initI18n() {
    const savedLang = localStorage.getItem('preferredLang') || 'es';
    updateLanguage(savedLang);

    document.addEventListener('click', e => {
        const switcher = e.target.closest('.lang-switch');
        if (switcher) {
            e.preventDefault();
            const lang = switcher.getAttribute('data-lang');
            updateLanguage(lang);
        }
    });
}

document.addEventListener('DOMContentLoaded', initI18n);
