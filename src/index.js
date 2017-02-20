import {isBadgeNonexisted, isChartNonexisted} from './js/common/domUtil';
import {showChart} from './js/chart';
import {showBadge} from './js/badge';

const FIRST_TIME = true;
const NON_FIRST_TIME = false;

showBadge();
showChart(FIRST_TIME);

let oldPathname = window.location.pathname;
let oldSearch = window.location.search;

setInterval(() => {
  if(oldPathname != window.location.pathname || oldSearch != window.location.search) {
    oldPathname = window.location.pathname;
    oldSearch = window.location.search;
    setTimeout(() => {
      if (isBadgeNonexisted()) {
        showBadge();
      }
      if (isChartNonexisted()) {
        showChart(NON_FIRST_TIME);
      }
    }, 2000);
  }
}, 200);

document.styleSheets[0].insertRule('.travis-ci{display:inline-block;margin-left:8px;line-height:1em;position:relative;top:3px;opacity:.85;}', 1);
document.styleSheets[0].insertRule('.travis-ci:hover{opacity:1}', 1);
document.styleSheets[0].insertRule('.travis-ci img{display:block;}', 1);
