class AbstractChart {
  #dataUrl = DEFAULT_DATA_URL;
  #canvasContext;
  #chart;
  #config;
  #filterMethods = [];
  #groupKey;
  #canvasId;
  #colors = [
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(54, 162, 235)',
    'rgb(255, 159, 64)',
    'rgb(255, 99, 132)'
  ]

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
      })
      .then(data => {
        if (this.#filterMethods) {
          this.#filterMethods.forEach((filterMethod) => {
            data = filterMethod(data);
          });
        }

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
      })
      .catch(error => {
        console.error('Error fetching the data:', error);
      });
  }

  getColor() {
    const result = this.#colors.pop()
    if (!result) {
      return 'rgb(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ')';
    }
    return result;
  }

  normalizeTimeKeys(data) {
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

  updateLabels(labels) {
    this.#chart.data.labels = labels;
    this.#chart.update();
  }

  updateDataSet(datasets) {
    this.#chart.data.datasets = datasets;
    this.#chart.update();
  }

  setDataPath(dataUrl) {
    this.#dataUrl = dataUrl;
    return this;
  }

  addFilterMethod(filterMethod) {
    this.#filterMethods.push(filterMethod);
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