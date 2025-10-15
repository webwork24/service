import {IP} from '../constants.js';

const urlParams = window.location.search;
const urlRef = 'https://' + IP + ':8086/activity';
if (urlParams.length == 0) {
    window.location.href = urlRef;
} else {
    window.location.href = urlRef + urlParams;
}
