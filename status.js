/* Insert the css code */
document.styleSheets[0].insertRule('.travis-ci{display:inline-block;margin-left:8px;line-height:1em;position:relative;top:3px;opacity:.85;}', 1);
document.styleSheets[0].insertRule('.travis-ci:hover{opacity:1}', 1);
document.styleSheets[0].insertRule('.travis-ci img{display:block;}', 1);

var selectors =
    [ 'h1.public > strong > a'
    , '.js-repo-list h3.f4 a:first-child'
    , '.columns.popular-repos span.repo'
    ];

selectors.forEach(function(sel) {
    $(sel).each(function() {
        insertStatusIcon(this);
    });
});

function insertStatusIcon(el) {
    var project = getProject(el);

    var img = $("<img src='https://api.travis-ci.org" + project + ".svg' alt='build status'></img>");

    img.load(function() {
        var link = $("<a class='travis-ci' href='https://travis-ci.org" + project + "'></a>");
        link.append(img);
        link.insertAfter($(el));
    });
}

function getProject(el) {
  var project = el.pathname;
  if (typeof project === 'undefined') {
    project = el.parentElement.parentElement.pathname;
    /* This is for pinned repo list */
    if (typeof project === 'undefined') {
      project = el.parentElement.parentElement.parentElement.pathname;
    } else {
      /* lengthen the span to avoid hiding our icon*/
      document.styleSheets[0].insertRule('.mini-repo-list-item span.repo-and-owner{max-width:600px;}', 1);
    }
  }
  return project;
}
