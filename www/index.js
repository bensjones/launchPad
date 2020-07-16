import { PieChart } from './arc.js';
import { BarChart } from './bar.js';

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
      chartData[strKey].data[i] = { label: value[i][1] + ' ' + (t / total * 100).toFixed(2) + '%', value: t, sortIndex: i };
    }
    chartData[strKey].meta = { total: total };
  }
  return chartData;
}

/* wait for HTML document to be completely loaded and parsed */
document.addEventListener('DOMContentLoaded', function (event) {

  fetch('http://lp.local/api/fetch')
    .then(
      response => response.json()
    )
    .then(
      data => {
        let chartData = refactorAPIDataToD3Format(data);
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

  let bar = new BarChart();
  globalThis.bar = bar;
  bar.setup();

  fetch('/api/tally')
    .then(
      (response) => response.json()
    )
    .then(
      json => {
        console.log(json)
        let barData = [
          { 'framework': 'react', 'votes': json.react },
          { 'framework': 'angular', 'votes': json.angular },
          { 'framework': 'emberjs', 'votes': json.emberjs },
          { 'framework': 'vuejs', 'votes': json.vuejs }
        ]
        globalThis.bar.render(barData)
      }
    )
    .catch(error => console.log(error));

});