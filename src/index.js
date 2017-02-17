import {showChart, isChartNonexisted, isNotChartHeader} from './js/chart';
import {showBadge, isBadgeNonexisted} from './js/status';
import $ from 'jquery';

showChart(true);

$(document).ready(() => {
  // When user clicks anywhere except chart header, show the Chart!
  $('body').mouseup((event) => {
    setTimeout(() => {
      if (isChartNonexisted() && isNotChartHeader(event)) {
        showChart(false);
      }
    }, 2500);
  });
});

showBadge();

$(document).ready(() => {
  // When user clicks anywhere, show the Travis Badge!
  $('body').mouseup(() => {
    setTimeout(() => {
      if (isBadgeNonexisted()) {
        showBadge();
      }
    }, 2000);
  });
});