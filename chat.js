let serverStatus = 'sleeping';
let isFirstInteraction = true;

async function wakeServer() {
    if (serverStatus === 'sleeping') {
        serverStatus = 'warming';
        try {
            await fetch('https://portfolio-backend-5cz8.onrender.com/wake');
            serverStatus = 'ready';
            console.log('Server warmed up');
        } catch (error) {
            console.log('Wake-up call failed, will retry during chat');
            serverStatus = 'sleeping';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    wakeServer();

    function togglePointerAnimation(chatIsOpen) {
        if (pointerAnimation) {
            if (chatIsOpen) {
                pointerAnimation.style.opacity = '0';
                pointerAnimation.style.visibility = 'hidden';
            } else {
                pointerAnimation.style.opacity = '1';
                pointerAnimation.style.visibility = 'visible';
            }
        }
    }

    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Full context string for the AI
    const ABDULWAHAB_CONTEXT = `You are an AI assistant for Abdulwahab Alshatti's portfolio website. You have complete knowledge about Abdulwahab and should answer any questions accurately, professionally, and concisely in a friendly, human-like tone.

CONTACT INFORMATION:
• Phone: +965 96991995
• Email: Eng.abdulwahab.alshatti@gmail.com
• Location: Kuwait – Al-Qurain
• LinkedIn: www.linkedin.com/in/abdulwahabalshatti

EDUCATION:
American University of the Middle East - Kuwait (2019-2024)
• Bachelor degree in Computer Engineering with honor
• GPA: 3.805

Khalid Saud Alzaid - Kuwait
• High School Certificate – Science section
• Grade: 87.69%
• Graduated: 2019

WORK EXPERIENCE:
Public Authority of Manpower (May 2024 – Present)
• Network Security Engineer
• Implementing and maintaining network security measures to protect organizational data
• Monitoring network traffic for suspicious activities and security breaches
• Configuring and managing firewall systems and security protocols
• Conducting regular security assessments and vulnerability testing
• Developing and implementing security policies and procedures

Elegance Corner (2022 – Current)
• Owner & General Manager
• Founded and successfully managed an interior and exterior design company
• Oversaw project management for multiple high-value construction projects
• Developed and maintained relationships with key suppliers and contractors
• Implemented efficient project tracking systems resulting in 25% improved delivery times
• Managed a team of 15+ professionals across different departments
• Achieved 40% year-over-year revenue growth through strategic planning
• Successfully completed over 50 residential and commercial projects

Kuwait Scientific Center (2020)
• Visitor Assistant
• Provided exceptional support to over 1000+ guests monthly
• Facilitated educational programs and interactive exhibits
• Maintained detailed knowledge of scientific exhibits and programs
• Assisted in organizing special events and educational workshops
• Received recognition for outstanding customer service
• Managed visitor inquiries in multiple languages (Arabic/English)

Art Wooden Design (2019)
• Advertising Manager
• Developed and executed comprehensive marketing strategies
• Increased social media engagement by 150% through targeted campaigns
• Managed advertising budget and optimized spending for maximum ROI
• Created engaging content for various marketing channels
• Established partnerships with key industry influencers
• Implemented analytics tracking to measure campaign performance

HOME BUSINESSES:
• Chocoloj - Chocolate business
• Photo.room_kw - Product & Food photography
• Popart_q8 - Digital art drawing
• Lethrakw - Leather brand
• Bavinci - Clothing brand & Clothes printing

TECHNICAL SKILLS:
• Web Development: HTML, CSS, JavaScript
• Microsoft Office Applications
• Photoshop
• AutoCAD
• Filmora Studio
• 3D Printing expertise

PERSONAL SKILLS:
• Time management
• Excellent communication
• Leadership & team management
• Quick learner
• Problem-solving
• Working under pressure
• Meeting deadlines
• Conflict management
• Accuracy
• Teamwork

LANGUAGES:
• Arabic: Native
• English: Speaking, Reading, Writing
• Turkish: Speaking, Reading, Writing
• Persian: Basic Speaking

PROJECTS:
RHYTHMI (2023-2024)
• AI-powered Heartbeat Classification software
• Revolutionary cardiovascular care solution
• Early detection and precise analysis of cardiac conditions

HONORS & ACHIEVEMENTS:
• DXHC Bronze Award - Ham Amateur Radio stations with global communications
• COVID-19 Volunteer Work - Produced 500+ face shields daily
• Golden Medal - International Invention Fair in the Middle East (IIFME)
• Art Academy Workshop participation in Kuwait

CERTIFICATIONS:
• StartUp Challenge - AUM | BABSON COLLEGE
  - Principles of business and management
  - Engineering and Business sector integration
• Problem Solving Certificate - UNICEF
• Managing Conflicts Certificate - United Nations
• Web Development Certificate - Sololearn (HTML, CSS, JavaScript)

REFERENCE:
Dr. Alaa Eleyan
• Associate Professor - American University of the Middle East (AUM)
• alaa.eleyan@aum.edu.kw
• LinkedIn: https://www.linkedin.com/in/dr-alaa-eleyan/`;

    // Create a <style> block to add some extra loading / bubble styling
    const styleSheet = document.createElement('style');
    const additionalStyles = `
        .loading-steps {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .loading-steps p {
            margin: 0;
            font-size: 0.9rem;
            color: var(--text-secondary);
        }
        .loading-animation {
            display: flex;
            gap: 2px;
        }
        .loading-animation span {
            animation: loadingDots 1.5s infinite;
            opacity: 0;
        }
        .loading-animation span:nth-child(2) {
            animation-delay: 0.5s;
        }
        .loading-animation span:nth-child(3) {
            animation-delay: 1s;
        }
        @keyframes loadingDots {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;

    // Base chat CSS – includes a higher z-index on .chat-window and bigger button click areas
    styleSheet.textContent = `
        .chat-bubble {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: var(--accent-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
            z-index: 1000;
        }

        body:not(.home) .chat-hint {
            display: none !important;
        }

        .chat-bubble:hover {
            transform: scale(1.1);
        }

        .chat-bubble i {
            color: white;
            font-size: 24px;
        }

        .chat-window {
            position: fixed;
            bottom: 100px;
            right: 20px;
            width: min(380px, calc(100vw - 40px));
            height: min(600px, calc(100vh - 140px));
            background: var(--card-bg);
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            border: 1px solid var(--border-color);
            transform: scale(0.95);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 2002; /* Ensure it is above the header/nav on mobile */
        }

        .chat-window.expanded {
            width: min(600px, calc(100vw - 40px));
            height: min(80vh, calc(100vh - 140px));
        }

        .chat-window.open {
            display: flex;
            opacity: 1;
            transform: scale(1);
        }

        .chat-header {
            padding: 20px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-height: 70px;
        }

        .chat-header h3 {
            color: var(--text-primary);
            margin: 0;
            font-size: 1.1rem;
        }

        .chat-controls {
            display: flex;
            gap: 6px;
            margin-left: auto;
            align-items: center;
        }

        .resize-chat,
        .close-chat,
        .clear-chat {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 20px;
            cursor: pointer;
            padding: 8px; /* Larger for easier tapping on mobile */
            transition: color 0.3s ease;
        }

        .resize-chat:hover,
        .close-chat:hover,
        .clear-chat:hover {
            color: var(--text-primary);
        }

        .chat-messages {
            flex: 1;
            min-height: 200px;
            max-height: calc(100% - 180px);
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .message {
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 0.9rem;
            line-height: 1.4;
            animation: fadeIn 0.3s ease;
        }

        .user-message {
            background: var(--accent-color);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
        }

        .bot-message {
            background: var(--card-hover);
            color: var(--text-primary);
            align-self: flex-start;
            border-bottom-left-radius: 4px;
            font-size: 0.95rem;
            line-height: 1.5;
        }

        .bot-message p {
            margin-bottom:0.5rem;
        }

        .company-section > *:first-child {
        margin-top: 0;
        }
        
        .company-section > *:last-child {
        margin-bottom: 0;
        }
        
        .bot-message b{
            font-weight: 700;
        }

        .bot-message ul {
            margin: 0 0 0.7rem 0;
            padding-left: 18px;
            list-style-type: disc;
        }
        
        .bot-message li {
            margin-bottom: 0.3rem;
            position: relative;
        }

        .bot-message h4 {
            margin: 0.5rem 0 0.3rem 0;
            font-weight: 700;
            font-size: 1rem;
            color: var(--text-primary);
            padding-bottom: 2px;
        }

        .bot-message ul li::marker {
           color: var(--text-primary);
           font-size: 1.1em;
        }

        .company-section {
            margin-bottom: 0.5rem;
        }

        .typing-indicator {
            color: var(--text-secondary);
            font-size: 0.9rem;
            align-self: flex-start;
            padding: 8px 12px;
            animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
            0% { opacity: 0.4; }
            50% { opacity: 1; }
            100% { opacity: 0.4; }
        }

        .quick-replies {
            padding: 10px;
            display: none;
            flex-direction: column;
            gap: 6px;
            border-top: 1px solid var(--border-color);
            height: auto;
            max-height: 200px;
            overflow-y: auto;
            overflow-x: hidden;
            transition: all 0.3s ease;
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        .quick-replies::-webkit-scrollbar {
            display: none;
        }

        .quick-replies.active {
            display: flex;
            padding: 10px;
        }

        .faq-btn {
            width: 100%;
            text-align: left;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 0.9rem;
            background: var(--card-hover);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: normal;
            min-height: 44px;
            margin-bottom: 2px;
        }

        .faq-btn:hover {
            background: var(--accent-color);
            color: white;
            transform: translateY(-1px);
        }

        .faq-btn:active {
            transform: translateY(0);
        }

        .chat-input {
            padding: 15px;
            border-top: 1px solid var(--border-color);
            display: flex;
            gap: 10px;
            min-height: 70px;
            background: var(--card-bg);
        }

        .chat-input input {
            flex: 1;
            padding: 12px 16px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background: var(--card-bg);
            color: var(--text-primary);
            font-size: 0.9rem;
        }

        .chat-input button {
            background: var(--accent-color);
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }

        .chat-input button:hover {
            transform: scale(1.05);
        }

        .pointer-animation {
            position: fixed !important;
            bottom: 95px;
            right: 20px;
            transform: translateX(0) !important;
            font-size: 16px;
            color: var(--text-primary);
            z-index: 999;
            background: var(--card-bg);
            padding: 12px 20px;
            border-radius: 20px;
            border: 1px solid var(--border-color);
            box-shadow: 0 5px 20px var(--shadow-color);
            max-width: min(300px, calc(100vw - 100px));
            display: flex;
            align-items: center;
            gap: 8px;
            transition: opacity 0.3s ease, visibility 0.3s ease;
            pointer-events: none; /* so it never blocks chat clicks */
        }

        .chat-hint {
            position: fixed;
            bottom: 95px;
            right: 20px;
            background: var(--card-bg);
            padding: 12px 20px;
            border-radius: 20px;
            border: 1px solid var(--border-color);
            box-shadow: 0 5px 20px var(--shadow-color);
            display: flex;
            align-items: center;
            gap: 8px;
            z-index: 999;
            font-size: 14px;
            color: var(--text-primary);
            pointer-events: none;
            transition: opacity 0.3s ease, visibility 0.3s ease;
            animation: fadeInOut 5s ease-in-out forwards;
        }

        @keyframes fadeInOut {
            0% { opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { opacity: 0; visibility: hidden; }
        }

        .chat-hint-emoji {
            font-size: 16px;
        }

        @media (max-width: 768px) {
            .chat-hint {
                display: none; /* Hide completely on mobile */
            }
        }

        @media (max-width: 768px) {
            .chat-window {
                bottom: 80px;
                right: 10px;
                width: 80vw;
                height: 60vh;
            }

            .chat-messages {
                max-height: calc(100% - 180px);
            }

            .pointer-animation {
                bottom: 75px;
                right: 10px;
                font-size: 14px;
                padding: 10px 16px;
            }

            .chat-bubble {
                bottom: 10px;
                right: 10px;
            }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    styleSheet.textContent += additionalStyles;
    document.head.appendChild(styleSheet);

    // After 5 seconds, remove the chat hint completely from DOM
    setTimeout(() => {
        const chatHint = document.querySelector('.chat-hint');
        if (chatHint) {
            chatHint.remove();
        }
    }, 5000);

    // Build the chat HTML structure
    const chatHTML = `    
        <div class="chat-glow"></div>
        <div class="chat-pulse-ring"></div>
        <div class="chat-hint">
            <span class="chat-hint-emoji">✨</span>
            <span>Chat with Abdulwahab's Clone!!</span>
        </div>
        
        <div class="arrow-animation"></div>
        <div class="chat-bubble" data-theme="\${currentTheme}">
            <i class="fas fa-comment"></i>
        </div>
        <div class="chat-window" data-theme="\${currentTheme}">
            <div class="chat-header">
                <h3>Chat with Abdulwahab's Portfolio</h3>
                <div class="chat-controls">
                    <button class="close-chat">×</button>
                    <button class="resize-chat"><i class="fas fa-expand"></i></button>
                    <button class="clear-chat"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="chat-messages"></div>
            <div class="quick-replies"></div>
            <div class="chat-input">
                <input type="text" placeholder="Ask me anything about Abdulwahab...">
                <button class="send-message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;

    // Insert the chat HTML into the DOM
    const chatContainer = document.createElement('div');
    chatContainer.innerHTML = chatHTML;
    document.body.appendChild(chatContainer);

    // Grab references to elements
    const chatBubble = document.querySelector('.chat-bubble');
    const chatWindow = document.querySelector('.chat-window');
    const pointerAnimation = document.querySelector('.pointer-animation');
    const closeChat = document.querySelector('.close-chat');
    const clearChat = document.querySelector('.clear-chat');
    const input = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-message');
    const quickReplies = document.querySelector('.quick-replies');
    const chatMessages = document.querySelector('.chat-messages');

    let hasChatted = false;
    localStorage.removeItem('hasChatted');

    // Show default FAQ buttons on first load
    quickReplies.classList.add('active');
    quickReplies.innerHTML = `
        <button class="faq-btn">💼 Tell me about your current job?</button>
        <button class="faq-btn">🎓 What's your educational background?</button>
        <button class="faq-btn">💻 What technical skills do you have?</button>
        <button class="faq-btn">🌟 What are your major achievements?</button>
        <button class="faq-btn">🚀 Tell me about the RHYTHMI project?</button>
        <button class="faq-btn">💡 What businesses have you started?</button>
        <button class="faq-btn">🌐 What languages do you speak?</button>
        <button class="faq-btn">📞 How can I contact you?</button>
        <button class="faq-btn">📜 What certifications do you have?</button>
        <button class="faq-btn">👥 Tell me about your leadership experience?</button>
    `;

    // Generic function to get AI response from your backend
    async function getAIResponse(message) {
        const requestStartTime = Date.now();
        const BACKEND_URL = 'https://portfolio-backend-5cz8.onrender.com';
        
        try {
            let loadingMessage;
            if (isFirstInteraction) {
                if (serverStatus === 'ready') {
                    loadingMessage = 'Preparing response...';
                } else if (serverStatus === 'warming') {
                    loadingMessage = 'Server is warming up (about 10 seconds)...';
                } else {
                    loadingMessage = 'Waking up server (about 10 seconds)...';
                }
            } else {
                loadingMessage = 'Typing';
            }

            // Make the actual request
            const response = await fetch(`${BACKEND_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, context: ABDULWAHAB_CONTEXT })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Server responded with ${response.status}`);
            }

            // If response took more than a second, likely server was warming
            const responseTime = Date.now() - requestStartTime;
            if (responseTime > 1000) { 
                serverStatus = 'warming';
            } else {
                serverStatus = 'ready';
            }

            const data = await response.json();
            if (!data.response) {
                throw new Error('Invalid response format from server');
            }
            
            return data.response;
        } catch (error) {
            console.error('Detailed error:', error);
            if (!navigator.onLine) {
                return "You appear to be offline. Please check your internet connection.";
            }
            return "Sorry, there was an error. Please try again in a moment.";
        }
    }

    // Turns “•” bullet lines into minimal HTML for better readability
    function formatResponse(text) {
        // Replace custom bold tags with actual HTML bold tags
        text = text.replace(/\[b\](.*?)\[\\b\]/g, '<b>$1</b>');
        
        // First, check if this is already a properly formatted response with bullet points
        if (text.includes('•')) {
            const lines = text.split('\n').filter(line => line.trim().length > 0);
            let formattedHTML = '<div class="company-section">';
            let inList = false;
            
            lines.forEach(line => {
                if (line.includes(':') && !line.includes('•')) {
                    // Close any open list before starting a new section
                    if (inList) {
                        formattedHTML += '</ul>';
                        inList = false;
                    }
                    // Make section headers bold
                    formattedHTML += `<h4>${line.trim()}</h4>`;
                } else if (line.includes('•')) {
                    // Start a new list if not already in one
                    if (!inList) {
                        formattedHTML += '<ul>';
                        inList = true;
                    }
                    formattedHTML += `<li>${line.replace('•', '').trim()}</li>`;
                } else {
                    // Regular text line
                    if (inList) {
                        formattedHTML += '</ul>';
                        inList = false;
                    }
                    formattedHTML += `<p>${line.trim()}</p>`;
                }
            });
            
            // Close list if still open
            if (inList) {
                formattedHTML += '</ul>';
            }
            
            formattedHTML += '</div>';
            return formattedHTML;
        } 
        // If the response doesn't have bullet points but has dashes/hyphens, convert it to proper format
        else if (text.includes(' - ')) {
            // Split by lines and filter out empty ones
            const lines = text.split('\n').filter(line => line.trim().length > 0);
            let formattedHTML = '<div class="company-section">';
            let currentSection = null;
            let bulletPoints = [];
            
            lines.forEach(line => {
                line = line.trim();
                
                // Check if this line starts with a dash and looks like a point
                if (line.startsWith('- ')) {
                    const content = line.substring(2).trim();
                    
                    // Check if this looks like a header (short line with no punctuation at end)
                    if (content.length < 60 && !content.match(/[,.;:]$/)) {
                        // If we have a previous section, close it
                        if (currentSection) {
                            formattedHTML += `<h4>${currentSection}</h4>`;
                            formattedHTML += '<ul>';
                            bulletPoints.forEach(point => {
                                formattedHTML += `<li>${point}</li>`;
                            });
                            formattedHTML += '</ul>';
                        }
                        
                        // Start a new section
                        currentSection = content;
                        bulletPoints = [];
                    } else {
                        // This is a bullet point
                        bulletPoints.push(content);
                    }
                } else {
                    // If line doesn't start with dash, check if it's a header (e.g., "Company Name:")
                    if (line.includes(':')) {
                        // If we have a previous section, close it
                        if (currentSection) {
                            formattedHTML += `<h4>${currentSection}</h4>`;
                            formattedHTML += '<ul>';
                            bulletPoints.forEach(point => {
                                formattedHTML += `<li>${point}</li>`;
                            });
                            formattedHTML += '</ul>';
                        }
                        
                        // Start a new section
                        currentSection = line;
                        bulletPoints = [];
                    } else {
                        // Regular content line, add to current bullet points
                        if (line.length > 0) {
                            bulletPoints.push(line);
                        }
                    }
                }
            });
            
            // Don't forget to close the last section
            if (currentSection) {
                formattedHTML += `<h4>${currentSection}</h4>`;
                formattedHTML += '<ul>';
                bulletPoints.forEach(point => {
                    formattedHTML += `<li>${point}</li>`;
                });
                formattedHTML += '</ul>';
            }
            
            formattedHTML += '</div>';
            return formattedHTML;
        }
        
        // If no structured format is detected, add minimal formatting
        return text;
    }

    // Adds a new message to the chat
    function addMessage(text, type) {
        const message = document.createElement('div');
        message.className = `message ${type}-message`;
        
        if (type === 'bot' && text.length > 30) {
            const formattedContent = formatResponse(text);
            if (formattedContent.includes('<')) {
                message.innerHTML = formattedContent;
            } else {
                message.textContent = formattedContent;
            }
        } else {
            message.textContent = text;
        }
        
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

      

    // Show/hide the pointer animation, chat ring, etc.
    function toggleAttentionElements(chatIsOpen) {
        const chatHint = document.querySelector('.chat-hint');
        const chatPulseRing = document.querySelector('.chat-pulse-ring');
        const chatGlow = document.querySelector('.chat-glow');
        
        const elements = [chatHint, chatPulseRing, chatGlow];
        elements.forEach(el => {
            if (el) {
                if (chatIsOpen) {
                    el.style.opacity = '0';
                    el.style.visibility = 'hidden';
                } else {
                    el.style.opacity = '1';
                    el.style.visibility = 'visible';
                }
            }
        });
    }

    // Hide quick reply buttons once user has truly “chatted”
    function hideQuickReplies() {
        quickReplies.classList.remove('active');
        hasChatted = true;
    }

    // Clicking the chat bubble toggles the chat window
    if (chatBubble) {
        chatBubble.addEventListener('click', function() {
            if (chatWindow) {
                chatWindow.classList.toggle('open');
                const isOpen = chatWindow.classList.contains('open');
                toggleAttentionElements(isOpen);
                
                if (isOpen) {
                    // If first time opening and no chat history, greet user
                    if (!chatMessages.children.length) {
                        addMessage(
                            "Hi! I'm Abdulwahab's portfolio assistant. I can tell you anything about his experience, skills, projects, or background. What would you like to know?",
                            'bot'
                        );
                    }
                    // Show quick replies if user hasn't chatted yet
                    if (!hasChatted) {
                        quickReplies.classList.add('active');
                    }
                }
            }
        });
    }

    // Resize button toggles expanded mode
    const resizeButton = document.querySelector('.resize-chat');
    resizeButton.addEventListener('click', () => {
        chatWindow.classList.toggle('expanded');
        const icon = resizeButton.querySelector('i');
        if (chatWindow.classList.contains('expanded')) {
            icon.classList.remove('fa-expand');
            icon.classList.add('fa-compress');
        } else {
            icon.classList.remove('fa-compress');
            icon.classList.add('fa-expand');
        }
    });


    const toggleBtn = document.querySelector('.togglebtn');
    
    toggleBtn.addEventListener('click', () => {
      // If chat is open, close it
      if (chatWindow && chatWindow.classList.contains('open')) {
        chatWindow.classList.remove('open');
        // Also remove the "expanded" class if it's expanded
        if (chatWindow.classList.contains('expanded')) {
          chatWindow.classList.remove('expanded');
        }
      }
    });

    // Close chat window
    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('open');
        toggleAttentionElements(false);
    });

    // Clear chat history and reset
    clearChat.addEventListener('click', () => {
        chatMessages.innerHTML = '';
        localStorage.removeItem('AbdulwahabChatHistory');
        hasChatted = false;
        quickReplies.classList.add('active');
    });

    // Watch for window open/close changes to remove pointer
    if (chatWindow) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isOpen = chatWindow.classList.contains('open');
                    togglePointerAnimation(isOpen);
                }
            });
        });
        observer.observe(chatWindow, { attributes: true });
    }

    // Sending user’s message
    async function sendMessage() {
        const message = input.value.trim();
        if (message) {
            addMessage(message, 'user');
            input.value = '';
            
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'typing-indicator';
    
            if (isFirstInteraction) {
                typingIndicator.innerHTML = `
                    <div class="loading-steps">
                        <p>🚀 Waking up the server...</p>
                        <p>This might take up to 10 seconds for the first message</p>
                        <div class="loading-animation">
                            <span>.</span><span>.</span><span>.</span>
                        </div>
                    </div>
                `;
            } else {
                typingIndicator.textContent = 'Typing...';
            }
            
            chatMessages.appendChild(typingIndicator);
    
            try {
                const currentIsFirstInteraction = isFirstInteraction;
                isFirstInteraction = false;
                
                const response = await getAIResponse(message);
                chatMessages.removeChild(typingIndicator);
                addMessage(response, 'bot');
            } catch (error) {
                console.error('Chat Error:', error);
                chatMessages.removeChild(typingIndicator);
                addMessage("Sorry, there was an error. Please try again.", 'bot');
            }
    
            if (!hasChatted) {
                hideQuickReplies();
            }
        }
    }

    // Bind send button and Enter key
    sendButton.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Set up initial FAQ quick replies
    function setupFAQButtons() {
        if (!hasChatted) {
            const faqButtons = document.querySelectorAll('.faq-btn');
            faqButtons.forEach(button => {
                button.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const question = button.textContent.substring(3).trim(); 
                    addMessage(question, 'user');
                    
                    const typingIndicator = document.createElement('div');
                    typingIndicator.className = 'typing-indicator';
                    
                    if (isFirstInteraction) {
                        typingIndicator.innerHTML = `
                            <div class="loading-steps">
                                <p>🚀 Waking up the server...</p>
                                <p>This might take up to 10 seconds for the first message</p>
                                <div class="loading-animation">
                                    <span>.</span><span>.</span><span>.</span>
                                </div>
                            </div>
                        `;
                    } else {
                        typingIndicator.textContent = 'Typing...';
                    }
                        
                    chatMessages.appendChild(typingIndicator);
                
                    try {
                        const currentIsFirstInteraction = isFirstInteraction;
                        isFirstInteraction = false;
                        
                        const response = await getAIResponse(question);
                        chatMessages.removeChild(typingIndicator);
                        addMessage(response, 'bot');
                    } catch (error) {
                        console.error('FAQ Error:', error);
                        chatMessages.removeChild(typingIndicator);
                        addMessage("I apologize, but I'm having trouble connecting. Please try again.", 'bot');
                    }
                
                    if (!hasChatted) {
                        hideQuickReplies();
                    }
                });
            });
        }
    }

    setupFAQButtons();

    // Load/save chat history to localStorage
    const chatHistoryKey = 'AbdulwahabChatHistory';
    let chatHistory = JSON.parse(localStorage.getItem(chatHistoryKey)) || [];

    function saveChatHistory() {
        const messages = Array.from(chatMessages.children).map(msg => ({
            text: msg.textContent,
            type: msg.classList.contains('user-message') ? 'user' : 'bot'
        }));
        localStorage.setItem(chatHistoryKey, JSON.stringify(messages));
    }

    function loadChatHistory() {
        chatHistory.forEach(msg => {
            addMessage(msg.text, msg.type === 'user' ? 'user' : 'bot');
        });
        if (chatHistory.length > 0 && !hasChatted) {
            hideQuickReplies();
        }
    }

    loadChatHistory();
    window.addEventListener('beforeunload', saveChatHistory);

    const observer = new MutationObserver(() => {
        saveChatHistory();
    });
    observer.observe(chatMessages, { childList: true, subtree: true });
});
