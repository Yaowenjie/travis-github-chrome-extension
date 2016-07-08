var overallDiv = $("div.file-navigation.in-mid-page");

if (overallDiv.length !== 0) {
  var chartDiv = $("<div id='chartContainer' style='height: 300px; width: 100%; border: 1px solid #ddd;border-radius: 0 3px 3px 0;'></div>");

  /* Getting Data from github page and travis-ci api */
  var allColor = ['#39aa56', '#db4545', '#f1e05a']; // green, red, yellow
  var ownerAndProject = $("h1.public > strong > a")[0].pathname;
  var jsonPath = 'https://api.travis-ci.org/repositories' + ownerAndProject + '/builds.json';

  $.getJSON(jsonPath, function(data) {
    if (data.length >= 1) {
      var range = (data.length < 10) ? data.length : 10;
      chartDiv.insertAfter(overallDiv[0]);

      var info = getInfoFromJson(data, range);

      for (var i=range; i<10; i++) {
        if(typeof info.buildNum[i] === "undefined") {
          info.buildNum[i] = "#";
        }
      }

      var chart = new CanvasJS.Chart("chartContainer",
      {
        animationEnabled: true,
        title:{
          fontFamily: "Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif",
          text: "Travis-CI build Status (Recent 10 times)",
          fontSize: 20
        },
        axisX: {
          title: "Build Number",
          labelFontWeight: "bold"
        },
    		axisY: {
          title: "Build Time(Minutes)",
    			interlacedColor: "#f5f5f5"
        },
        data: [
          {
            type: "column", //change type to bar, line, area, pie, etc
            dataPoints: [
              { label: info.buildNum[9], y: info.buildTime[9], color: info.buildColor[9], toolTipContent: info.buildInfo[9], click: onClick, cursor: "pointer" },
              { label: info.buildNum[8], y: info.buildTime[8], color: info.buildColor[8], toolTipContent: info.buildInfo[8], click: onClick, cursor: "pointer" },
              { label: info.buildNum[7], y: info.buildTime[7], color: info.buildColor[7], toolTipContent: info.buildInfo[7], click: onClick, cursor: "pointer" },
              { label: info.buildNum[6], y: info.buildTime[6], color: info.buildColor[6], toolTipContent: info.buildInfo[6], click: onClick, cursor: "pointer"},
              { label: info.buildNum[5], y: info.buildTime[5], color: info.buildColor[5], toolTipContent: info.buildInfo[5], click: onClick, cursor: "pointer" },
              { label: info.buildNum[4], y: info.buildTime[4], color: info.buildColor[4], toolTipContent: info.buildInfo[4], click: onClick, cursor: "pointer" },
              { label: info.buildNum[3], y: info.buildTime[3], color: info.buildColor[3], toolTipContent: info.buildInfo[3], click: onClick, cursor: "pointer" },
              { label: info.buildNum[2], y: info.buildTime[2], color: info.buildColor[2], toolTipContent: info.buildInfo[2], click: onClick, cursor: "pointer" },
              { label: info.buildNum[1], y: info.buildTime[1], color: info.buildColor[1], toolTipContent: info.buildInfo[1], click: onClick, cursor: "pointer" },
              { label: "Current:" + info.buildNum[0],  y: info.buildTime[0], color: info.buildColor[0], toolTipContent: info.buildInfo[0], click: onClick, cursor: "pointer" }
            ]
          }
        ]
      });
      chart.render();

      function onClick(e) {
        var order = 9 - e.dataPoint.x;
        window.open('https://travis-ci.org' + ownerAndProject + '/builds/' + data[order]["id"], '_blank');
      }
    }
  });

  function getInfoFromJson(data, range) {
    var buildNum = [];
    var buildTime = [];
    var buildColor = [];
    var buildInfo = [];
    var info = {};

    for (var i = 0; i < range; i++) {
      var buildId = data[i]["id"];
      var buildDuration = data[i]["duration"];
      var buildState = data[i]["state"];
      var buildResult = data[i]["result"];
      var buildMessage = data[i]["message"];
      var buildStarted = data[i]["started_at"];
      var buildFinished = data[i]["finished_at"];
      var buildTimeStr = Math.floor(buildDuration/60) + "min" + Math.floor(buildDuration%60) + "s";

      buildNum.push("#" + data[i]["number"]);
      buildInfo.push("<b>Build Time</b>: " + buildTimeStr + "<br/><span><b>Message:</b>" + buildMessage + "</span>");
      buildTime.push(Math.round(buildDuration/60*100)/100);

      if (buildState === "started") {
        buildColor.push(allColor[2]);
        if (buildStarted && buildFinished === null) {
            var skipTime = (new Date() - new Date(buildStarted))/1000;
            var skipTimeStr = Math.floor(skipTime/60) + "min" + Math.floor(skipTime%60) + "s";
            buildTime[i] = Math.round(skipTime/60*100)/100;
            buildInfo[i] = "It's running! <b>Skipped time</b>:" + skipTimeStr + "<br/><span><b>Message:</b>" + buildMessage + "</span>";
        } else {
            buildInfo[i] = "Oops, the build may be cancelled it.<br/><span><b>Message:</b>" + buildMessage + "</span>";
        }
      } else {
        buildResult = (buildResult === null) ? 1 : buildResult;
        buildColor.push(allColor[buildResult]);
      }
    }

    info.buildNum = buildNum;
    info.buildTime = buildTime;
    info.buildColor = buildColor;
    info.buildInfo = buildInfo;
    return info;
  }


}
