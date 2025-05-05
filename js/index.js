let minutes = 25;
let seconds = 0;
let timerId;
let isTimerRunning = false;
let totalTime = minutes * 60 + seconds;
let timeRemaining = totalTime;
let currentMode = 'pomodoro';

let settings = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 10
};

const timerElement = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("reset");
const pomodoroBtn = document.getElementById("Pomodoro");
const shortBreakBtn = document.getElementById("ShortBreak");
const longBreakBtn = document.getElementById("LongBreak");
const progressFill = document.getElementById("progress-fill");
const settingsIcon = document.getElementById("settings-icon");
const settingsPanel = document.getElementById("settings-panel");
const saveSettingsBtn = document.getElementById("save-settings");
const notificationSound = document.getElementById("notification-sound");
const completionSound = document.getElementById("completion-sound");

const pomodoroTimeInput = document.getElementById("pomodoro-time");
const shortBreakTimeInput = document.getElementById("short-break-time");
const longBreakTimeInput = document.getElementById("long-break-time");

function initSettings() {
    const savedSettings = localStorage.getItem('pomodoroSettings');
    if (savedSettings) {
        settings = JSON.parse(savedSettings);
        
        pomodoroTimeInput.value = settings.pomodoro;
        shortBreakTimeInput.value = settings.shortBreak;
        longBreakTimeInput.value = settings.longBreak;
        
        if (currentMode === 'pomodoro') {
            minutes = settings.pomodoro;
            seconds = 0;
            updateTimerDisplay();
        }
    }
}

function saveSettings() {
    settings = {
        pomodoro: parseInt(pomodoroTimeInput.value) || 25,
        shortBreak: parseInt(shortBreakTimeInput.value) || 5,
        longBreak: parseInt(longBreakTimeInput.value) || 10
    };
    
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
    
    resetTimerToCurrentMode();
    
    settingsPanel.classList.remove('visible');
    
    showCustomAlert('Settings Saved', 'Your timer settings have been updated.');
}

function showCustomAlert(title, message) {
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alertElement = document.createElement('div');
    alertElement.className = 'custom-alert';
    alertElement.innerHTML = `
        <h3>${title}</h3>
        <p>${message}</p>
    `;
    
    document.body.appendChild(alertElement);
    
    setTimeout(() => {
        if (alertElement.parentNode) {
            alertElement.parentNode.removeChild(alertElement);
        }
    }, 3500);
}

function startTimer() {
    if (isTimerRunning) return;
    
    isTimerRunning = true;
    startBtn.classList.add("hidden");
    stopBtn.classList.remove("hidden");
    timerElement.classList.remove("pulse");
    
    notificationSound.currentTime = 0;
    notificationSound.play();
    
    if (timeRemaining === totalTime) {
        totalTime = minutes * 60 + seconds;
        timeRemaining = totalTime;
    }
    
    timerId = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (seconds > 0) {
        seconds--;
    } else if (minutes > 0) {
        minutes--;
        seconds = 59;
    } else {
        clearInterval(timerId);
        isTimerRunning = false;
        
        completionSound.currentTime = 0;
        completionSound.play();
        
        showNotification();
        
        showCustomAlert('Time\'s Up!', 'Your timer session has ended.');
        
        resetTimerToCurrentMode();
        
        return;
    }
    
    timeRemaining = minutes * 60 + seconds;
    
    updateProgressBar();
    
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutesStr = minutes.toString().padStart(2, "0");
    const secondsStr = seconds.toString().padStart(2, "0");
    
    timerElement.innerHTML = `${minutesStr}:${secondsStr}`;
    document.title = `${minutesStr}:${secondsStr} - Pomodoro Timer`;
}

function updateProgressBar() {
    const progress = ((totalTime - timeRemaining) / totalTime) * 100;
    progressFill.style.width = `${progress}%`;
}

function resetProgressBar() {
    progressFill.style.width = "0%";
}

function stopTimer() {
    clearInterval(timerId);
    isTimerRunning = false;
    startBtn.classList.remove("hidden");
    stopBtn.classList.add("hidden");
    timerElement.classList.add("pulse");
}

function resetTimer() {
    clearInterval(timerId);
    isTimerRunning = false;
    
    resetTimerToCurrentMode();
    
    startBtn.classList.remove("hidden");
    stopBtn.classList.add("hidden");
    
    pomodoroBtn.classList.add("clicked");
    shortBreakBtn.classList.remove("clicked");
    longBreakBtn.classList.remove("clicked");
    
    currentMode = 'pomodoro';
}

function resetTimerToCurrentMode() {
    switch(currentMode) {
        case 'pomodoro':
            minutes = settings.pomodoro;
            break;
        case 'shortBreak':
            minutes = settings.shortBreak;
            break;
        case 'longBreak':
            minutes = settings.longBreak;
            break;
    }
    
    seconds = 0;
    timeRemaining = minutes * 60;
    totalTime = timeRemaining;
    
    updateTimerDisplay();
    resetProgressBar();
    timerElement.classList.add("pulse");
}

function setPomodoro() {
    clearInterval(timerId);
    isTimerRunning = false;
    
    minutes = settings.pomodoro;
    seconds = 0;
    timeRemaining = minutes * 60;
    totalTime = timeRemaining;
    
    updateTimerDisplay();
    resetProgressBar();
    currentMode = 'pomodoro';
}

function setShortBreak() {
    clearInterval(timerId);
    isTimerRunning = false;
    
    minutes = settings.shortBreak;
    seconds = 0;
    timeRemaining = minutes * 60;
    totalTime = timeRemaining;
    
    updateTimerDisplay();
    resetProgressBar();
    currentMode = 'shortBreak';
}

function setLongBreak() {
    clearInterval(timerId);
    isTimerRunning = false;
    
    minutes = settings.longBreak;
    seconds = 0;
    timeRemaining = minutes * 60;
    totalTime = timeRemaining;
    
    updateTimerDisplay();
    resetProgressBar();
    currentMode = 'longBreak';
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

function showNotification() {
    if (Notification.permission === "granted") {
        const options = {
            body: "Time's up!",
            icon: "https://img.icons8.com/fluency/48/000000/timer.png"
        };
        const notification = new Notification("Pomodoro Timer", options);
        notification.onclick = function () {
            window.focus();
        };
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                showNotification();
            }
        });
    }
}

pomodoroBtn.addEventListener("click", function () {
    startBtn.classList.remove("hidden");
    stopBtn.classList.add("hidden");

    pomodoroBtn.classList.add("clicked");
    shortBreakBtn.classList.remove("clicked");
    longBreakBtn.classList.remove("clicked");
});

shortBreakBtn.addEventListener("click", function () {
    startBtn.classList.remove("hidden");
    stopBtn.classList.add("hidden");

    pomodoroBtn.classList.remove("clicked");
    shortBreakBtn.classList.add("clicked");
    longBreakBtn.classList.remove("clicked");
});

longBreakBtn.addEventListener("click", function () {
    startBtn.classList.remove("hidden");
    stopBtn.classList.add("hidden");

    pomodoroBtn.classList.remove("clicked");
    shortBreakBtn.classList.remove("clicked");
    longBreakBtn.classList.add("clicked");
});

startBtn.addEventListener("click", function () {
    startBtn.classList.add("hidden");
    stopBtn.classList.remove("hidden");
});

stopBtn.addEventListener("click", function () {
    startBtn.classList.remove("hidden");
    stopBtn.classList.add("hidden");
});

resetBtn.addEventListener("click", function () {
    startBtn.classList.remove("hidden");
    stopBtn.classList.add("hidden");
    pomodoroBtn.classList.add("clicked");
    shortBreakBtn.classList.remove("clicked");
    longBreakBtn.classList.remove("clicked");
});

settingsIcon.addEventListener("click", function() {
    settingsPanel.classList.toggle("visible");
});

saveSettingsBtn.addEventListener("click", saveSettings);

document.addEventListener("click", function(event) {
    if (settingsPanel.classList.contains("visible") && 
        !settingsPanel.contains(event.target) && 
        event.target !== settingsIcon) {
        settingsPanel.classList.remove("visible");
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === " " || event.code === "Space") {
        if (isTimerRunning) {
            stopTimer();
        } else {
            startTimer();
        }
        event.preventDefault();
    } else if (event.key === "r" || event.code === "KeyR") {
        resetTimer();
    } else if (event.key === "f" || event.code === "KeyF") {
        toggleFullScreen();
    } else if (event.key === "s" || event.code === "KeyS") {
        settingsPanel.classList.toggle("visible");
    }
});

window.addEventListener("load", function() {
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
    }
    
    initSettings();
    
    updateTimerDisplay();
    resetProgressBar();
});