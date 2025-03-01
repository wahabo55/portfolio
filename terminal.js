document.addEventListener('DOMContentLoaded', function() {
    const aboutContent = `
$ whoami
> Abdulwahab Alshatti

$ cat education.txt
> Bachelor in Computer Engineering
  - American University of the Middle East - Kuwait
  - GPA: 3.805
  - Expected Graduation: 2024

$ cat experience.txt
> Public Authority of Manpower | May 2024 - Present
  - Network Security Engineer
  - Implementing network security measures
  - Managing firewall systems and protocols
  - Conducting security assessments
  - Developing security policies

> Elegance Corner | 2022 - Present
  - Owner & General Manager
  - Interior and exterior design and construction company
  - Managing operations and client relationships

> Kuwait Scientific Center | 2020
  - Visitor Assistant (Part-time)
  - Customer service with international visitors
  - Working under high-pressure environments

> Art Wooden Design | 2019
  - Manager of Advertising Department
  - Led social media and advertising initiatives
  - Designed promotional materials

$ cat skills.txt
> Technical Skills:
  - Web Development (HTML, CSS, JavaScript)
  - Microsoft Office Applications
  - Photoshop & AutoCAD
  - Filmora Studio
  - 3D Printing

> Personal Skills:
  - Time Management
  - Communication
  - Leadership
  - Problem Solving
  - Quick Learning
  - Working Under Pressure

$ cat languages.txt
> - Arabic: Native
  - English: Fluent (Speaking, Reading, Writing)
  - Turkish: Fluent (Speaking, Reading, Writing)
  - Persian: Basic Speaking

$ cat achievements.txt
> - DXHC Bronze Award | Ham Amateur Radio Stations
  - COVID-19 Achievement - Produced 500+ Face Shields Daily
  - Golden Medal - International Invention Fair (IIFME)
  - StartUp Challenge Certificate - AUM & BABSON COLLEGE
  - Problem Solving Certificate - UNICEF
  - Managing Conflicts Certificate - United Nations

$ cat businesses.txt
> Home Businesses:
  - Chocoloj (Chocolate Business)
  - Photo.room_kw (Product & Food Photography)
  - Popart_q8 (Digital Art)
  - Lethrakw (Leather Brand)
  - Bavinci (Clothing Brand & Printing)
`;

    const terminalContent = document.querySelector('.terminal-content');
    let currentLine = 0;
    const lines = aboutContent.trim().split('\n');
    
    function typeWriter() {
        if (currentLine < lines.length) {
            const line = lines[currentLine];
            const element = document.createElement('div');
            
            if (line.startsWith('$')) {
                element.className = 'command';
                element.style.color = 'var(--terminal-command)';
            } else if (line.startsWith('>')) {
                element.className = 'output';
                element.style.color = 'var(--terminal-output)';
            } else {
                element.className = 'output';
                element.style.color = 'var(--terminal-text)';
            }
            
            element.textContent = line;
            terminalContent.appendChild(element);
            terminalContent.scrollTop = terminalContent.scrollHeight;
            currentLine++;
            
            // Random typing speed between 30ms and 100ms
            setTimeout(typeWriter, Math.random() * 70 + 30);
        }
    }

    // Start typing effect
    typeWriter();
});