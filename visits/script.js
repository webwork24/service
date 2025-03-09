import {IP} from '../constants.js';
console.log('ip: ' + IP);

const urlParams = window.location.search;
const urlRef = 'https://' + IP + ':8085/queue/home';
if (urlParams.length == 0) {
    window.location.href = urlRef;
} else {
    window.location.href = urlRef + urlParams;
}
