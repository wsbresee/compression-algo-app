import * as d3 from 'd3';

export default {
  create: function(el, state) {
    const svg = d3
      .select(el)
      .append('svg')
      .attr('transform', `translate(${state.margin}, ${state.margin})`)
      .attr('class', 'd3-graph');

    const { x, y } = this._scales(el, state.domain, state.margin);

    svg.append('g').call(d3.axisLeft(y));

    svg
      .append('g')
      .attr(
        'transform',
        `translate(${state.margin},${el.offsetHeight - state.margin})`
      )
      .call(d3.axisBottom(x));

    this.update(el, state);
  },

  update: function(el, state) {
    const scales = this._scales(el, state.domain, state.margin);
    this._drawGraph(el, scales, state);
  },

  destroy: function(el) {},

  _drawGraph: function(el, scales, state) {
    const svg = d3.select('.d3-graph');

    const { data, margin } = state;
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => scales.x(d.x))
      .attr('y', d => scales.y(d.y))
      .attr('width', d => scales.x(0.95))
      .attr('height', d => el.offsetHeight - scales.y(d.y) - margin)
      .style('fill', '#714bfa');
  },

  _scales: function(el, domain, margin) {
    if (!domain) return null;

    const width = el.offsetWidth - 2 * margin;
    const height = el.offsetHeight - 2 * margin;

    const x = d3
      .scaleLinear()
      .range([0, width])
      .domain(domain.x);

    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain(domain.y);

    return { x, y };
  },
};
