class AbstractTimeChart {
  #dataUrl = DEFAULT_DATA_URL;
  #canvasContext;
  #chart;
  #config;
  #filterMethod;
  #groupKey;
  #canvasId;

  constructor(canvasId) {
    if (!canvasId) {
      throw new Error('canvasId is required');
    }
    this.#canvasId = canvasId;
    this.#canvasContext = document.getElementById(this.#canvasId).getContext('2d');
  }

  init(callback) {
    if (!this.#config) {
      throw new Error(`No config set for chart ${this.#canvasId}`);
    }
    this.#chart = new Chart(this.#canvasContext, this.#config);

    fetch(this.#dataUrl)
      .then(data => {
        return data.json();
      }).then(data => {
        data.sort((a, b) => new Date(a.date) - new Date(b.date));

        if (this.#filterMethod) {
          data = this.#filterMethod(data);
        }

        let xAxisLabels = data.map((item) => item.date);
        xAxisLabels = xAxisLabels.filter((item, index) => xAxisLabels.indexOf(item) === index);
        this.#chart.data.labels = xAxisLabels;

        if (this.#groupKey) {
          data = data.reduce((_data, item) => {
            const key = item[this.#groupKey];
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

  normalizeKeys(data) {
    return data.map((item) => {
      return {
        x: item.date,
        y: item.value
      };
    });
  }

  setConfig(config) {
    this.#config = config;
    return this;
  }

  updateDataSet(datasets) {
    this.#chart.data.datasets = datasets;
    this.#chart.update();
  }

  setDataPath(dataUrl) {
    this.#dataUrl = dataUrl;
    return this;
  }

  setFilterMethod(filterMethod) {
    this.#filterMethod = filterMethod;
    return this;
  }

  setConfig(config) {
    this.#config = config;
    return this;
  }

  getGroupKey() {
    return this.#groupKey;
  }

  groupBy(key) {
    this.#groupKey = key;
    return this;
  }
}