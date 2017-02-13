/* Insert the css code */
document.styleSheets[0].insertRule('.travis-ci{display:inline-block;margin-left:8px;line-height:1em;position:relative;top:3px;opacity:.85;}', 1);
document.styleSheets[0].insertRule('.travis-ci:hover{opacity:1}', 1);
document.styleSheets[0].insertRule('.travis-ci img{display:block;}', 1);

var selectors = [
  'h1.public > strong > a',                     //Specific repository
  '.js-repo-filter h3 a:first-child',           //Repositories & Stars
  '.org-repos .d-inline-block a',               //Organization
  '.codesearch-results .d-inline-block a',      //Search
  '.explore-pjax-container .explore-content a'  //Trending
];
var repoListSelectors = '.js-pinned-repos-reorder-container p.mb-0'; //Overview

function showBadge() {
  selectors.forEach(function(sel) {
    $(sel).each(function() {
      insertStatusIcon(this, this.pathname);
    });
  });
  $(repoListSelectors).each(function() {
    var project = $(this).siblings('span').children('a').attr('href');
    insertStatusIcon(this, project);
  });
}

function insertStatusIcon(el, project) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.travis-ci.org' + project + '.svg', true);
  xhr.responseType = 'blob';
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      xhr.onload = function(e) {
        var img = $("<img alt='build status'></img>");
        img.attr('src', window.URL.createObjectURL(this.response));
        img.load(function() {
          var link = $("<a class='travis-ci' href='https://travis-ci.org" + project + "'></a>");
          link.append(img);
          link.appendTo($(el));
        });
      };
    }
  }
  xhr.send();
}

function isBadgeNonexisted() {
  return $(".travis-ci").length === 0;
}

showBadge();

$(document).ready(function() {
  // When user clicks anywhere, show the Travis Badge!
  $('body').mouseup(function() {
   setTimeout(function() {
     if (isBadgeNonexisted()) {
       showBadge();
     }
   }, 2000);
  });
});
