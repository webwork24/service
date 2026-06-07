
const modal = document.getElementById("loader-modal");

document.querySelectorAll(".cta-button").forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        checkService(this.href, this.textContent.trim());
    });
});

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
        hideLoader();

        if (res.ok) {
            window.location.href = url;
        } else {
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
