var overallDiv = window.document.querySelectorAll("div.file-navigation.in-mid-page");

if (overallDiv.length !== 0) {
  var chartDiv = window.document.createElement('div');
  chartDiv.setAttribute("id", "chartContainer");
  chartDiv.style.cssText = 'height: 300px; width: 100%; border: 1px solid #ddd;border-radius: 0 3px 3px 0;';

  /* Getting Data from github page and travis-ci api */
  var ownerAndProject = window.document.querySelectorAll("h1.public > strong > a")[0].pathname;
  var jsonPath = 'https://api.travis-ci.org/repositories' + ownerAndProject + '/builds.json';
  var buildNum = [];
  var buildTime = [];
  var buildColor = [];
  var allColor = ['#39aa56', '#db4545', '#f1e05a'];
  var buildInfo = [];
  $.getJSON(jsonPath, function(data) {
    if (data.length >= 1) {
      var scope = 10;
      if (data.length < 10) {
        scope = data.length;
      }
      overallDiv[0].parentNode.insertBefore(chartDiv, overallDiv[0].nextSibling);
      for (var i = 0; i < scope; i++) {

        buildNum.push("#" + data[i]["number"]);

        var buildId = data[i]["id"];
        var buildTimeStr = Math.floor(data[i]["duration"]/60) + "min" + data[i]["duration"]%60 + "s";
        buildInfo.push("<a href='https://travis-ci.org" + ownerAndProject + "/builds/" + buildId + "'>Go to this build</> <Br/> Build Time: " + buildTimeStr);

        buildTime.push(Math.round(data[i]["duration"]/60*100)/100);

        if (data[i]["state"] !== "finished") {
          buildColor.push(allColor[2]);
        } else {
          var colorOrder = data[i]["result"];
          if (colorOrder === null) {
            colorOrder = 1;
          }
          buildColor.push(allColor[colorOrder]);
        }
      }
      /* the current building is running*/
      if (buildTime[0] === 0) {
        if (buildTime.length === 1) {
          buildTime[0] = 1;
        } else {
          buildTime[0] = buildTime[1];
        }
        buildInfo[0] = "<a href='https://travis-ci.org" + ownerAndProject + "/builds/" + data[0]["id"] + "'>Go to this build <br/> It's Running!</a>";
      }

      console.log(buildTime);
      console.log(buildColor);
      console.log(buildInfo);

      var chart = new CanvasJS.Chart("chartContainer",
      {
        animationEnabled: true,
        title:{
          fontFamily: "Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif",
          text: "Travis-CI build Status (Recent 10 times)",
          fontSize: 20
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
              { label: buildNum[9], y: buildTime[9], color: buildColor[9], toolTipContent: buildInfo[9] },
              { label: buildNum[8], y: buildTime[8], color: buildColor[8], toolTipContent: buildInfo[8] },
              { label: buildNum[7], y: buildTime[7], color: buildColor[7], toolTipContent: buildInfo[7] },
              { label: buildNum[6], y: buildTime[6], color: buildColor[6], toolTipContent: buildInfo[6] },
              { label: buildNum[5], y: buildTime[5], color: buildColor[5], toolTipContent: buildInfo[5] },
              { label: buildNum[4], y: buildTime[4], color: buildColor[4], toolTipContent: buildInfo[4] },
              { label: buildNum[3], y: buildTime[3], color: buildColor[3], toolTipContent: buildInfo[3] },
              { label: buildNum[2], y: buildTime[2], color: buildColor[2], toolTipContent: buildInfo[2] },
              { label: buildNum[1], y: buildTime[1], color: buildColor[1], toolTipContent: buildInfo[1] },
              { label: "Current:" + buildNum[0],  y: buildTime[0], color: buildColor[0], toolTipContent: buildInfo[0] }
            ]
          }
        ]
      });
      chart.render();
    }
  });


}
