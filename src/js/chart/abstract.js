class AbstractChart {
  #canvasContext;
  #chart;
  #chartConfig;
  #filterMethod;
  #groupKeys;
  #dataUrl = 'data/output.json';

  constructor(elementId) {
    // Chart.defaults.global.defaultFontColor = 'black';
    // Chart.defaults.global.defaultFontSize = 15;

    if (!elementId) {
      throw new Error('elementId is required');
    }
    this.#canvasContext = document.getElementById(elementId).getContext('2d');
  }

  init(callback) {
    if (!this.#chart) {
      this.#chart = new Chart(this.#canvasContext, this.#chartConfig);
    }

    fetch(this.#dataUrl).then(data => {

      data = data.json();
      data.sort((a, b) => new Date(a.date) - new Date(b.date));

      if (this.#filterMethod) {
        data = this.#filterMethod(data);
      }

      if (this.#groupKeys) {
        data = data.reduce((_data, item) => {
          const key = this.#groupKeys.map(k => item[k]).join('-');
          if (!_data[key]) {
            _data[key] = [];
          }
          _data[key].push(item);
          return _data;
        }, {});
      }

      callback(data);
    }).catch(error => {
      console.error('Error fetching the data:', error);
    });
  }

  update(dataset) {
    this.#chart.data = dataset;
    this.#chart.update();
  }

  setDataUrl(dataUrl) {
    this.#dataUrl = dataUrl;
    return this;
  }

  setFilterMethod(filterMethod) {
    this.#filterMethod = filterMethod;
    return this;
  }

  setChartConfig(chartConfig) {
    this.#chartConfig = chartConfig;
    return this;
  }

  groupBy(keys) {
    this.#groupKeys = keys;
    return this;
  }
}