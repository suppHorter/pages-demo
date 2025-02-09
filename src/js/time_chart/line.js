class LineTimeChart extends AbstractTimeChart {
  #colors = [
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
  ]
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

  #getRandomColor() {
    const result = this.#colors.pop()
    if (!result) {
      return 'rgb(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ')';
    }
    return result;
  }

  #drawGrouped(data) {
    let datasets = [];

    Object.keys(data).forEach(group => {
      datasets.push({
        label: group,
        tension: 0.2,
        data: super.normalizeKeys(data[group]),
        borderColor: this.#getRandomColor(),
        backgroundColor: 'white',
      });
    });

    super.updateDataSet(datasets);
  }

  #draw(data) {
    const values = super.normalizeKeys(data);

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