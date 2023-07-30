const loadingScreen = document.querySelector(".main-loader-ex");
let loadingOpacity = 1;
let loadingKey;

function changeLoadingOpacity() {
    loadingOpacity -= 0.1
    loadingScreen.style.opacity = loadingOpacity;
    if (loadingOpacity <= 0) {
        clearInterval(loadingKey);
        loadingScreen.classList.add("hidden");
    }
}

window.addEventListener("load", function () {
    loadingKey = setInterval(changeLoadingOpacity, 50);
});
