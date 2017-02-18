import $ from 'jquery';

const isBadgeNonexisted = () => {
  return $('.travis-ci').length === 0;
};

const isChartNonexisted = () => {
  return $('#chartContainer').length === 0;
};

const isNotChartHeader = (event) => {
  return $(event.target).text().indexOf('Travis-CI Build Chart') === -1;
};

export {isBadgeNonexisted, isChartNonexisted, isNotChartHeader};