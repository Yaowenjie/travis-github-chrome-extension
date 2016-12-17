 var overallDiv = $("div.file-navigation.in-mid-page");

if (overallDiv.length !== 0) {
	// Get URL for the travis-ci icon.
	var travisIcon = chrome.extension.getURL("/travis-icon.png");

	// Generate the Chart elements.
	var chartDiv = $("<div id='chartHeader' class='commit-tease' style='width: 100%; padding: 5px 10px; cursor: pointer;'>" +
						"<h5><img src='" + travisIcon + "' height='20' style='vertical-align: middle;'>" +
						" Travis-CI Build Chart</h5>" +
					 "</div>" +
					 "<div id='chartContainer' class='overall-summary' style='height: 300px; width: 100%;'></div>");

	/* Getting Data from github page and travis-ci api */
	var allColor = ['#39aa56', '#db4545', '#f1e05a']; // green, red, yellow
	var ownerAndProject = $("h1.public > strong > a")[0].pathname;
	var jsonPath = 'https://api.travis-ci.org/repositories' + ownerAndProject + '/builds.json';

	var bIsChartRendered = false;

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
					text: "Build Status (Recent 10 builds)",
					fontSize: 20
				},
				axisX: {
					title: "Build Number",
					labelFontWeight: "bold"
				},
				axisY: {
					title: "Build Time (Minutes)",
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
							{ label: "Current:" + info.buildNum[0],	y: info.buildTime[0], color: info.buildColor[0], toolTipContent: info.buildInfo[0], click: onClick, cursor: "pointer" }
						]
					}
				]
			});

			function onClick(e) {
				var order = 9 - e.dataPoint.x;
				window.open('https://travis-ci.org' + ownerAndProject + '/builds/' + data[order]["id"], '_blank');
			}

			// Hide the chartContainer element if previously hidden
			if (localStorage["chartHeaderHidden"] === "true")
				$("#chartContainer").hide();
			else {
				// Otherwise we render the Chart and record that it has been rendered
				bIsChartRendered = true;
				chart.render();
			}

			// Attach the chart header click event
			$("#chartHeader").click(function() {
				var chartDiv = $(this).next("#chartContainer");
				// Toggle the chartContainer visibility
				chartDiv.slideToggle(150,
					function() {
						// Record the current visibility state
						localStorage["chartHeaderHidden"] = $(chartDiv).is(":hidden");

						// Render the chart if we haven't done so already and record that it has been rendered
						if (!bIsChartRendered) {
							bIsChartRendered = true;
							chart.render();
						}
					});
			});
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

			buildMessage = (buildMessage.length > 60) ? (buildMessage.slice(0, 60) + "...") : buildMessage;

			buildNum.push("#" + data[i]["number"]);
			buildInfo.push("<b>Build Time</b>: " + buildTimeStr + "<br/><span><b>Message: </b>" + buildMessage + "</span>");
			buildTime.push(Math.round(buildDuration/60*100)/100);

			if (buildState === "started") {
				buildColor.push(allColor[2]);
				if (buildStarted && buildFinished === null) {
						var skipTime = (new Date() - new Date(buildStarted))/1000;
						var skipTimeStr = Math.floor(skipTime/60) + "min" + Math.floor(skipTime%60) + "s";
						buildTime[i] = Math.round(skipTime/60*100)/100;
						buildInfo[i] = "It's running! <b>Skipped time</b>:" + skipTimeStr + "<br/><span><b>Message:</b>" + buildMessage + "</span>";
				} else {
						buildInfo[i] = "Oops, the build may be cancelled.<br/><span><b>Message:</b>" + buildMessage + "</span>";
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
