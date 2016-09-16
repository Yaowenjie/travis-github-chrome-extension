/* Insert the css code */
document.styleSheets[0].insertRule('.travis-ci{display:inline-block;margin-left:8px;line-height:1em;position:relative;top:3px;opacity:.85;}', 1);
document.styleSheets[0].insertRule('.travis-ci:hover{opacity:1}', 1);
document.styleSheets[0].insertRule('.travis-ci img{display:block;}', 1);

var selectors =
    [ 'h1.public > strong > a'
    , '.js-repo-list h3.f4 a:first-child'
    , '.js-pinned-repos-reorder-container a.mb-2'
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
  return project;
}
