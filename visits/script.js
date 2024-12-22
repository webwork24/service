import {IP} from '../constants.js';
console.log('ip: ' + IP);

const urlParams = window.location.search;
const urlRef = 'http://' + IP + ':8085/queue/home';
if (urlParams.length == 0) {
    console.log('no parameters');
    window.location.href = urlRef;
} else {
    console.log('there are parameters: ' + urlParams);
    window.location.href = urlRef + urlParams;
}
