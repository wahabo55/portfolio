document.addEventListener('DOMContentLoaded', function() {
    // Work experience data
    const workData = {
        'pam': {
            title: 'Network Security Engineer',
            company: 'Public Authority of Manpower',
            duration: 'May 2024 – Present',
            icon: 'fa-shield-alt',
            bgClass: 'pam-bg',
            logo: 'assets/pam-logono.png',
            achievements: [
                'Implementing and maintaining network security measures to protect organizational data and systems',
                'Monitoring network traffic for suspicious activities and potential security breaches',
                'Configuring and managing firewall systems and security protocols',
                'Conducting regular security assessments and vulnerability testing',
                'Developing and implementing security policies and procedures'
            ]
        },
        'elegance': {
            title: 'Owner & General Manager',
            company: 'Elegance Corner',
            duration: '2022 – Current',
            icon: 'fa-building',
            bgClass: 'elegance-bg',
            logo: 'assets/elegance-logo.png',
            achievements: [
                'Founded and successfully managed an interior and exterior design company',
                'Oversaw project management for multiple high-value construction projects',
                'Developed and maintained relationships with key suppliers and contractors',
                'Implemented efficient project tracking systems resulting in 25% improved delivery times',
                'Managed a team of 15+ professionals across different departments',
                'Achieved 40% year-over-year revenue growth through strategic planning',
                'Successfully completed over 50 residential and commercial projects'
            ]
        },
        'kuwait-scientific': {
            title: 'Visitor Assistant',
            company: 'Kuwait Scientific Center',
            duration: '2020',
            icon: 'fa-microscope',
            bgClass: 'ksc-bg',
            logo: 'assets/ksc-logo.png',
            achievements: [
                'Provided exceptional visitor support and guidance to over 1000+ guests monthly',
                'Facilitated educational programs and interactive exhibits for diverse audiences',
                'Maintained detailed knowledge of scientific exhibits and programs',
                'Assisted in organizing and conducting special events and educational workshops',
                'Received recognition for outstanding customer service and problem-solving abilities',
                'Managed visitor inquiries in multiple languages including Arabic and English'
            ]
        },
        'art-wooden': {
            title: 'Advertising Manager',
            company: 'Art Wooden Design',
            duration: '2019',
            icon: 'fa-palette',
            bgClass: 'awd-bg',
            logo: 'assets/awd-logo.png',
            achievements: [
                'Developed and executed comprehensive marketing strategies',
                'Increased social media engagement by 150% through targeted campaigns',
                'Managed advertising budget and optimized spending for maximum ROI',
                'Created engaging content for various marketing channels',
                'Established partnerships with key industry influencers',
                'Implemented analytics tracking to measure campaign performance'
            ]
        },
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
                // Trigger animations by adding class
                entry.target.querySelectorAll('.timeline-item').forEach(item => {
                    item.style.animation = 'none';
                    item.offsetHeight; // Trigger reflow
                    item.style.animation = null;
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the section is visible
    });

    // Observe the timeline container
    const timelineContainer = document.querySelector('.timeline-container');
    if (timelineContainer) {
        observer.observe(timelineContainer);
    }

    // DOM Elements
    const workCards = document.querySelectorAll('.work-card');
    const modal = document.querySelector('.work-modal');
    const modalOverlay = document.querySelector('.work-modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const achievementsList = document.querySelector('.achievements');
    const modalLogo = document.querySelector('.modal-logo');
    const modalTitle = document.querySelector('.modal-company-info h2');
    const modalCompany = document.querySelector('.modal-company-info h3');
    const modalDuration = document.querySelector('.modal-duration');

    // Show modal function
    function showModal(company) {
        const data = workData[company];
        
        modalLogo.innerHTML = data.logo ? 
            `<img src="${data.logo}" alt="${data.company} logo">` : 
            `<i class="fas ${data.icon}"></i>`;
        
        modalLogo.className = `modal-logo ${data.bgClass}`;
        modalTitle.textContent = data.title;
        modalCompany.textContent = data.company;
        modalDuration.textContent = data.duration;
        
        // Clear and populate achievements
        achievementsList.innerHTML = '';
        data.achievements.forEach(achievement => {
            const li = document.createElement('li');
            li.textContent = achievement;
            achievementsList.appendChild(li);
        });

        // Show modal with animation
        modalOverlay.style.display = 'block';
        modal.style.display = 'block';
        setTimeout(() => {
            modalOverlay.style.opacity = '1';
            modal.classList.add('active');
        }, 10);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    // Hide modal function
    function hideModal() {
        modal.classList.remove('active');
        modalOverlay.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    // Event Listeners
    workCards.forEach(card => {
        card.addEventListener('click', () => {
            const chatWindow = document.querySelector('.chat-window');
            if (chatWindow && chatWindow.classList.contains('open')) {
              chatWindow.classList.remove('open');
              // Also remove 'expanded' if set
              if (chatWindow.classList.contains('expanded')) {
                chatWindow.classList.remove('expanded');
              }
            }
            const company = card.dataset.company;
            showModal(company);
        });
    });

    modalClose.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', hideModal);

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            hideModal();
        }
    });
});