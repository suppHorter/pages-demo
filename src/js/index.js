const DEFAULT_DATA_URL = 'data/output.json';

new LineChart('chart-prio', 'Prioritäten über Zeit')
  .setFilterMethod((data) => {
    data = data.filter((d) => d.historic === false);
    return data;
  })
  .groupBy(['priority'])
  .init();


new LineChart('chart-history', 'Historie')
  .setFilterMethod((data) => {
    data = data.filter((d) => d.historic === true);
    return data;
  })
  .groupBy(['priority'])
  .init();