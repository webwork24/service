import {IP} from '../constants.js';
console.log('ip: ' + IP);

const urlParams = window.location.search;
const urlRef = 'http://' + IP + ':8082/auth-api/auth';
if (urlParams.length == 0) {
    console.log('no parameters');
    window.location.href = urlRef;
//    window.location.href = 'https://www.youtube.com/';
} else {
    console.log('there are parameters: ' + urlParams);
    window.location.href = urlRef + urlParams;
//    window.location.href = 'https://www.youtube.com/watch' + urlParams;
}
