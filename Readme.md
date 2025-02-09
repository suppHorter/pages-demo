# General

This project is a simple website that displays data from the data directory.

## Contributing

You will need python to create test data via:
```sh
python3 python3 src/scraper.py $(pwd)/data 105
```

To be able to develop locally you need to disable the CORS policy in chrome, so you can see the graphs.
```bat
"chrome.exe" --user-data-dir="C://chrome-dev-disabled-security" --disable-web-security --disable-site-isolation-trials
```
⚠ ONLY USE THIS FOR DEVELOPMENT PURPOSES, DO NOT USE THIS FOR BROWSING THE INTERNET ⚠
