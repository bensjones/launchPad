import { PieChart } from './arc.js';
import { BarChart } from './bar.js';

let fetched_data = { "development activity": [["facebook", "react", "13394"], ["angular", "angular.js", "9005"], ["emberjs", "ember.js", "19915"], ["vuejs", "vue", "3104"]], "community support": [["facebook", "react", "9788"], ["angular", "angular.js", "7926"], ["emberjs", "ember.js", "9086"], ["vuejs", "vue", "1832"]], "stability": [["facebook", "react", "19133"], ["angular", "angular.js", "16923"], ["emberjs", "ember.js", "15371"], ["vuejs", "vue", "10904"]] };

let voter_data = [
  { 'framework':'react', 'votes': 300}, 
  { 'framework':'angular', 'votes': 500}, 
  { 'framework':'emberjs', 'votes': 100}, 
  { 'framework':'vuejs', 'votes': 120}];

  /*
function prepBody(data) {
  for (const [key, value] of Object.entries(data)) {
    console.log(`${key}: ${value}`);
    let currentDiv = document.getElementById("charts");
    let newSvg = document.createElement("svg");
    newSvg.id = (key.replace(' ', '_'));
    currentDiv.appendChild(newSvg);
    window.getComputedStyle( document.querySelector('svg') );
  }
}
*/

function refactorAPIDataToD3Format(data) {

  let chartData = {};

  for (const [key, value] of Object.entries(data)) {
    let strKey = key.replace(' ', '_');
    chartData[strKey] = {};
    chartData[strKey].meta = {};
    chartData[strKey].data = [];
    let total = 0;
    for (let i in value) {
      let t = parseInt(value[i][2]);
      total += t;
    }
    for (let i in value) {
      let t = parseInt(value[i][2]);
      chartData[strKey].data[i] = { label: value[i][1]+' '+(t/total *100).toFixed(2) + '%', value: t, sortIndex: i };
    }
    chartData[strKey].meta = { total: total };
  }
  return chartData;
}

/* wait for HTML document to be completely loaded and parsed */ 
document.addEventListener('DOMContentLoaded', function (event) {
  /*
fetch('http://lp.local/api/fetch')
  .then(
	  response => response.json()
  )
  .then(
	  data => {
      chartData = marshalData( data );
      let pie1 = new PieChart('community_support', 'Community Support');
  pie1.setup();
  pie1.render(chartData.community_support);
  let pie2 = new PieChart('development_activity', 'Development Activity');
  pie2.setup();
  pie2.render(chartData.development_activity);
  let pie3 = new PieChart('stability', 'Stability');
  pie3.setup();
  pie3.render(chartData.stability);
    }
  );
*/

  let chartData = refactorAPIDataToD3Format(fetched_data);
  let pie1 = new PieChart('community_support', 'Community Support');
  pie1.setup();
  pie1.render(chartData.community_support);
  let pie2 = new PieChart('development_activity', 'Development Activity');
  pie2.setup();
  pie2.render(chartData.development_activity);
  let pie3 = new PieChart('stability', 'Stability');
  pie3.setup();
  pie3.render(chartData.stability);
  let bar = new BarChart();
  bar.setup();
  bar.render(voter_data);
});