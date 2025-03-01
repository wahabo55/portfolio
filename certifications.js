// certifications.js
document.addEventListener('DOMContentLoaded', function() {
    const certificationsData = [
        {
            title: "AUMers Certificate of Achievement",
            issuer: "American University of the Middle East (AUM)",
            date: "Jul 2024",
            logo: "assets/aum-logo.png",
            description: "Winner in international competition category for RHYTHMI project 2023-2024"
        },
        {
            title: "2nd Place - AUM Innovation Fair 2024",
            issuer: "American University of the Middle East (AUM)",
            date: "May 2024",
            logo: "assets/aum-logo.png",
            description: "Outstanding Graduation Projects Recognition for RHYTHMI"
        },
        {
            title: "Most Innovative Product Award 2024",
            issuer: "Injaz Kuwait",
            date: "May 2024",
            logo: "assets/injaz-logo.png",
            description: "Company Program Competition Winner with RHYTHMI"
        },
        {
            title: "Babson Collaborative Global Student Challenge Finalist",
            issuer: "Babson College",
            date: "May 2024",
            logo: "assets/babson-logo.png",
            description: "Global recognition for RHYTHMI project"
        },
        {
            title: "3rd Place - GCC Hult Innovation Challenge",
            issuer: "Hult International Business School",
            date: "Apr 2024",
            logo: "assets/hult-logo.png",
            description: "Regional innovation recognition for RHYTHMI"
        },
        {
            title: "1st Place - AUM START UP CHALLENGE 2024",
            issuer: "AUM & Babson College",
            date: "Feb 2024",
            logo: "assets/aum-logo.png",
            description: "Winner with cardiovascular care innovation RHYTHMI"
        },
        {
            title: "Gold Medal - IIFME",
            issuer: "International Invention Fair of the Middle East",
            date: "Feb 2024",
            logo: "assets/iifme-logo.png",
            description: "Excellence in invention recognition for RHYTHMI"
        },
        {
            title: "New Employees Training",
            issuer: "Public Authority of Manpower",
            date: "Oct 2024",
            logo: "assets/pam-logo.png",
            description: "Comprehensive employee training certification"
        },
        {
            title: "Splunk Training Workshop",
            issuer: "CyberMAK Information Systems",
            date: "Jul 2024",
            logo: "assets/cybermak-logo.png",
            description: "Advanced Splunk platform training"
        },
        {
            title: "Microsoft Office 365 Training",
            issuer: "EBLA Computer Consultancy",
            date: "May 2024",
            logo: "assets/ebla-logo.png",
            description: "Comprehensive Office 365 suite training"
        },
        {
            title: "Leadership and Management",
            issuer: "Great Learning",
            date: "Mar 2024",
            logo: "assets/great-learning-logo.png",
            description: "Advanced leadership and organizational management"
        },
        {
            title: "Project Management Program (Mini-MBA)",
            issuer: "International Business Management Institute",
            date: "Mar 2024",
            logo: "assets/ibmi-logo.png",
            credentialId: "1214493-170-989-3218",
            description: "Comprehensive business and project management training"
        },
        {
            title: "Elements of AI",
            issuer: "University of Helsinki",
            date: "Feb 2024",
            logo: "assets/helsinki-logo.png",
            description: "2 ECTS credits in Artificial Intelligence fundamentals"
        },
        {
            title: "Introduction to Cyber Security",
            issuer: "Simplilearn",
            date: "Feb 2024",
            logo: "assets/simplilearn-logo.png",
            credentialId: "4899150",
            description: "Comprehensive cybersecurity foundations"
        },
        {
            title: "DXHC Bronze Award",
            issuer: "HamSphere",
            date: "Jan 2023",
            logo: "assets/hamsphere-logo.png",
            description: "Amateur Radio communications achievement with 25+ countries"
        }
    ];

    // Sort certifications by date (newest to oldest)
    certificationsData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });

    const grid = document.querySelector('.certifications-grid');

    function getCurrentTranslations() {
        // Placeholder function for getting current translations
        return {
            certifications: {
                credentialId: "Credential ID:",
                viewCredential: "View Credential"
            }
        };
    }

    const currentLang = 'en'; // Placeholder for current language

    function createCards() {
        certificationsData.forEach(cert => {
            const card = document.createElement('div');
            card.className = 'certification-card';
            const translations = getCurrentTranslations();
            
            card.innerHTML = `
                <div class="cert-logo">
                    <img src="${cert.logo}" alt="${cert.issuer} logo" loading="lazy" />
                </div>
                <h3>${currentLang === 'ar' ? cert.titleAr || cert.title : cert.title}</h3>
                <p class="cert-issuer">${currentLang === 'ar' ? cert.issuerAr || cert.issuer : cert.issuer}</p>
                <p class="cert-date">${cert.date}</p>
                <p class="cert-description">${currentLang === 'ar' ? cert.descriptionAr || cert.description : cert.description}</p>
                ${cert.credentialId ? 
                    `<p class="cert-id">${translations.certifications.credentialId} ${cert.credentialId}</p>` : 
                    ''}
                ${cert.credentialUrl ? 
                    `<a href="${cert.credentialUrl}" class="view-credential" target="_blank" rel="noopener noreferrer">
                        ${translations.certifications.viewCredential}
                    </a>` : 
                    ''}
            `;

            grid.appendChild(card);
        });
    }

    // Initialize
    if (grid) {
        createCards();
    }
});