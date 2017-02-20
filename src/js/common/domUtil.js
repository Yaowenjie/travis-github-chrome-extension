import {CHART_CONTAINER} from './constants';
import $ from 'jquery';

const isBadgeNonexisted = () => {
  return $('.travis-ci').length === 0;
};

const isChartNonexisted = () => {
  return $(`#${CHART_CONTAINER}`).length === 0;
};

const isOverallDivExisted = () => {
  return $('div.file-navigation.in-mid-page').length !== 0;
};

const detectPageChanged = (callback) => {
  let oldPathname = window.location.pathname;
  let oldSearch = window.location.search;
  const DETECT_INTERVAL = 200;

  setInterval(() => {
    if(oldPathname != window.location.pathname || oldSearch != window.location.search) {
      oldPathname = window.location.pathname;
      oldSearch = window.location.search;
      callback();
    }
  }, DETECT_INTERVAL);
};

export {isBadgeNonexisted, isChartNonexisted, isOverallDivExisted, detectPageChanged};
