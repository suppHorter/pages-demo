const DEFAULT_DATA_URL = 'data/output.json';

new LineChart('chart-prio1', 'Prio 1')
  .setFilterMethod((data) => {
    data = data.filter((d) => d.priority === 1);
    data = data.filter((d) => d.historic === false);
    return data;
  })
  .init();


new LineChart('chart-prio2', 'Prio 2')
  .setFilterMethod((data) => {
    data = data.filter((d) => d.priority === 2);
    data = data.filter((d) => d.historic === false);
    return data;
  })
  .init();


new LineChart('chart-prio3', 'Prio 3')
  .setFilterMethod((data) => {
    data = data.filter((d) => d.priority === 3);
    data = data.filter((d) => d.historic === false);
    return data;
  })
  .init();


new LineChart('chart-history', 'History')
  .setFilterMethod((data) => {
    data = data.filter((d) => d.historic === true);
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    return data;
  })
  .groupBy(['priority'])
  .init();