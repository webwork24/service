document.getElementById('goButton').addEventListener('click', function() {
    const select = document.getElementById('pageSelect');
    if (select.value) {
        // window.location.href = select.value;
        const label = select.selectedOptions[0].text;
        checkService(select.value, label.trim());
    }
});

function openModal() {
    document.getElementById("helpModal").classList.add("active");
}

function closeModal() {
    document.getElementById("helpModal").classList.remove("active");
}

window.addEventListener("click", function(e) {
    const modal = document.getElementById("helpModal");
    if (e.target === modal) {
        closeModal();
    }
});

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

