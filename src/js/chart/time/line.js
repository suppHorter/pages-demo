class LineTimeChart extends AbstractTimeChart {
  constructor(elementId, title = '') {
    super(elementId).setConfig(
      {
        type: 'line',
        options: {
          pointStyle: 'crossRot',
          hitRadius: 10,
          radius: 5,
          responsive: false,
          plugins: {
            title: {
              text: title,
              display: true
            },
            legend: {
              position: 'bottom',
            }
          },
          ticks: {
            source: 'data',
          },
          scales: {
            x: {
              type: 'time',
              time: {
                minUnit: 'day',
                tooltipFormat: 'DD.MM.YYYY',
              },
            },
          }
        }
      }
    );
  }

  init() {
    super.init((data) => {
      if (super.getGroupKey()) {
        this.#drawGrouped(data);
        return;
      }
      this.#draw(data);
    });
  }

  #drawGrouped(data) {
    let datasets = [];

    Object.keys(data).forEach(group => {
      datasets.push({
        label: group,
        tension: 0.2,
        data: super.normalizeTimeKeys(data[group]),
        borderColor: super.getRandomColor(),
        backgroundColor: 'white',
      });
    });

    super.updateDataSet(datasets);
  }

  #draw(data) {
    const values = super.normalizeTimeKeys(data);

    super.updateDataSet([
      {
        label: 'Amount',
        data: values,
        tension: 0.2,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ]);
  }
}