var overallDiv = window.document.querySelectorAll(".repository-lang-stats-graph.js-toggle-lang-stats");

function getJSONP(url, success) {
    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0]
               || document.documentElement;

    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);
}

if (overallDiv.length !== 0) {
  var chartDiv = window.document.createElement('div');
  chartDiv.setAttribute("id", "chartContainer");
  chartDiv.style.cssText = 'height: 300px; width: 100%; border: 1px solid #ddd;border-radius: 0 3px 3px 0;';

  overallDiv[0].parentNode.insertBefore(chartDiv, overallDiv[0].nextSibling);
  /* Getting Data from github page and travis-ci api */
  var ownerAndProject = window.document.querySelectorAll("h1.public > strong > a")[0].pathname;
  var jsonPath = 'https://api.travis-ci.org/repositories' + ownerAndProject + '/builds.json';
  console.log("------(7)" + jsonPath);
  var buildNum = [];
  $.getJSON(jsonPath, function(data) {
    console.log(data);
    for (var i = 0; i < 10; i++) {
      buildNum.push("#" + data[i]["number"]);
      console.log(buildNum + "uuu");
    }

    var chart = new CanvasJS.Chart("chartContainer",
    {
      animationEnabled: true,
      title:{
        fontFamily: "Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif",
        text: "Travis-CI build Status"
      },
      axisY: {
        title: "Build Time(Minutes)"
      },
      axisX: {
        title: "Recent 10 times build",
        labelFontWeight: "bold"
      },
      data: [
        {
          type: "column", //change type to bar, line, area, pie, etc
          dataPoints: [
            { label: buildNum[9], y: 2.6, color:'#39aa56', toolTipContent:"<a href='http://baidu.com'>Go to this build</> <hr/> Build Time: 2min30s" },
            { label: buildNum[8], y: 2.5, color:'#39aa56' },
            { label: buildNum[7], y: 2.0, color:'#db4545' },
            { label: buildNum[6], y: 2.5, color:'#db4545' },
            { label: buildNum[5], y: 3.52, color:'#39aa56' },
            { label: buildNum[4], y: 4.8, color:'#39aa56' },
            { label: buildNum[3], y: 2.8, color:'#39aa56' },
            { label: buildNum[2], y: 3.4, color:'#39aa56' },
            { label: buildNum[1], y: 3.4, color:'#39aa56' },
            { label: "Current:" + buildNum[0],  y: 1.4, color:'#f1e05a' }
          ]
        }
      ]
    });
    chart.render();
  });


}
