
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

        

        const xScale = d3.scaleBand()
            .range([0, this.width])
            .domain(input.map((s) => s.framework))
            .padding(0.2);
/*
            this.chart.append('g')
            .call(d3.axisLeft(yScale));

        this.chart.append('g')
            .attr('transform', `translate(0, ${this.height})`)
            .call(d3.axisBottom(xScale));

        this.chart.append('g')
            .attr('class', 'grid')
            .call(d3.axisLeft()
                .scale(yScale)
                .tickSize(-this.width, 0, 0)
                .tickFormat(''));

const textUpdate = svg.selectAll("text")
.data(randomLetters());

const textEnter = textUpdate.enter().append("text");

const textExit = textUpdate.exit().remove();

textEnter.merge(textUpdate)
.attr("x", (d, i) => i * 16)
.text(d => d);
*/
        const bar = this.chart.selectAll().data(input);
        bar.exit().remove();

        bar.enter()
            .append('rect')
            .merge(bar)
            .attr('x', (d) => xScale(d.framework))
            .attr('class', (d) => d.framework)
            .attr('y', (d) => yScale(d.votes))
            .attr('height', (d) => this.height - yScale(d.votes))
            .attr('width', xScale.bandwidth());
            
   /*     

        this.svg.append('text')
            .attr('x', - (this.height / 1.9))
            .attr('y', this.margin.top)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Votes');

        this.svg.append('text')
            .attr('x', this.width / 1.5 + this.margin.bottom)
            .attr('y', this.width - this.margin.top)
            .attr('text-anchor', 'middle')
            .text('Framework');
*/


    }
}
