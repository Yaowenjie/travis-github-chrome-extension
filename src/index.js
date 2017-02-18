import {showChart, isChartNonexisted, isNotChartHeader} from './js/chart';
import {showBadge, isBadgeNonexisted} from './js/status';
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
    }, 2000);
  });
});
