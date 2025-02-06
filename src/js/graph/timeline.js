class TimelineGraph extends Graph {
  #dateFormat = "%d.%m.%Y";
  constructor(config) {
    super(config);
  }

  init() {
    super.init((context, data) => {
      const formatDate = d3.timeFormat(this.#dateFormat);
      let height = this.getHeight();
      let width = this.getWidth();

      let xAxis = d3.scaleTime()
        .domain(d3.extent(data, d => new Date(d.date)))
        .range([0, width]);

      let yAxis = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .nice()
        .range([height, 0]);

      super.drawAxis(xAxis, yAxis);

      const line = d3.line()
        .x(d => xAxis(new Date(d.date)))
        .y(d => yAxis(d.value))
        .curve(d3.curveMonotoneX);

      context.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "steelblue")
        .style("stroke-width", 2);

      context.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => xAxis(new Date(d.date)))
        .attr("cy", d => yAxis(d.value))
        .attr("r", 3)
        .style("fill", "lightblue")
        .on("mouseover", function(event, d) {
          d3.select(this).transition().duration(100).attr("r", 6);
          context.append("text")
            .attr("class", "tooltip-date")
            .attr("x", 10)
            .attr("y", height - 15)
            .text(formatDate(new Date(d.date)))
            .style("font-size", "20px")
            .style("font-weight", "bold")
          context.append("text")
            .attr("class", "tooltip-value")
            .attr("x", 10)
            .attr("y", height - 35)
            .text(d.value)
            .style("font-size", "24px")
            .style("font-weight", "bold")
        })
        .on("mouseout", function(event, d) {
          d3.select(this).transition().duration(100).attr("r", 3);
          context.select(".tooltip-date").remove();
          context.select(".tooltip-value").remove();
        });
    });
    return this;
  }
}