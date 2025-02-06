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

      const groupKeys = this.getGroupKeys();
      let groupedData;
      if (groupKeys) {
        for (let key of groupKeys) {
          groupedData = d3.group(data, d => d[key]);
        }
      } else {
        groupedData = new Map([["all", data]]);
      }

      let xAxis = d3.scaleTime()
        .domain(d3.extent(data, d => new Date(d.date)))
        .range([0, width]);

      let yAxis = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .nice()
        .range([height, 0]);

      super.drawAxis(xAxis, yAxis);

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const line = d3.line()
        .x(d => xAxis(new Date(d.date)))
        .y(d => yAxis(d.value))
        .curve(d3.curveMonotoneX);

      groupedData.forEach((values, key) => {
        context.append("path")
          .datum(values)
          .attr("class", "line")
          .attr("d", line)
          .style("fill", "none")
          .style("stroke", color(key))
          .style("stroke-width", 2);

        context.selectAll("dot")
          .data(values)
          .enter().append("circle")
          .attr("class", "dot")
          .attr("cx", d => xAxis(new Date(d.date)))
          .attr("cy", d => yAxis(d.value))
          .attr("r", 3)
          .style("fill", color(key))
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

      // Legende hinzufügen und am unteren Rand platzieren
      const legend = context.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(0, ${height + 20})`);
      
      let i = -1;
      groupedData.forEach((values, key, index) => {
        i++;
        const legendRow = legend.append("g")
          .attr("transform", `translate(${i * 30}, 0)`);

        legendRow.append("rect")
          .attr("width", 10)
          .attr("height", 10)
          .attr("fill", color(key));

        legendRow.append("text")
          .attr("x", 15) // Abstand zwischen Rechteck und Text
          .attr("y", 10)
          .style("text-transform", "capitalize")
          .text(key);
      });
    });
    return this;
  }
}