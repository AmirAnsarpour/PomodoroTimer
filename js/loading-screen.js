const loadingScreen = document.querySelector(".main-loader-ex");
let loadingOpacity = 1;
let loadingKey;

// Create orange elements for the loading screen
function enhanceLoadingScreen() {
    // Add background glow
    const glow = document.createElement('div');
    glow.className = 'loading-glow';
    loadingScreen.appendChild(glow);
    
    // Change loading dot colors
    const dots = document.querySelectorAll(".loader-ex-dot");
    dots.forEach((dot, index) => {
        dot.style.backgroundColor = '#ff6b00';
        dot.style.boxShadow = '0 0 15px rgba(255, 107, 0, 0.7)';
        // Add staggered animation
        dot.style.animationDelay = `${index * 0.15}s`;
    });
}

function changeLoadingOpacity() {
    loadingOpacity -= 0.05;
    loadingScreen.style.opacity = loadingOpacity;
    
    if (loadingOpacity <= 0) {
        clearInterval(loadingKey);
        loadingScreen.classList.add("hidden");
    }
}

window.addEventListener("load", function () {
    // Enhance the loading screen first
    enhanceLoadingScreen();
    
    // Start a small delay before fading out
    setTimeout(() => {
        loadingKey = setInterval(changeLoadingOpacity, 40);
    }, 500);
});
