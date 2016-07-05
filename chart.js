var overallDiv = window.document.querySelectorAll(".repository-lang-stats-graph.js-toggle-lang-stats");

if (overallDiv.length !== 0) {
  var chartDiv = window.document.createElement('div');
  chartDiv.setAttribute("id", "chartContainer");
  chartDiv.style.cssText = 'height: 300px; width: 100%; border: 1px solid #ddd;border-radius: 0 3px 3px 0;';

  overallDiv[0].parentNode.insertBefore(chartDiv, overallDiv[0].nextSibling);

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
          { x: 1, y: 2.6, color:'#39aa56', toolTipContent:"<a href='http://baidu.com'>Go to this build</> <hr/> Build Time: 2min30s" },
          { x: 2, y: 2.5, color:'#39aa56' },
          { x: 3, y: 2.0, color:'#db4545' },
          { x: 4, y: 2.5, color:'#db4545' },
          { x: 5, y: 3.52, color:'#39aa56' },
          { x: 6, y: 4.8, color:'#39aa56' },
          { x: 7, y: 2.8, color:'#39aa56' },
          { x: 8, y: 3.4, color:'#39aa56' },
          { x: 9, y: 3.4, color:'#39aa56' },
          { x: 10, label: "current",  y: 1.4, color:'#f1e05a' }
        ]
      }
    ]
  });
  chart.render();
}
