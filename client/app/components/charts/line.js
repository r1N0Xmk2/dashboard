import d3 from 'd3';

export default class Line {
  constructor(element, data) {
    var ys = data.map(function (d) { return d.y; });
    var margin = {top: 20, right: 20, bottom: 20, left: 40};
    var width = 500 - margin.left - margin.right;
    var height = 200 - margin.top - margin.bottom;
    var x = d3.time.scale()
        .domain([data[0].x, data[data.length-1].x])
        .rangeRound([0, width]);
    var y = d3.scale.linear()
        .domain([0, 5000])
        .range([height, 0]);
    var line = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });
    var svg = d3.select(element).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    svg.append('defs').append('clipPath')
        .attr('id', 'clip')
      .append('rect')
        .attr('width', width)
        .attr('height', height);
    var xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom');
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + y(0) + ')')
        .call(xAxis);
    svg.append('g')
        .attr('class', 'y axis')
        .call(d3.svg.axis().scale(y).orient('left'));
    var path = svg.append('g')
        .attr('clip-path', 'url(#clip)')
      .append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line);

    this.x = x;
    this.xAxis = xAxis;
    this.line = line;
    this.path = path;
    this.data = data;
    this.svg = svg;
  }
  tick(d) {
    // push a new data point onto the back
    this.data.push(d);
    // redraw the line, and slide it to the left
    this.path
        .attr('d', this.line)
        .attr('transform', null)
      .transition()
        .duration(2000)
        .ease('linear')
        .attr('transform', 'translate(' + (this.x(this.data[this.data.length-2].x) - this.x(this.data[this.data.length-1].x)) + ',0)');

    this.x.domain([this.data[1].x, d.x]);

    this.svg.select('.x')
      .transition()
        .duration(2000)
        .ease('linear')
        .call(this.xAxis);

    // pop the old data point off the front
    this.data.shift();
  }
}
