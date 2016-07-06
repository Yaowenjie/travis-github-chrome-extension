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
  var buildTime = [];
  var buildColor = [];
  var allColor = ['#39aa56', '#db4545', '#f1e05a'];
  $.getJSON(jsonPath, function(data) {
    console.log(data);
    for (var i = 0; i < 10; i++) {
      buildNum.push("#" + data[i]["number"]);
      buildTime.push(Math.round(data[i]["duration"]/60*100)/100);
      if (data[i]["state"] !== "finished") {
          buildColor.push(allColor[2]);
      } else {
          buildColor.push(allColor[data[i]["result"]]);
      }
    }

    var chart = new CanvasJS.Chart("chartContainer",
    {
      animationEnabled: true,
      title:{
        fontFamily: "Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif",
        text: "Travis-CI build Status (Recent 10 times)"
      },
      axisY: {
        title: "Build Time(Minutes)"
      },
      axisX: {
        title: "Build Number",
        labelFontWeight: "bold"
      },
      data: [
        {
          type: "column", //change type to bar, line, area, pie, etc
          dataPoints: [
            { label: buildNum[9], y: buildTime[9], color: buildColor[9], toolTipContent:"<a href='http://baidu.com'>Go to this build</> <hr/> Build Time: 2min30s" },
            { label: buildNum[8], y: buildTime[8], color: buildColor[8] },
            { label: buildNum[7], y: buildTime[7], color: buildColor[7] },
            { label: buildNum[6], y: buildTime[6], color: buildColor[6] },
            { label: buildNum[5], y: buildTime[5], color: buildColor[5] },
            { label: buildNum[4], y: buildTime[4], color: buildColor[4] },
            { label: buildNum[3], y: buildTime[3], color: buildColor[3] },
            { label: buildNum[2], y: buildTime[2], color: buildColor[2] },
            { label: buildNum[1], y: buildTime[1], color: buildColor[1] },
            { label: "Current:" + buildNum[0],  y: buildTime[0], color: buildColor[0] }
          ]
        }
      ]
    });
    chart.render();
  });


}
