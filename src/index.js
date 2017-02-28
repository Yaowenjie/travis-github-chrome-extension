import {isBadgeNonexisted, isChartNonexisted, detectPageChanged} from './js/common/domUtil';
import {showChart} from './js/chart';
import {showBadge} from './js/badge';

const FIRST_TIME = true;
const NON_FIRST_TIME = false;
const DELAY_DURATION = 2500;

showBadge();
showChart(FIRST_TIME);

detectPageChanged(() => {
  setTimeout(() => {
    if (isBadgeNonexisted()) {
      showBadge();
    }
    if (isChartNonexisted()) {
      showChart(NON_FIRST_TIME);
    }
  }, DELAY_DURATION);
});

document.styleSheets[0].insertRule('.travis-ci{display:inline-block;margin-left:8px;line-height:1em;position:relative;top:3px;opacity:.85;}', 1);
document.styleSheets[0].insertRule('.travis-ci:hover{opacity:1}', 1);
document.styleSheets[0].insertRule('.travis-ci img{display:block;}', 1);
