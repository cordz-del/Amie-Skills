// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Emotion boxes interaction (new behavior)
  const emotionBoxes = document.querySelectorAll('.emotion-box');
  let moodSelected = false;
  
  window.handleMoodClick = function(elem) {
    if (moodSelected) return; // Prevent multiple selections
    moodSelected = true;
    
    // Disable all other emotion boxes
    emotionBoxes.forEach(box => {
      if (box !== elem) {
        box.classList.add('disabled');
        box.style.pointerEvents = 'none';
      }
    });
    
    // Apply spin animation to the clicked box
    elem.classList.add('spin-animation');
    
    // After the spin, replace content with a green check mark and confirmation message
    setTimeout(() => {
      elem.innerHTML = `<div class="check-mark">&#10003;</div>
                        <p>Your feeling has been logged.</p>`;
      // After a short delay, open the modal pop-up
      setTimeout(() => {
        const modal = document.getElementById('actionModal');
        if (modal) {
          modal.style.display = 'block';
        }
      }, 500);
    }, 1000);
  };

  // Skill buttons interaction
  const skillButtons = document.querySelectorAll('.skill-btn');
  skillButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const skillName = this.parentElement.querySelector('h3').textContent;
      console.log(`Starting ${skillName}`);
      // Add a brief "clicked" animation class
      this.classList.add('clicked');
      
      // Remove the animation class after the animation completes
      setTimeout(() => {
        this.classList.remove('clicked');
      }, 300);
    });
  });

  // Create a mobile nav toggle (hamburger icon) for responsive menus
  const navToggle = document.createElement('button');
  navToggle.className = 'nav-toggle';
  navToggle.innerHTML = '<span></span><span></span><span></span>';
  
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    document.querySelector('.nav-container').insertBefore(navToggle, navLinks);
  
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      this.classList.toggle('active');
    });
  }
  
  // Smooth scroll for anchor links (e.g., #someSection)
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
  
  // Fade-in animation when elements scroll into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });
  
  // Apply the observer to emotion boxes and skill cards
  document.querySelectorAll('.emotion-box, .skill-card').forEach(el => {
    observer.observe(el);
  });
  
  // Modal choice functions
  window.chooseAction = function(action) {
    console.log(`User chose to ${action}`);
    // Here you can add additional functionality based on the user's choice.
    document.getElementById('actionModal').style.display = 'none';
  };
});

// --- Additional CSS injected dynamically ---
const styleSheet = `
  /* Fade-in animation for elements */
  .fade-in {
    animation: fadeIn 0.5s ease-in forwards;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  
  /* Brief "clicked" scale animation for skill buttons */
  .skill-btn.clicked {
    transform: scale(0.95);
  }
  
  /* Mobile nav toggle button (hamburger icon) */
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
      margin-left: auto;
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
      flex-direction: column;
      align-items: center;
    }
    .nav-links.show {
      display: flex;
    }
  }
`;

// Inject the additional CSS into the document
const styleElement = document.createElement('style');
styleElement.textContent = styleSheet;
document.head.appendChild(styleElement);
