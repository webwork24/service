document.getElementById('goButton').addEventListener('click', function() {
    const select = document.getElementById('pageSelect');
    if (select.value) {
        // window.location.href = select.value;
        checkService(this.href, this.textContent.trim());
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

function checkService(url, serviceName) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    fetch(url, {
        method: "HEAD",
        mode: "no-cors",
        signal: controller.signal
    })
    .then(() => {
        clearTimeout(timeout);
        window.location.href = url;
    })
    .catch(() => {
        clearTimeout(timeout);

        const fallbackUrl =
            "/service-unavailable.html" +
            "?service=" + encodeURIComponent(serviceName) +
            "&url=" + encodeURIComponent(url);

        window.location.href = fallbackUrl;
    });
}
