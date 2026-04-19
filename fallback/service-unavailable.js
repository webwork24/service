const params = new URLSearchParams(window.location.search);

const service = params.get("service") || "This service";
const url = params.get("url");

document.getElementById("message").textContent =
    `${service} is currently unavailable. We're already working on it. Please try again in a few moments.`;

function retry() {
    if (url) {
        window.location.href = url;
    }
}

function goHome() {
    window.location.href = "/";
}
