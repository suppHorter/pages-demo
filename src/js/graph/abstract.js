class Graph {
  #width = 600;
  #height = 400;
  #context;
  #svgId;
  #dataUrl;
  #groupKeys;
  #margin = { top: 20, right: 30, bottom: 40, left: 40 };
  #filter;

  constructor(config) {
    if (!config.svgId) {
      console.error('svgId is not defined.');
      return;
    }
    this.#svgId = config.svgId;

    let dataUrl = "output.json";
    if (config.dataUrl) {
      dataUrl = config.dataUrl;
    }
    this.#dataUrl = dataUrl;

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
      .attr("width", this.#width + this.#margin.left + this.#margin.right)
      .attr("height", this.#height + this.#margin.top + this.#margin.bottom)
      .append("g")
      .attr("transform", `translate(${this.#margin.left},${this.#margin.top})`);

    // let groupKeys = this.#groupKeys;
    d3.json(this.#dataUrl).then(data => {
      if (this.#filter) {
        data = this.#filter(data);
      }
      // if (groupKeys) {
      //   data = d3.group(data, d => d[groupKeys[0]])
      // }
      callback(this.#context, data);
    }).catch(error => {
      console.error('Error fetching the data:', error);
    });
  }

  drawAxis(xAxis, yAxis) {
    this.#context.append("g")
      .attr("transform", `translate(0,${this.#height})`)
      .call(d3.axisBottom(xAxis));

    this.#context.append("g")
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