class AbstractTimeChart extends AbstractChart {
  constructor(canvasId) {
    super(canvasId);
  }

  init(callback) {
    super.addFilterMethod((data) => {
        let xAxisLabels = data.map((item) => item.date);
        xAxisLabels = xAxisLabels.filter((item, index) => xAxisLabels.indexOf(item) === index);
        super.updateLabels(xAxisLabels);

        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return data;
      });
    super.init((data) => {
        callback(data);
      });
  }
}