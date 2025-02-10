const DEFAULT_DATA_URL = 'data/output.json';


new LineTimeChart('chart-prio', 'Prioritäten über Zeit')
  .addFilterMethod((data) => {
    data = data.filter((d) => d.historic === false);
    return data;
  })
  .groupBy('priority')
  .init();


new LineTimeChart('chart-history', 'Historie')
  .addFilterMethod((data) => {
    data = data.filter((d) => d.historic === true);
    return data;
  })
  .groupBy('priority')
  .init();

new BarChart('chart-current-prio', 'Aktuelle Prioritäten')
  .addFilterMethod((data) => {
    // get last entries for each priority
    let lastEntries = {};
    data.forEach((d) => {
      if (!lastEntries[d.priority] || new Date(lastEntries[d.priority].date) < new Date(d.date)) {
        lastEntries[d.priority] = d;
      }
    });
    return lastEntries;
  })
  .init();

