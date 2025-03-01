document.addEventListener('DOMContentLoaded', function() {
    // Contact Popup Elements
    const contactButton = document.querySelector('#nav-contact');
    const contactPopup = document.querySelector('#contact-popup');
    const popupOverlay = document.querySelector('#popup-overlay');
    const closePopup = document.querySelector('.close-popup');
    const downloadCVButton = document.querySelector('.btn[href*="Download"]');
    const heroContactButton = document.querySelector('#contact-btn');
    const cvButton = document.querySelector('.cv-download-button');
    
    // Mobile Menu Elements
    const toggleBtn = document.querySelector('.togglebtn');
    const navLinks = document.querySelector('.navlinks');

    if (cvButton) {
        // Handle tooltip display
        cvButton.addEventListener('mouseenter', function() {
            this.classList.add('show-tooltip');
        });
        
        cvButton.addEventListener('mouseleave', function() {
            this.classList.remove('show-tooltip');
        });
        
        // Add touch support for mobile devices
        cvButton.addEventListener('touchstart', function(e) {
            // Prevent default to avoid triggering download immediately on touch devices
            e.preventDefault();
            this.classList.toggle('show-tooltip');
            
            // Set a timeout to actually follow the link if they hold
            setTimeout(() => {
                if (this.classList.contains('show-tooltip')) {
                    window.location.href = this.getAttribute('href');
                }
            }, 1500); // 1.5 second delay
        });
        
        // Hide CV button tooltip when other UI elements are active
        if (contactPopup) {
            contactPopup.addEventListener('click', function() {
                cvButton.classList.remove('show-tooltip');
            });
        }
    }

    if (!document.querySelector('.cv-floating-button')) {
        // Create the button element
        const cvButton = document.createElement('a');
        cvButton.className = 'cv-floating-button';
        cvButton.href = 'assets/Abdulwahab_CV.pdf';
        cvButton.setAttribute('download', '');
        cvButton.setAttribute('aria-label', 'Download CV');
        
        // Create the icon
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-file-pdf';
        cvButton.appendChild(icon);
        
        // Create the text label
        const textLabel = document.createElement('span');
        textLabel.className = 'button-text';
        textLabel.textContent = 'Download CV';
        cvButton.appendChild(textLabel);
        
        // Add to the document
        document.body.appendChild(cvButton);
      }
    

    const profileImg = document.querySelector('.profile-img');
    const photoModalOverlay = document.querySelector('.photo-modal-overlay');
    const closePhotoModal = document.querySelector('.close-photo-modal');
    
    if (profileImg && photoModalOverlay && closePhotoModal) {
        profileImg.addEventListener('click', () => {
            photoModalOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    
        closePhotoModal.addEventListener('click', () => {
            photoModalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        });
    
        photoModalOverlay.addEventListener('click', (e) => {
            if (e.target === photoModalOverlay) {
                photoModalOverlay.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && photoModalOverlay.style.display === 'flex') {
                photoModalOverlay.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // Contact Popup Functions
    function openContactPopup() {
        if (contactPopup && popupOverlay) {
            contactPopup.classList.add('active');
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeContactPopup() {
        if (contactPopup && popupOverlay) {
            contactPopup.classList.remove('active');
            popupOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Typing effect
    const typingElement = document.querySelector('.input');
    if (typingElement && typeof Typed !== 'undefined') {
        new Typed('.input', {
            strings: ["A Network security engineer", "A Business Enthusiast"],
            typeSpeed: 70,
            backSpeed: 55,
            loop: true
        });
    }

    // Theme Switcher
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeToggle) {
        themeToggle.checked = savedTheme === 'light';
        themeToggle.addEventListener('change', (e) => {
            const newTheme = e.target.checked ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Contact Popup Event Listeners
    if (contactButton) {
        contactButton.addEventListener('click', function(e) {
            e.preventDefault();
            openContactPopup();
        });
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            // If contact popup is open, close it when toggle menu is clicked
            if (contactPopup.classList.contains('active')) {
                closeContactPopup();
            }
        });
    }

    if (heroContactButton) {
        heroContactButton.addEventListener('click', function(e) {
            e.preventDefault();
            openContactPopup();
        });
    }

    if (closePopup) {
        closePopup.addEventListener('click', closeContactPopup);
    }

    if (popupOverlay) {
        popupOverlay.addEventListener('click', closeContactPopup);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeContactPopup();
        }
    });

    // Mobile Menu Toggle
    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link or outside
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside (on overlay or body)
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Section Loading
    function loadSection(section) {
        fetch(`${section}.html`)
            .then(response => response.text())
            .then(html => {
                document.getElementById('main-content').innerHTML = html;
            });
        history.pushState({}, '', `/${section}`);
    }

    // Mobile Device Check
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Phone link behavior
    const phoneCard = document.querySelector('.contact-card[href^="tel:"]');
    if (phoneCard) {
        phoneCard.addEventListener('click', function(e) {
            if (!isMobileDevice()) {
                e.preventDefault();
            }
        });
    }

    // Initialize AOS if it exists
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }

    // Language Switcher
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        const langText = langToggle.querySelector('.lang-text');
        const currentLang = localStorage.getItem('lang') || 'en';
        
        function setLanguage(lang) {
            if (!translations || !translations[lang]) {
                console.error('Translations not found');
                return;
            }

            document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
            document.documentElement.setAttribute('lang', lang);
            localStorage.setItem('lang', lang);
            langText.textContent = lang === 'ar' ? 'عربي' : 'EN';
            
            const t = translations[lang];

            // Update navigation
            document.querySelectorAll('.navlinks a').forEach(link => {
                const key = link.getAttribute('href').split('.')[0];
                if (key && t.nav[key]) {
                    link.textContent = t.nav[key];
                }
            });

            // Update hero section
            const greeting = document.querySelector('.hero-text h5');
            const description = document.querySelector('.hero-text p');
            const downloadBtn = document.querySelector('.btn.active');
            const contactBtn = document.getElementById('contact-btn');
            const popupTitle = document.querySelector('#contact-popup h2');
            const popupSubtitle = document.querySelector('.popup-subtitle');
            const contactLabels = document.querySelectorAll('.contact-info h3');
            const cvButtonText = document.querySelector('.cv-floating-button .button-text');

            if (greeting) {
                const typedText = greeting.querySelector('.input');
                if (typedText) typedText.innerHTML = '';
                greeting.innerHTML = `${t.hero.greeting} <span class="input"></span>`;
                // Reinitialize Typed.js
                if (typeof Typed !== 'undefined') {
                    new Typed('.input', {
                        strings: t.hero.roles,
                        typeSpeed: 70,
                        backSpeed: 55,
                        loop: true
                    });
                }
            }

            if (description) description.textContent = t.hero.description;
            if (downloadBtn) downloadBtn.textContent = t.hero.downloadCV;
            if (contactBtn) contactBtn.textContent = t.hero.contact;
            if (popupTitle) popupTitle.textContent = t.contact.title;
            if (popupSubtitle) popupSubtitle.textContent = t.contact.subtitle;
            if (cvButtonText) cvButtonText.textContent = t.hero.downloadCV;

            contactLabels.forEach(label => {
                const key = label.textContent.toLowerCase();
                if (t.contact[key]) {
                    label.textContent = t.contact[key];
                }
            });
        }

        // Initialize language
        setLanguage(currentLang);

        // Add click event listener
        langToggle.addEventListener('click', () => {
            const newLang = document.documentElement.lang === 'en' ? 'ar' : 'en';
            setLanguage(newLang);
        });
    }
});