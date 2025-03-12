const API_BASE_URL = 'https://nodejs-amiemongodb.replit.app';

// DOMContentLoaded ensures the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {

  const emotionBoxes = document.querySelectorAll('.emotion-box');
  let moodSelected = false;
  const SHARED_MOOD_KEY = "sharedMoodData";

  // Record mood via backend API
  async function recordMood(emotion) {
    const username = localStorage.getItem('currentUser');
    if (!username) {
      console.error("No user logged in. Cannot record mood.");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/mood`, {
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
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      console.log("Mood recorded successfully:", data);
    } catch (error) {
      console.error("Error recording mood:", error);
    }
  }

  // Mood box click handler
  window.handleMoodClick = async function(elem) {
    if (moodSelected) return;
    moodSelected = true;

    emotionBoxes.forEach(box => {
      if (box !== elem) {
        box.classList.add('disabled');
        box.style.pointerEvents = 'none';
      }
    });

    const emotion = elem.getAttribute('data-emotion') || "Unknown";
    await recordMood(emotion);

    elem.classList.add('spin-animation');

    setTimeout(() => {
      elem.innerHTML = `<div class="check-mark">&#10003;</div>
                        <p>Your feeling has been logged.</p>`;

      setTimeout(() => {
        const modal = document.getElementById('actionModal');
        if (modal) modal.style.display = 'block';
      }, 500);
    }, 1000);
  };

  // Skill buttons interaction
  document.querySelectorAll('.skill-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const skillName = this.parentElement.querySelector('h3').textContent;
      console.log(`Starting ${skillName}`);
      this.classList.add('clicked');
      setTimeout(() => this.classList.remove('clicked'), 300);
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Fade-in animation on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('fade-in');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.emotion-box, .skill-card').forEach(el => observer.observe(el));

  // Modal action choice
  window.chooseAction = function(action) {
    console.log(`User chose to ${action}`);
    const modal = document.getElementById('actionModal');
    if (modal) modal.style.display = 'none';
  };

  // Logout functionality
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', async function() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/logout`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Logout failed');
        localStorage.clear();
        window.location.href = 'https://cordz-del.github.io/Log-in-Amie/';
      } catch (error) {
        console.error('Logout error:', error);
        alert('Error logging out. Please try again.');
      }
    });
  };

});
