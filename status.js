/* Unconditionally add the CSS rules to the first stylesheet which is
 * available in the page. */
document.styleSheets[0].insertRule('.travis-ci{display:inline-block;margin-left:8px;line-height:1em;position:relative;top:3px;opacity:.85;}', 1);
document.styleSheets[0].insertRule('.travis-ci:hover{opacity:1}', 1);
document.styleSheets[0].insertRule('.travis-ci img{display:block;}', 1);
document.styleSheets[0].insertRule('.mini-repo-list-item span.repo-and-owner{max-width:600px;}', 1);

var selectors =
    [ 'h1.public > strong > a'
    , '.js-repo-list h3.repo-list-name a:first-child'
    , 'span.repo'
    ];

selectors.forEach(function(sel) {
    var els = window.document.querySelectorAll(sel);
    for (var i = 0, l = els.length; i < l; i++) {
        insertStatusIcon(els[i]);
    }
});

/* The status icon may not exist, if the project is not registered on
 * travis-ci.org. So we first create the img element and see if an error
 * happens while loading this image. Only if the image exists, we insert the
 * icon into the DOM. */
function insertStatusIcon(el) {
    var project = el.pathname;
    if (typeof project === 'undefined') {
      project = el.parentElement.parentElement.pathname;
      /* This is for pinned repo list */
      if (typeof project === 'undefined') {
        project = el.parentElement.parentElement.parentElement.pathname;
      }
    }

    var img = window.document.createElement('img');
    img.src = 'https://api.travis-ci.org' + project + '.svg';
    img.alt = 'build status';


    /* When the image is loaded, we insert it into the DOM. This event is only
     * fired if the image was loaded successfully, it will not fire if the
     * image does not exist.
     *
     * This avoids 404 requests to the travis-ci server in case the project
     * doesn't use travis-ci. */
    img.onload = function() {
        /* Create the link element. */
        var link = window.document.createElement('a');
        link.href = 'https://travis-ci.org' + project;
        link.className = 'travis-ci';

        /* And finally insert the elements into the DOM. */
        link.appendChild(img);
        el.parentNode.insertBefore(link, el.nextSibling);
    };
}
