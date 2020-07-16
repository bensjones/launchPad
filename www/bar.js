
export class BarChart {

    constructor(title) {
        this.title = title;
        this.color = d3.scaleOrdinal(['#61dafb', '#DD0031', '#E04E39', '#35495e']);
        this.height = 190;
        this.width = 250;
    }

    setup() {
        this.margin = { top: 10, left: 40, bottom: 0, right: 0 };

        this.svg = d3.select('#vote-results');

        this.chart = this.svg.append('g')
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    }


    render(input) {
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(d3.extent(input, (d) => { return d.votes }))])
            .range([this.height, 0]);

        this.chart.append('g')
            .call(d3.axisLeft(yScale));

        const xScale = d3.scaleBand()
            .range([0, this.width])
            .domain(input.map((s) => s.framework))
            .padding(0.2);

        this.chart.append('g')
            .attr('transform', `translate(0, ${this.height})`)
            .call(d3.axisBottom(xScale));

        this.chart.selectAll()
            .data(input)
            .enter()
            .append('rect')
            .attr('x', (d) => xScale(d.framework))
            .attr('y', (d) => yScale(d.votes))
            .attr('height', (d) => this.height - yScale(d.votes))
            .attr('width', xScale.bandwidth());

        this.svg.append('text')
            .attr('x', - (this.height / 1.9 ) )
            .attr('y', this.margin.top)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Votes');

        this.svg.append('text')
            .attr('x', this.width / 1.5 + this.margin.bottom)
            .attr('y',  this.width - this.margin.top)
            .attr('text-anchor', 'middle')
            .text('Framework');
    }
}
