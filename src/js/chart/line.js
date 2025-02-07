class LineChart extends AbstractChart {
  constructor(elementId) {
    super(elementId).setChartConfig(
      {
        type: 'line',
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
  }

  init() {
    super.init((data) => {
      const labels = data.map(d => d.date); // Utils.months({count: 7});
      const values = data.map(d => d.value);

      super.update({
        labels: labels,
        datasets: [{
          label: 'Amount',
          data: values,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      });
    });
  }
}