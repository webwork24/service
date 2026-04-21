const params = new URLSearchParams(window.location.search);
const serviceName = params.get("service");
const url = params.get("to");

// try redirect
setTimeout(() => {
    window.location.href = url;
}, 100);

// fallback if error
setTimeout(() => {
    window.location.href =
        "/fallback/service-unavailable.html?url=" + encodeURIComponent(url) +
        "&service=" + encodeURIComponent(serviceName);
}, 4000);
