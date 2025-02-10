class BarChart extends AbstractChart {
  constructor(elementId, title = '') {
    super(elementId).setConfig(
      {
        type: 'bar',
        options: {
          responsive: false,
          plugins: {
            title: {
              text: title,
              display: true
            },
            legend: {
              position: 'bottom',
            }
          }
        }
      }
    );
  }

  init() {
    super.init((data) => {
      let datasets = [];
  
      Object.keys(data).forEach(group => {
        datasets.push({
          label: group,
          data: [data[group].value],
          borderColor: 'white',
          backgroundColor: super.getRandomColor()
        });
      });

      super.updateLabels(['Priorität']);
      super.updateDataSet(datasets);
    });
  }

}