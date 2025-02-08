class LineChart extends AbstractChart {
  #colors = [
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
  ]
  constructor(elementId, title='') {
    super(elementId).setConfig(
      {
        type: 'line',
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
      const groupedKeys = super.getGroupKeys();
      if (groupedKeys && groupedKeys.length > 0) {
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
    const xAxisLabels = data[Object.keys(data)[0]].map(d => new Date(d.date));
    let datasets = [];

    Object.keys(data).forEach(group => {
      datasets.push({
        label: group,
        data: data[group].map(d => d.value),
        borderColor: this.#getRandomColor(),
        backgroundColor: 'white',
      });
    });

    super.updateData({
      labels: xAxisLabels,
      datasets: datasets,
    });
  }

  #draw(data) {
    const xAxisLabels = data.map(d => new Date(d.date));
    const values = data.map(d => d.value);

    super.updateData({
      labels: xAxisLabels,
      datasets: [
        {
          label: 'Amount',
          data: values,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    });
  }
}