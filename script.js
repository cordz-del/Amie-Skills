// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Emotion boxes interaction
    const emotionBoxes = document.querySelectorAll('.emotion-box');
    emotionBoxes.forEach(box => {
        box.addEventListener('click', function() {
            // Remove active class from all boxes
            emotionBoxes.forEach(b => b.classList.remove('active'));
            // Add active class to clicked box
            this.classList.add('active');
            
            // You can add additional functionality here
            const emotion = this.querySelector('h3').textContent;
            console.log(`Selected emotion: ${emotion}`);
        });
    });

    // Skill buttons interaction
    const skillButtons = document.querySelectorAll('.skill-btn');
    skillButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const skillName = this.parentElement.querySelector('h3').textContent;
            console.log(`Starting ${skillName}`);
            // Add animation class
            this.classList.add('clicked');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });

    // Navigation menu for mobile
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const navLinks = document.querySelector('.nav-links');
    document.querySelector('.nav-container').insertBefore(navToggle, navLinks);

    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        this.classList.toggle('active');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add some animation when scrolling into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.emotion-box, .skill-card').forEach(el => {
        observer.observe(el);
    });
});

// Add these CSS classes to your style.css
const styleSheet = `
    .fade-in {
        animation: fadeIn 0.5s ease-in forwards;
    }

    .skill-btn.clicked {
        transform: scale(0.95);
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .nav-toggle {
        display: none;
    }

    @media (max-width: 768px) {
        .nav-toggle {
            display: block;
            background: none;
            border: none;
            cursor: pointer;
            padding: 10px;
        }

        .nav-toggle span {
            display: block;
            width: 25px;
            height: 3px;
            background-color: #333;
            margin: 5px 0;
            transition: 0.3s;
        }

        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }

        .nav-links {
            display: none;
            width: 100%;
        }

        .nav-links.show {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
`;

// Add the styles to the document
const styleElement = document.createElement('style');
styleElement.textContent = styleSheet;
document.head.appendChild(styleElement);
