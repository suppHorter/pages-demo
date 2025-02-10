# Stormrider Metrics

📊 [View Metrics](https://pages.github.siemens.cloud/ico-zambezi/stormrider-metrics/)

## [Data Structure](#data-structure)

The data is stored in the ```data``` directory as [json file](https://pages.github.siemens.cloud/ico-zambezi/stormrider-metrics/data/output.json).
It consists of an array of objects which must be structured like this:
```json
[
  {
    "date":"2024-09-12T22:12:06",
    "value":150,
    "priority":1,
    "historic":true
  },
  {
    ...
  }
]
```
If there is need for a separate file as a chart source you can add a new LineTimeChart in the [index.js](src/js/index.js) file with the ```setDataPath(filePath)``` method.
```js
new LineTimeChart('chart-prio', 'More Data')
  ...
  .setDataPath('data/more.json')
  .init();
```

Or change the global constant:
```js
const DEFAULT_DATA_URL = 'data/output.json';
```

## [Dependencies](#dependencies)

All dependencies are stored under ```/src/js/lib``` in minimized form.

⚠ This ensures they do not change but this also means that you have to update them manually.

Here a short description for each of them:
- [chartjs](src/js/lib/chart.4.4.7.min.js) is used to draw charts into the specified canvas ([Official docs](https://www.chartjs.org/docs/latest/samples/information.html))
- [moment](src/js/lib/moment.2.30.1.min.js) is used for date and time manipulation ([Official docs](https://momentjs.com/docs/#/use-it/browser/))
- [chartjs-adapter-moment](src/js/lib/chartjs-adapter-moment.1.0.1.min.js) is used to adapt chartjs to display and map dates nicer ([Official docs](https://cdnjs.com/libraries/chartjs-adapter-moment))


## [Workflow](#workflow)

The daily data update is triggered via the [deploy](.github/workflows/deploy.yml) workflow's ```scheduled_trigger```.

During the build a github cache is used to restore the **complete** ```data``` directory for further processing.

## [Development](#development)

You will need python to create test data via:
```sh
python src/simulate.py $(pwd)/data 105
```

To be able to develop locally you need to disable the CORS policy in chrome, so you can see the graphs.

⚠ **ONLY USE THIS FOR DEVELOPMENT PURPOSES, DO NOT USE THIS TO BROWSE THE INTERNET** ⚠
```sh
# start via ctrl + r
"chrome.exe" --user-data-dir="C://chrome-dev-disabled-security" --disable-web-security --disable-site-isolation-trials
```
