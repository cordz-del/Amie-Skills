document.addEventListener('DOMContentLoaded', () => {
    const emotionBoxes = document.querySelectorAll('.emotion-box');
    const animations = new Map(); // Track animation state for each button

    emotionBoxes.forEach(box => {
        animations.set(box, true); // true = flip, false = spin
        
        box.addEventListener('click', function() {
            const isFlip = animations.get(this);
            const mood = this.querySelector('h3').textContent;
            
            // Remove previous animation classes
            this.classList.remove('flip-animation', 'spin-animation');
            
            // Add new animation
            this.classList.add(isFlip ? 'flip-animation' : 'spin-animation');
            
            // Toggle animation for next click
            animations.set(this, !isFlip);
            
            // Update text after animation
            setTimeout(() => {
                this.innerHTML = `<h3>I am sorry you are ${mood.toLowerCase()} that way.</h3>
                                <p>Would you like to vent about it with Amie?</p>`;
            }, 1000);
        });
    });

    // Handle Track Mood button
    const trackMoodBtn = document.querySelector('.track-mood-btn');
    if (trackMoodBtn) {
        trackMoodBtn.addEventListener('click', () => {
            window.open('https://cordz-del.github.io/Mood-Record-Page/', '_blank');
        });
    }
});
