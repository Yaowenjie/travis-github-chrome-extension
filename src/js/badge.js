import $ from 'jquery';

const successBadge = chrome.extension.getURL('/build-success.svg');
const failingBadge = chrome.extension.getURL('/build-failing.svg');
const unknownBadge = chrome.extension.getURL('/build-unknown.svg');

const selectors = [
  'h1.public > strong > a',                             //Specific repository
  '.d-inline-block h3 a:first-child',                   //Repositories & Stars
  '.org-repos .d-inline-block h3 a',                    //Organization & Trending
  '.codesearch-results .repo-list-item h3 a',           //Search
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
  let badgeUrl = `https://api.travis-ci.org/repositories${project}.json`;
  xhr.open('GET', badgeUrl, true);

  xhr.onload = () => {
    const buildStatus = JSON.parse(xhr.responseText)['last_build_status'];
    const SUCCESS = 0;
    const FAILING = 1;
    let statusBadge;

    if (buildStatus === SUCCESS) {
      statusBadge = successBadge;
    } else if (buildStatus === FAILING) {
      statusBadge = failingBadge;
    } else {
      statusBadge = unknownBadge;
    }

    buildBadgeImg(statusBadge, project, element);
  };
  xhr.send();
};

const buildBadgeImg = (statusBadge, project, element) => {
  const img = $('<img alt="build status" />');
  img.attr('src', statusBadge);
  img.on('load', () => {
    const link = $(`<a class='travis-ci' href='https://travis-ci.org${project}'></a>`);
    link.append(img);
    link.appendTo($(element));
  });
};

export {showBadge};
