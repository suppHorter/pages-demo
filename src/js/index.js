const DEFAULT_DATA_URL = 'data/output.json';


new LineTimeChart('chart-prio', 'improvements over time')
  .addFilterMethod((data) => {
    data = data.filter((d) => d.historic === false);
    return data;
  })
  .groupBy('priority')
  .init();


new LineTimeChart('chart-history', 'history')
  .addFilterMethod((data) => {
    data = data.filter((d) => d.historic === true);
    return data;
  })
  .groupBy('priority')
  .init();


new BarChart('chart-current-prio', 'improvements left')
  .addFilterMethod((data) => {
    let lastEntries = {};
    data.forEach((d) => {
      if (!lastEntries[d.priority] || new Date(lastEntries[d.priority].date) < new Date(d.date)) {
        lastEntries[`priority ${d.priority}`] = d;
      }
    });
    return lastEntries;
  })
  .init();
