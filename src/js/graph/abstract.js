class Graph {
  #context;
  #svgId;
  #dataUrl = 'output.json';
  #groupKeys;
  #filter;
  #width = 600;
  #height = 400;
  #margin = { top: 20, right: 30, bottom: 40, left: 40 };

  constructor(config) {
    if (!config.svgId) {
      console.error('svgId is not defined.');
      return;
    }
    this.#svgId = config.svgId;

    if (config.dataUrl) {
      this.#dataUrl = config.dataUrl;
    }

    if (config.filter) {
      this.#filter = config.filter;
    }

    if (config.groupKeys) {
      this.#groupKeys = config.groupKeys;
    }

    if (config.dimensions) {
      if (config.dimensions.width) {
        this.#width = config.dimensions.width;
      }
      if (config.dimensions.height) {
        this.#height = config.dimensions.height;
      }
    }
  }

  init(callback) {
    this.#width = this.#width - this.#margin.left - this.#margin.right;
    this.#height = this.#height - this.#margin.top - this.#margin.bottom;

    this.#context = d3.select(`#${this.#svgId}`)
      .attr('width', this.#width + this.#margin.left + this.#margin.right)
      .attr('height', this.#height + this.#margin.top + this.#margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.#margin.left},${this.#margin.top})`);

    d3.json(this.#dataUrl).then(data => {
      if (this.#filter) {
        data = this.#filter(data);
      }
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
      callback(this.#context, data);
    }).catch(error => {
      console.error('Error fetching the data:', error);
    });
  }

  drawAxis(xAxis, yAxis, tick=d3.timeMonth.every(1), tickFormat='%b %Y') {
    this.#context.append('g')
      .attr('transform', `translate(0,${this.#height})`)
      .call(d3.axisBottom(xAxis)
        .ticks(tick)
        .tickFormat(d3.timeFormat(tickFormat))
      );

    this.#context.append('g')
      .call(d3.axisLeft(yAxis));
  }

  getWidth() {
    return this.#width;
  }

  getHeight() {
    return this.#height;
  }

  getContext() {
    return this.#context;
  }

  getGroupKeys() {
    return this.#groupKeys;
  }
}