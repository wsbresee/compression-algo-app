import * as d3 from 'd3';

export default {
  create: function(el, props, state) {
    const svg = d3
      .select(el)
      .append('svg')
      .attr('class', 'd3')
      .attr('viewBox', [0, 0, props.width, props.height]);

    svg.append('g');

    this.update(el, state);
  },

  update: function(el, state) {
    const scales = this._scales(el, state.domain);
    this._drawGraph(el, scales, state.data);
  },

  destroy: function(el) {},

  _drawGraph: function(el, scales, data) {
    const g = d3.select(el).selectAll('.d3-points');

    const rects = g.selectAll('rect').data(data, function(d) {
      return d.id;
    });
  },

  _scales: function(el, domain) {
    if (!domain) return null;

    const width = el.offsetWidth;
    const height = el.offsetHeight;

    const x = d3
      .scaleLinear()
      .range([0, width])
      .domain(domain.x);

    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain(domain.y);

    const z = d3
      .scaleLinear()
      .range([5, 20])
      .domain([1, 10]);

    return { x, y, z };
  },
};
