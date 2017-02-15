const bodyBgColor = $("body").css("background-color");
const allColor = ['#39aa56', '#db4545', '#f1e05a']; // green, red, yellow
const githubGrey = "#68777d";
const globalFontFamily = "arial, sans-serif";
// Get URL for the travis-ci icon.
const travisIcon = chrome.extension.getURL("/travis-icon.png");
// Generate the chart elements.
const chartDiv = $("<div id='chartHeader' class='commit-tease' style='width: 100%; padding: 5px 10px; cursor: pointer;'>" +
         "<h5><img src='" + travisIcon + "' height='20' style='vertical-align: middle;'>" +
         " Travis-CI Build Chart</h5>" +
        "</div>" +
        "<div id='chartContainer' class='overall-summary' style='height: 300px; width: 100%;'></div>");

let bIsChartRendered = false;

const showChart = (isFirstTime) => {
  const overallDiv = $("div.file-navigation.in-mid-page");
  if (overallDiv.length !== 0) {
    const ownerAndProject = $("h1.public > strong > a")[0].pathname;
    const jsonPath = `https://api.travis-ci.org/repositories${ownerAndProject}/builds.json`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', jsonPath, true);

    xhr.onload = function () {
      let data = JSON.parse(xhr.responseText);
  		if (data.length) {
  			let range = (data.length < 10) ? data.length : 10;
  			chartDiv.insertAfter(overallDiv[0]);

  			let info = getInfoFromJson(data, range);
  			let chart = buildChart(info, data);

        if (!isFirstTime) {
          bIsChartRendered = true;
          chart.render();
        } else if (localStorage["chartHeaderHidden"] === "true") {
          // Hide the chartContainer element if previously hidden
          $("#chartContainer").hide();
        } else {
          // Otherwise we render the Chart and record that it has been rendered
          bIsChartRendered = true;
          chart.render();
        }

        if (isFirstTime) {
          bindToggleToHeader(chart);
        }
  		}
    };
    xhr.send();
  }
};

const bindToggleToHeader = (chart) => {
  // Attach the chart header click event
  $("#chartHeader").click(function(e) {
    const chartDiv = $(this).next("#chartContainer");
    // Toggle the chartContainer visibility
    chartDiv.slideToggle(150,
      () => {
        // Record the current visibility state
        localStorage["chartHeaderHidden"] = $(chartDiv).is(":hidden");
        // Render the chart if we haven't done so already and record that it has been rendered
        if (!bIsChartRendered) {
          bIsChartRendered = true;
          chart.render();
        }
      });
  });
};

const buildChart = (info, data) => {
  const ownerAndProject = $("h1.public > strong > a")[0].pathname;
  const onClick = (e) => {
   let order = 9 - e.dataPoint.x;
   window.open(`https://travis-ci.org${ownerAndProject}/builds/${data[order]["id"]}`, '_blank');
  };

  return new CanvasJS.Chart("chartContainer", {
    width: document.getElementById('chartHeader').clientWidth,
    height: 298,
    backgroundColor: bodyBgColor,
    animationEnabled: true,
    title: {
      text: "Build Status (Recent 10 builds)",
      fontFamily: globalFontFamily,
      fontWeight: "normal",
      fontColor: githubGrey,
      fontSize: 20
    },
    axisX: {
      title: "Build Number",
      titleFontFamily: globalFontFamily,
      titleFontWeight: "normal",
      titleFontSize: 12
    },
    axisY: {
      title: "Build Time (Minutes)",
      titleFontFamily: globalFontFamily,
      titleFontWeight: "normal",
      titleFontSize: 12
    },
    toolTip:{
      fontFamily: globalFontFamily
    },
    data: [{
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
          { label: `Current:${info.buildNum[0]}`,	y: info.buildTime[0], color: info.buildColor[0], toolTipContent: info.buildInfo[0], click: onClick, cursor: "pointer" }
        ]
    }]
  });
};

const trimTime = (buildDuration) => {
  var minNum = Math.floor(buildDuration / 60);
  var secNum = Math.floor(buildDuration % 60);
  return `${minNum}min${secNum}s`;
};

const getInfoFromJson = (data, range) => {
  let buildNum = [],
      buildTime = [],
      buildColor = [],
      buildInfo = [];
  let info = {};

  for (let i = 0; i < range; i++) {
    let buildDuration = data[i]["duration"];
    let buildState = data[i]["state"];
    let buildResult = data[i]["result"];
    let buildMessage = data[i]["message"];
    let buildStarted = data[i]["started_at"];
    let buildFinished = data[i]["finished_at"];
    let buildTimeStr = trimTime(buildDuration);

    buildMessage = (buildMessage.length > 60) ? (buildMessage.slice(0, 60) + "...") : buildMessage;

    buildNum.push(`#${data[i]["number"]}`);
    buildInfo.push(`<b>Build Time</b>: ${buildTimeStr}<br/><span><b>Message: </b>${buildMessage}</span>`);
    buildTime.push(Math.round(buildDuration/60*100)/100);

    if (buildState === "started") {
      buildColor.push(allColor[2]);
      if (buildStarted && buildFinished === null) {
        let skipTime = (new Date() - new Date(buildStarted))/1000;
        let skipTimeStr = trimTime(skipTime);
        buildTime[i] = Math.round(skipTime/60*100)/100;
        buildInfo[i] = `It's running! <b>Skipped time</b>:${skipTimeStr}<br/><span><b>Message:</b>${buildMessage}</span>`;
      } else {
        buildInfo[i] = `Oops, the build may be cancelled.<br/><span><b>Message:</b>${buildMessage}</span>`;
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

  for (let i=range; i<10; i++) {
    if(typeof info.buildNum[i] === "undefined") {
      info.buildNum[i] = "#";
    }
  }

  return info;
};

const isChartNonexisted = () => {
  return $("#chartContainer").length === 0;
};

const isNotChartHeader = (event) => {
  return $(event.target).text().indexOf('Travis-CI Build Chart') === -1;
};

showChart(true);

$(document).ready(() => {
  // When user clicks anywhere except chart header, show the Chart!
  $('body').mouseup((event) => {
    setTimeout(() => {
      if (isChartNonexisted() && isNotChartHeader(event)) {
        showChart(false);
      }
    }, 2500);
  });
});
