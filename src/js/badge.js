import {isBadgeNonexisted} from './common/domUtil';
import $ from 'jquery';

const selectors = [
  'h1.public > strong > a',                             //Specific repository
  '.js-repo-filter .d-inline-block h3 a:first-child',   //Repositories & Stars
  '.org-repos .d-inline-block h3 a',                    //Organization
  '.codesearch-results .d-inline-block a',              //Search
  '.explore-pjax-container .explore-content a'          //Trending
];
const repoListSelectors = '.js-pinned-repos-reorder-container p.mb-0'; //Overview

const showBadge = () => {
  selectors.forEach((sel) => {
    $(sel).each((i, element) => {
      insertStatusBadge(element, element.pathname);
    });
  });
  $(repoListSelectors).each((i, element) => {
    let project = $(element).siblings('span').children('a').attr('href');
    insertStatusBadge(element, project);
  });
};

const insertStatusBadge = (element, project) => {
  let xhr = new XMLHttpRequest();
  let badgeUrl = `https://api.travis-ci.org${project}.svg`;
  xhr.open('GET', badgeUrl, true);
  xhr.responseType = 'blob';
  xhr.onreadystatechange = () => {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      isBadgeNonexisted && buildBadgeImg(xhr.response, project, element);
    }
  };
  xhr.send();
};

const buildBadgeImg = (response, project, element) => {
  const img = $('<img alt="build status" />');
  img.attr('src', window.URL.createObjectURL(response));
  img.on('load', () => {
    const link = $(`<a class='travis-ci' href='https://travis-ci.org${project}'></a>`);
    link.append(img);
    link.appendTo($(element));
  });
};

export {showBadge};
