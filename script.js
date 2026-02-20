document.getElementById('goButton').addEventListener('click', function() {
    const select = document.getElementById('pageSelect');
    if (select.value) {
        window.location.href = select.value;
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
