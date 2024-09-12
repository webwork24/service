const urlParams = window.location.search;
if (urlParams.length == 0) {
    console.log('https://www.youtube.com/');
    window.location.href = 'https://www.youtube.com/';
} else {
    console.log('https://www.youtube.com/watch' + urlParams);
    window.location.href = 'https://www.youtube.com/watch' + urlParams;
}
