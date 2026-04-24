const params = new URLSearchParams(window.location.search);

const service = params.get("service") || "This service";
const url = params.get("url");

const modal = document.getElementById("loader-modal");

document.getElementById("message").textContent =
    `${service} is currently unavailable. We're already working on it. Please try again in a few moments.`;

function retry() {
    if (url) {
        checkService(url, service);
    }
}

function goHome() {
    window.location.href = "/";
}

function getHealthUrl(url) {
    const u = new URL(url);
    return `${u.origin}/health`;
}

async function checkService(url, serviceName) {
    showLoader();
    try {
        const healthUrl = getHealthUrl(url);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);

        const res = await fetch(healthUrl, {
            method: "GET"
        });

        clearTimeout(timeout);

        if (res.ok) {
            window.location.href = url;
        } else {
            hideLoader();
            fallback(serviceName, url);
        }

    } catch (e) {
        hideLoader();
        fallback(serviceName, url);
    }
}

function showLoader() {
    modal.classList.remove("hidden");
}

function hideLoader() {
    modal.classList.add("hidden");
}

function fallback(serviceName, url) {
    const fallbackUrl =
        "/fallback/service-unavailable.html" +
        "?service=" + encodeURIComponent(serviceName) +
        "&url=" + encodeURIComponent(url);

    window.location.href = fallbackUrl;
}
