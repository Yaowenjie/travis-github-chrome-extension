import {trimTimeStr, trimMessage, trimTimeToMinScale} from './common/util';
import {isOverallDivExisted} from './common/domUtil';
import {GITHUB_GREY, GREEN, RED, YELLOW, GLOBAL_FONT_FAMILY, COLUMN_AMOUNT, CHART_CONTAINER, CHART_HEADER} from './common/constants';
import $ from 'jquery';
import './lib/canvasjs.min';

const travisIcon = chrome.extension.getURL('/travis-icon.png');
const bodyBgColor = $('body').css('background-color');
const allColor = [GREEN, RED, YELLOW];
let bIsChartRendered = false;

// Generate the chart elements.
const chartDiv = $(`<div id="${CHART_HEADER}" class="commit-tease" style="width: 100%; padding: 5px 10px; cursor: pointer;">` +
  `<h5><img src="${travisIcon}" height="20" style="vertical-align: middle;">Travis-CI Build Chart</h5></div>` +
  `<div id="${CHART_CONTAINER}" class="overall-summary" style="height: 300px; width: 100%;"></div>`);

const showChart = (isFirstTime) => {
  const overallDiv = $('div.file-navigation.in-mid-page');
  if (isOverallDivExisted()) {
    const ownerAndProject = $('h1.public > strong > a')[0].pathname;
    const jsonPath = `https://api.travis-ci.org/repositories${ownerAndProject}/builds.json`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', jsonPath, true);

    xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
      if (data.length) {
        chartDiv.insertAfter(overallDiv[0]);

        let range = (data.length < COLUMN_AMOUNT) ? data.length : COLUMN_AMOUNT;
        let info = getInfoFromJson(data, range);
        let chart = buildChart(info, data);

        unbindToggleToHeader();
        renderOrHideChart(isFirstTime, chart);
        bindToggleToHeader(chart);
      }
    };
    xhr.send();
  }
};

const render = (chart) => {
  chart.render();
  bIsChartRendered = true;
};

const renderOrHideChart = (isFirstTime, chart) => {
  if (isFirstTime && localStorage['chartHeaderHidden'] === 'true') {
    // Hide the chartContainer element if previously hidden
    $(`#${CHART_CONTAINER}`).hide();
  } else {
    // Otherwise we render the Chart and record that it has been rendered
    render(chart);
  }
};

const bindToggleToHeader = (chart) => {
  $(`#${CHART_HEADER}`).click(() => {
    const chartDiv = $(`#${CHART_HEADER}`).next(`#${CHART_CONTAINER}`);
    // Toggle the chartContainer visibility
    chartDiv.slideToggle(150, () => {
      // Record the current visibility state
      localStorage['chartHeaderHidden'] = $(chartDiv).is(':hidden');

      if (!bIsChartRendered) {
        render(chart);
      }
    });
  });
};

const unbindToggleToHeader = () => {
  $(`#${CHART_HEADER}`).unbind('click');
};

const assembleDataPoints = (info, data) => {
  let dataPoints = [];
  const ownerAndProject = $('h1.public > strong > a')[0].pathname;
  const onClick = (e) => {
    let order = (COLUMN_AMOUNT - 1) - e.dataPoint.x;
    window.open(`https://travis-ci.org${ownerAndProject}/builds/${data[order]['id']}`, '_blank');
  };

  for (let i = COLUMN_AMOUNT - 1; i >= 0; i--) {
    let dataPoint = {
      label: (i === 0) ? `Latest:${info.buildNum[i]}` : info.buildNum[i],
      y: info.buildTime[i],
      color: info.buildColor[i],
      toolTipContent: info.buildInfo[i],
      click: onClick,
      cursor: 'pointer'
    };
    dataPoints.push(dataPoint);
  }
  return dataPoints;
};

const buildChart = (info, data) => {
  return new CanvasJS.Chart(CHART_CONTAINER, {
    width: 978,
    height: 298,
    backgroundColor: bodyBgColor,
    animationEnabled: true,
    title: {
      text: 'Build Status (Recent 10 builds)',
      fontFamily: GLOBAL_FONT_FAMILY,
      fontWeight: 'normal',
      fontColor: GITHUB_GREY,
      fontSize: 20
    },
    axisX: {
      title: 'Build Number',
      titleFontFamily: GLOBAL_FONT_FAMILY,
      titleFontWeight: 'normal',
      titleFontSize: 12
    },
    axisY: {
      title: 'Build Time (Minutes)',
      titleFontFamily: GLOBAL_FONT_FAMILY,
      titleFontWeight: 'normal',
      titleFontSize: 12
    },
    toolTip:{
      fontFamily: GLOBAL_FONT_FAMILY
    },
    data: [{
        type: 'column', //change type to bar, line, area, pie, etc
        dataPoints: assembleDataPoints(info, data)
    }]
  });
};

const trimBuildNums = (buildNums, range) => {
  for (let i = range; i < COLUMN_AMOUNT; i++) {
    if (typeof buildNums[i] === 'undefined') {
      buildNums[i] = '#';
    }
  }
};

const getTimeAndInfoForSpecificBuild = (buildStarted, buildFinished, buildMessage) => {
  let buildTime, buildInfo;
  if (buildStarted && buildFinished === null) {
    let skipTime = (new Date() - new Date(buildStarted)) / 1000;
    let skipTimeStr = trimTimeStr(skipTime);
    buildTime = trimTimeToMinScale(skipTime);
    buildInfo = `It's running! <b>Skipped time</b>:${skipTimeStr}<br/><span><b>Message:</b>${buildMessage}</span>`;
  } else {
    buildInfo = `Oops, the build may be cancelled.<br/><span><b>Message:</b>${buildMessage}</span>`;
  }
  return {buildTime, buildInfo};
};

const mapBuildData = (range, data) => {
  let buildNum = [],
    buildTime = [],
    buildColor = [],
    buildInfo = [];
  const GREEN_INDEX = 1;
  const RED_INDEX = 2;

  for (let i = 0; i < range; i++) {
    let buildDuration = trimTimeToMinScale(data[i]['duration']);
    let buildState = data[i]['state'];
    let buildResult = data[i]['result'];
    let buildMessage = trimMessage(data[i]['message']);
    let buildStarted = data[i]['started_at'];
    let buildFinished = data[i]['finished_at'];
    let buildTimeStr = trimTimeStr(data[i]['duration']);

    buildNum.push(`#${data[i]['number']}`);
    buildInfo.push(`<b>Build Time</b>: ${buildTimeStr}<br/><span><b>Message: </b>${buildMessage}</span>`);
    buildTime.push(buildDuration);

    if (buildState === 'started') {
      buildColor.push(allColor[RED_INDEX]);
      const __timeAndInfo = getTimeAndInfoForSpecificBuild(buildStarted, buildFinished, buildMessage);
      buildTime[i] = __timeAndInfo.buildTime;
      buildInfo[i] = __timeAndInfo.buildInfo;
    } else {
      buildResult = (buildResult === null) ? GREEN_INDEX : buildResult;
      buildColor.push(allColor[buildResult]);
    }
  }
  return {buildNum, buildTime, buildColor, buildInfo};
};

const getInfoFromJson = (data, range) => {
  let info = {};
  const __mappedResult = mapBuildData(range, data);

  info.buildNum = __mappedResult.buildNum;
  info.buildTime = __mappedResult.buildTime;
  info.buildColor = __mappedResult.buildColor;
  info.buildInfo = __mappedResult.buildInfo;

  trimBuildNums(info.buildNum, range);

  return info;
};

export {showChart};