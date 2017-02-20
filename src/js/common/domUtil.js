import $ from 'jquery';

const isBadgeNonexisted = () => {
  return $('.travis-ci').length === 0;
};

const isChartNonexisted = () => {
  return $('#chartContainer').length === 0;
};

export {isBadgeNonexisted, isChartNonexisted};