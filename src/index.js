import {showChart, isChartNonexisted, isNotChartHeader} from './js/chart';
import {showBadge, isBadgeNonexisted} from './js/status';
import $ from 'jquery';

showChart(true);
showBadge();

$(document).ready(() => {
  $('body').mouseup((event) => {
    setTimeout(() => {
      if (isBadgeNonexisted()) {
        showBadge();
      }
      if (isChartNonexisted() && isNotChartHeader(event)) {
        showChart(false);
      }
    }, 2000);
  });
});
