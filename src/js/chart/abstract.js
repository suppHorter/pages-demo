class AbstractChart {
  #dataUrl = DEFAULT_DATA_URL;
  #canvasContext;
  #chart;
  #config;
  #filterMethod;
  #groupKeys;
  #canvasId;

  constructor(canvasId) {
    if (!canvasId) {
      throw new Error('config is required');
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

  setConfig(config) {
    this.#config = config;
    return this;
  }

  updateData(dataset) {
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

  setConfig(config) {
    this.#config = config;
    return this;
  }

  getGroupKeys() {
    return this.#groupKeys;
  }

  groupBy(keys) {
    this.#groupKeys = keys;
    return this;
  }
}