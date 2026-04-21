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
    const fallbackUrl =
        "/redirect/redirect.html" +
        "?service=" + encodeURIComponent(serviceName) +
        "&to=" + encodeURIComponent(url);

    window.location.href = fallbackUrl;
}
