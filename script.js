const API_BASE_URL = 'https://nodejs-amiemongodb.replit.app'; 

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // -------------------------------
  // Emotion Boxes Interaction & Mood Recording
  // -------------------------------
  const emotionBoxes = document.querySelectorAll('.emotion-box');
  let moodSelected = false;
  const SHARED_MOOD_KEY = "sharedMoodData";

  // Function to record mood via backend API
  async function recordMood(emotion) {
    const username = localStorage.getItem('currentUser');
    if (!username) {
      console.error("No user logged in. Cannot record mood.");
      return;
    }
    try {
      const response = await fetch(${API_BASE_URL}/api/mood, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({ username, emotion, intensity: 5, notes: "" })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || HTTP error! status: ${response.status});
      }
      console.log("Mood recorded successfully:", data);
    } catch (error) {
      console.error("Error recording mood:", error);
    }
  }

  // Updated mood box click handler
  window.handleMoodClick = async function(elem) {
    if (moodSelected) return; // Prevent multiple selections
    moodSelected = true;
    
    // Disable all other emotion boxes
    emotionBoxes.forEach(box => {
      if (box !== elem) {
        box.classList.add('disabled');
        box.style.pointerEvents = 'none';
      }
    });
    
    // Retrieve emotion from data attribute
    const emotion = elem.getAttribute('data-emotion') || "Unknown";
    
    // Record the mood via the backend
    await recordMood(emotion);
    
    // Apply spin animation to the clicked box
    elem.classList.add('spin-animation');
    
    // After spin animation, replace content with check mark and confirmation message
    setTimeout(() => {
      elem.innerHTML = <div class="check-mark">&#10003;</div>
                        <p>Your feeling has been logged.</p>;
      // After a short delay, open the modal pop-up
      setTimeout(() => {
        const modal = document.getElementById('actionModal');
        if (modal) {
          modal.style.display = 'block';
        }
      }, 500);
    }, 1000);
  };

  // -------------------------------
  // Skill Buttons Interaction
  // -------------------------------
  const skillButtons = document.querySelectorAll('.skill-btn');
  skillButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const skillName = this.parentElement.querySelector('h3').textContent;
      console.log(Starting ${skillName});
      // Brief "clicked" animation
      this.classList.add('clicked');
      setTimeout(() => {
        this.classList.remove('clicked');
      }, 300);
    });
  });

  // -------------------------------
  // Mobile Navigation Toggle
  // -------------------------------
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
  
  // -------------------------------
  // Smooth Scroll for Anchor Links
  // -------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // -------------------------------
  // Fade-in Animation on Scroll
  // -------------------------------
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.emotion-box, .skill-card').forEach(el => {
    observer.observe(el);
  });
  
  // -------------------------------
  // Modal Choice Functions
  // -------------------------------
  window.chooseAction = function(action) {
    console.log(User chose to ${action});
    const modal = document.getElementById('actionModal');
    if (modal) modal.style.display = 'none';
    // Additional functionality based on the action can be added here.
  };

  // -------------------------------
  // Logout Functionality (Simplified)
  // -------------------------------
  // Instead of calling a logout endpoint, simply clear localStorage and redirect.
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', function() {
      localStorage.clear();
      window.location.href = 'https://cordz-del.github.io/Log-in-Amie/';
    });
  }
});

// --- Additional CSS injected dynamically ---
const styleSheet = 
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
;
const styleElement = document.createElement('style');
styleElement.textContent = styleSheet;
document.head.appendChild(styleElement);
