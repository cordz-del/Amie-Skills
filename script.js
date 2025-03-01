// Emotion color mapping
const emotionColors = {
    stressed: '#9F58B0',
    sad: '#8C9EFF',
    angry: '#FF5A5F',
    anxiety: '#FFA500',
    depressed: '#4C4CFF',
    lonely: '#999999'
};

// Current selected emotion and date
let currentEmotion = null;
let selectedDate = null;

// Store emotions data
const emotionsData = {};

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    initializeCalendar();
    initializeEmotionButtons();
    setupEventListeners();
    updateHeaderGradient();
});

function initializeCalendar() {
    const calendar = document.querySelector('.calendar-grid');
    if (!calendar) return;

    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    
    // Clear existing calendar
    calendar.innerHTML = '';

    // Add day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    // Add days
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = i;
        
        const dateKey = formatDate(new Date(today.getFullYear(), today.getMonth(), i));
        if (emotionsData[dateKey]) {
            dayElement.style.backgroundColor = emotionColors[emotionsData[dateKey]];
            dayElement.style.color = 'white';
        }

        dayElement.addEventListener('click', () => handleDateSelection(i));
        calendar.appendChild(dayElement);
    }
}

function initializeEmotionButtons() {
    const emotionButtons = document.querySelectorAll('.emotion-button');
    emotionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const emotion = button.dataset.emotion;
            handleEmotionSelection(emotion);
        });
    });
}

function setupEventListeners() {
    // Login form submission
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Save emotion button
    const saveButton = document.querySelector('.save-emotion');
    if (saveButton) {
        saveButton.addEventListener('click', saveEmotionData);
    }
}

function handleDateSelection(day) {
    const date = new Date();
    date.setDate(day);
    selectedDate = formatDate(date);

    // Update visual selection
    document.querySelectorAll('.calendar-day').forEach(dayElement => {
        dayElement.classList.remove('selected');
        if (parseInt(dayElement.textContent) === day) {
            dayElement.classList.add('selected');
        }
    });

    // Show previously selected emotion if any
    if (emotionsData[selectedDate]) {
        handleEmotionSelection(emotionsData[selectedDate]);
    }
}

function handleEmotionSelection(emotion) {
    currentEmotion = emotion;

    // Update button states
    document.querySelectorAll('.emotion-button').forEach(button => {
        button.classList.remove('selected');
        if (button.dataset.emotion === emotion) {
            button.classList.add('selected');
        }
    });

    // Update header gradient
    updateHeaderGradient();
}

function updateHeaderGradient() {
    const header = document.querySelector('.main-header');
    const logo = document.querySelector('.logo h1');
    
    if (currentEmotion && header && logo) {
        const color = emotionColors[currentEmotion];
        document.documentElement.style.setProperty('--current-emotion-color', color);
        
        // Update header gradient
        header.style.background = `linear-gradient(45deg, ${color}22, #ffffff)`;
        
        // Update logo gradient
        logo.style.background = `linear-gradient(45deg, ${color}, #89cfff)`;
        logo.style.webkitBackgroundClip = 'text';
        logo.style.webkitTextFillColor = 'transparent';
    }
}

function saveEmotionData() {
    if (!selectedDate || !currentEmotion) {
        showNotification('Please select both a date and an emotion.');
        return;
    }

    emotionsData[selectedDate] = currentEmotion;
    
    // Update calendar visual
    updateCalendarDay(selectedDate, currentEmotion);
    
    // Save to localStorage
    localStorage.setItem('emotionsData', JSON.stringify(emotionsData));
    
    showNotification('Emotion saved successfully!');
}

function updateCalendarDay(date, emotion) {
    const day = new Date(date).getDate();
    const dayElement = document.querySelector(`.calendar-day:nth-child(${day + 7})`);
    
    if (dayElement) {
        dayElement.style.backgroundColor = emotionColors[emotion];
        dayElement.style.color = 'white';
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const rememberMe = document.querySelector('#remember-me').checked;

    // Add your authentication logic here
    console.log('Login attempted:', { username, password, rememberMe });
    
    // Example authentication (replace with actual authentication)
    if (username && password) {
        // Simulate successful login
        showNotification('Login successful!');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        showNotification('Please fill in all fields.', 'error');
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate notification
    notification.style.animation = 'slideIn 0.5s ease-out';
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Load saved emotions data from localStorage
function loadSavedData() {
    const saved = localStorage.getItem('emotionsData');
    if (saved) {
        Object.assign(emotionsData, JSON.parse(saved));
        initializeCalendar(); // Refresh calendar with saved data
    }
}

// Initialize saved data when page loads
document.addEventListener('DOMContentLoaded', loadSavedData);

// Add animation keyframes to the document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateY(-100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-100%); opacity: 0; }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        z-index: 1000;
    }
    
    .notification.success {
        background-color: #4CAF50;
    }
    
    .notification.error {
        background-color: #f44336;
    }
`;
document.head.appendChild(style);
