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

function checkService(url, serviceName) {
    const timeout = 5000;
    let done = false;

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;
    document.body.appendChild(iframe);

    const timer = setTimeout(() => {
        if (done) return;
        done = true;

        iframe.remove();
        redirectToFallback(serviceName, url);
    }, timeout);

    iframe.onload = () => {
        if (done) return;
        done = true;

        clearTimeout(timer);
        iframe.remove();

        window.location.href = url;
    };

    iframe.onerror = () => {
        if (done) return;
        done = true;

        clearTimeout(timer);
        iframe.remove();

        redirectToFallback(serviceName, url);
    };
}

function redirectToFallback(serviceName, url) {
    const fallbackUrl =
        "/service-unavailable.html" +
        "?service=" + encodeURIComponent(serviceName) +
        "&url=" + encodeURIComponent(url);

    window.location.href = fallbackUrl;
}
