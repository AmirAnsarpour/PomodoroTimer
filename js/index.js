let minutes = 25;
let seconds = 0;
let timerId;

let pomodoroBtn = document.querySelector("#Pomodoro");
let shortBtn = document.querySelector("#ShortBreak");
let longBtn = document.querySelector("#LongBreak");

let startBtn = document.querySelector("#startBtn");
let stopBtn = document.querySelector("#stopBtn");
let resetBtn = document.querySelector("#reset");

function startTimer() {
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
        alert("Time's up!");
    }

    const minutesStr = minutes.toString().padStart(2, "0");
    const secondsStr = seconds.toString().padStart(2, "0");
    document.getElementById("timer").innerHTML = `${minutesStr}:${secondsStr}`;
    document.title = `${minutesStr}:${secondsStr} - Pomodoro Timer`;
}

function stopTimer() {
    clearInterval(timerId);
}

function resetTimer() {
    clearInterval(timerId);
    minutes = 25;
    seconds = 0;
    document.getElementById("timer").innerHTML = "25:00";
}

function setPomodoro() {
    clearInterval(timerId);
    minutes = 25;
    seconds = 0;
    document.getElementById("timer").innerHTML = "25:00";
}

function setShortBreak() {
    clearInterval(timerId);
    minutes = 5;
    seconds = 0;
    document.getElementById("timer").innerHTML = "05:00";
}

function setLongBreak() {
    clearInterval(timerId);
    minutes = 10;
    seconds = 0;
    document.getElementById("timer").innerHTML = "10:00";
}

pomodoroBtn.addEventListener("click", function () {
    startBtn.classList.remove("hidden");
    stopBtn.classList.add("hidden");

    pomodoroBtn.classList.add("clicked");
    shortBtn.classList.remove("clicked");
    longBtn.classList.remove("clicked");
});
shortBtn.addEventListener("click", function () {
    startBtn.classList.remove("hidden");
    stopBtn.classList.add("hidden");

    pomodoroBtn.classList.remove("clicked");
    shortBtn.classList.add("clicked");
    longBtn.classList.remove("clicked");
});
longBtn.addEventListener("click", function () {
    startBtn.classList.remove("hidden");
    stopBtn.classList.add("hidden");

    pomodoroBtn.classList.remove("clicked");
    shortBtn.classList.remove("clicked");
    longBtn.classList.add("clicked");
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
    shortBtn.classList.remove("clicked");
    longBtn.classList.remove("clicked");
});

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}