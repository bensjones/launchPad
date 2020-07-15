import { PieChart } from './arc.js';


let fetched_data = { "development activity": [["facebook", "react", "13394"], ["angular", "angular.js", "9005"], ["emberjs", "ember.js", "19915"], ["vuejs", "vue", "3104"]], "community support": [["facebook", "react", "9788"], ["angular", "angular.js", "7926"], ["emberjs", "ember.js", "9086"], ["vuejs", "vue", "1832"]], "stability": [["facebook", "react", "19133"], ["angular", "angular.js", "16923"], ["emberjs", "ember.js", "15371"], ["vuejs", "vue", "10904"]] };

/*
fetch('http://lp.local/api/fetch')
  .then(
	  response => response.json()
  )
  .then(
	  data => postProcess( data );
  );
*/
function prepBody(data) {
  for (const [key, value] of Object.entries(data)) {
    console.log(`${key}: ${value}`);
    let currentDiv = document.getElementById("charts");
    let newSvg = document.createElement("svg");
    newSvg.classList.add(key.replace(' ', '_'));
    currentDiv.appendChild(newSvg);
  }
}

function marshalData(data) {

  let chartData = {};

  for (const [key, value] of Object.entries(data)) {
    let strKey = key.replace(' ', '_');
    chartData[strKey] = {};
    chartData[strKey].meta = {};
    chartData[strKey].data = [];
    let total = 0;
    for (let i in value) {
      let t = parseInt(value[i][2]);
      chartData[strKey].data[i] = { label: value[i][1], value: t, sortIndex: i };
      total += t;
    }
    chartData[strKey].meta = { total: total };
  }
  return chartData;
}


function postProcess(data) {


}

document.addEventListener('DOMContentLoaded', function (event) {
  prepBody(fetched_data);
  let chartData = marshalData(fetched_data);
  let pie1 = new PieChart('community_support');
  pie1.setup();
  pie1.render(chartData.community_support);
});
