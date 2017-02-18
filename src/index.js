import {isBadgeNonexisted, isChartNonexisted, isNotChartHeader} from './js/common/domUtil';
import {showChart} from './js/chart';
import {showBadge} from './js/badge';
import $ from 'jquery';

const FIRST_TIME = true;
const NON_FIRST_TIME = false;

showBadge();
showChart(FIRST_TIME);

$(document).ready(() => {
  $('body').mouseup((event) => {
    setTimeout(() => {
      if (isBadgeNonexisted()) {
        showBadge();
      }
      if (isChartNonexisted() && isNotChartHeader(event)) {
        showChart(NON_FIRST_TIME);
      }
    }, 2500);
  });
});

document.styleSheets[0].insertRule('.travis-ci{display:inline-block;margin-left:8px;line-height:1em;position:relative;top:3px;opacity:.85;}', 1);
document.styleSheets[0].insertRule('.travis-ci:hover{opacity:1}', 1);
document.styleSheets[0].insertRule('.travis-ci img{display:block;}', 1);
