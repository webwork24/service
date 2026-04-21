const params = new URLSearchParams(window.location.search);
const url = params.get("to");

// try redirect
setTimeout(() => {
    window.location.href = url;
}, 100);

// fallback if error
setTimeout(() => {
    window.location.href =
        "/service-unavailable.html?url=" + encodeURIComponent(url);
}, 4000);
