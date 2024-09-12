import {IP} from '../constants';
console.log('ip: ' + IP);

const urlParams = window.location.search;
if (urlParams.length == 0) {
    console.log('no parameters');
//    window.location.href = 'https://www.youtube.com/';
} else {
    console.log('there are parameters: ' + urlParams);
//    window.location.href = 'https://www.youtube.com/watch' + urlParams;
}
