
export class PieChart {

  constructor(identifier, title) {
    this.identifier = identifier;
    this.title = title;
    this.color = d3.scaleOrdinal(['#61dafb', '#DD0031', '#E04E39', '#35495e']);
  }

  setup() {

    const height = 190;
    const width = 250;
    const margin = { top: 80, left: 70, bottom: 0, right: 0 };

    this.svg = d3.select('#' + this.identifier);

    this.chart = this.svg.append('g')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  }


  render(input) {

    let data;
    let meta;

    if (input) {
      data = input.data;
      meta = input.meta;
    } else {
      data = [
        { label: 'no data', value: 1, sortIndex: 0 },
        { label: 'no data', value: 1, sortIndex: 0 },
        { label: 'no data', value: 1, sortIndex: 0 },
        { label: 'no data', value: 1, sortIndex: 0 }
      ];
      meta = { total: null };
    }

    const pieGenerator = d3.pie()
      .value((d) => {
        return d.value;
      })
      .sort(null);

    const arcs = pieGenerator(data);


    const arcDim = d3.arc().innerRadius(50)
      .outerRadius(25);
   
        const titleText = this.svg.selectAll('text.po-title').data([meta.year]);
    
        titleText.exit().remove();
    
        titleText
          .enter()
          .append('text')
          .attr('transform', `translate(75, 20)`)
          .attr('class', 'po-title')
          .merge(titleText)
          .text(
            (d) => {
              return this.title;
            });
  
    const pieChart = this.chart.selectAll('path')
      .data(arcs);

    pieChart
      .enter()
      .append('path')
      .merge(pieChart)
      .attr('d', arcDim)
      .style('fill', (d, i) => this.color(i));

    const labels = [];
    (data).forEach((item) => {
      const str = item.label;
      labels.push(str);
    });

    const legendG = this.svg.selectAll('.legend').data(labels);
    legendG.exit().remove();

    legendG.enter()
      .append('g')
      .attr('transform', (d, i) => {
        return 'translate(150 , ' + (i * 20 + 40) + ')';
      })
      .attr('class', 'legend')
      .append('circle')
      .attr('cx', 10)
      .attr('cy', 10)
      .attr('r', 9)
      .attr('fill',
        (d, i) => {
          return this.color(i);
        });

    const legendT = this.svg.selectAll('text.po-detail').data(labels);
    legendT.exit().remove();

    legendT
      .enter()
      .append('text')
      .attr('class', 'po-detail')
      .attr('transform', (d, i) => {
        return 'translate(150 , ' + (i * 20 + 40) + ')';
      })
      .style('font-size', 12)
      .attr('y', 10)
      .attr('x', 20)
      .attr('text-anchor', 'left')
      .style('alignment-baseline', 'middle')
      .merge(legendT)
      .text((d) => {
        return d;
      });

  }
}
